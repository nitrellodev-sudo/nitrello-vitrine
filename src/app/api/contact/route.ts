import { NextResponse } from "next/server";

/**
 * Route API du formulaire de contact Nitrello.
 *
 * Chaîne d'envoi (remplace l'ancien webhook n8n self-hosted, instable) :
 *   POST /api/contact
 *     → 1. Email de NOTIFICATION à Nico via Brevo        (bloquant : échec = 500)
 *     → 2. Email d'ACCUSÉ DE RÉCEPTION au demandeur       (best-effort : échec loggé)
 *     → 3. Ligne CRM dans Notion                          (best-effort : échec loggé)
 *
 * Sémantique d'erreur : le lead est considéré "sauvé" dès que la notification
 * (étape 1) part. Si l'accusé de réception ou Notion échouent ensuite, on
 * répond quand même 200 {success:true} et on logge l'erreur côté serveur —
 * inutile de faire échouer l'UX pour un effet de bord secondaire.
 *
 * Secrets requis (serveur uniquement, JAMAIS de préfixe NEXT_PUBLIC_) :
 *   - BREVO_API_KEY   : clé API Brevo (transactionnel)
 *   - NOTION_API_KEY  : token d'intégration interne Notion
 */

// Runtime Node (et non Edge) : on fait des appels HTTP sortants vers Brevo/Notion
// et on veut l'environnement Node complet.
export const runtime = "nodejs";

// ── Configuration ───────────────────────────────────────────────────────────

/** Expéditeur des emails. DOIT être un sender validé dans Brevo. */
const SENDER = { name: "Nitrello", email: "contact@nitrello.com" } as const;

/** Template Brevo de l'accusé de réception (Transactionnel → Templates → #2). Sujet et expéditeur sont définis DANS le template. */
const ACK_TEMPLATE_ID = 2;

/** Destinataire de la notification interne (boîte de Nico). */
const NOTIFICATION_TO = "nitrello.dev@gmail.com";

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const NOTION_ENDPOINT = "https://api.notion.com/v1/pages";
const NOTION_VERSION = "2022-06-28";
const NOTION_DATABASE_ID = "330701d76e6a80f4b38be113f4f5fb1c";

/** Longueurs max acceptées (validation au boundary serveur). */
const MAX = {
  nom: 100,
  email: 200,
  message: 5000,
  type: 50,
  type_label: 100,
  company: 200,
  telephone: 40,
} as const;

/** Limite Notion : un bloc rich_text n'accepte que 2000 caractères. */
const NOTION_RICH_TEXT_MAX = 2000;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Rate limiting ─────────────────────────────────────────────────────────
//
// Limiteur en mémoire par IP, fenêtre glissante. Sur Vercel chaque instance
// de fonction a sa propre mémoire : ce n'est pas une garantie absolue
// multi-instance, mais les rafales d'un même bot retombent sur l'instance
// chaude et sont coupées, sans dépendance externe (Upstash, etc.).
// Chaque requête acceptée coûte 1 à 3 appels externes (Brevo ×2, Notion) :
// c'est le quota qu'on protège ici.

const RATE_LIMIT = { maxRequests: 5, windowMs: 10 * 60 * 1000 } as const;
const rateLimitHits = new Map<string, number[]>();

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") ?? "inconnue";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT.windowMs;
  const hits = (rateLimitHits.get(ip) ?? []).filter((t) => t > cutoff);

  if (hits.length >= RATE_LIMIT.maxRequests) {
    rateLimitHits.set(ip, hits);
    return true;
  }

  hits.push(now);
  rateLimitHits.set(ip, hits);

  // Nettoyage opportuniste : borne la mémoire de l'instance.
  if (rateLimitHits.size > 1000) {
    for (const [key, timestamps] of rateLimitHits) {
      if (timestamps.every((t) => t <= cutoff)) {
        rateLimitHits.delete(key);
      }
    }
  }
  return false;
}

// ── Types ─────────────────────────────────────────────────────────────────

type ContactPayload = {
  nom: string;
  email: string;
  message: string;
  type: string;
  type_label: string;
  company: string;
  telephone: string;
};

// ── Helpers ───────────────────────────────────────────────────────────────

/** Échappe le HTML pour intégrer du contenu utilisateur sans casser le markup. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Valide et normalise le corps de requête.
 * Retourne soit les données nettoyées, soit un message d'erreur.
 */
function parsePayload(
  body: unknown,
): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Corps de requête invalide." };
  }

  const raw = body as Record<string, unknown>;

  const nom = asString(raw.nom);
  const email = asString(raw.email);
  const message = asString(raw.message);
  const type = asString(raw.type);
  const type_label = asString(raw.type_label);
  const company = asString(raw.company);
  const telephone = asString(raw.telephone);

  if (!nom || !email || !message) {
    return { ok: false, error: "Champs nom, email et message requis." };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, error: "Format d'email invalide." };
  }
  if (
    nom.length > MAX.nom ||
    email.length > MAX.email ||
    message.length > MAX.message ||
    type.length > MAX.type ||
    type_label.length > MAX.type_label ||
    company.length > MAX.company ||
    telephone.length > MAX.telephone
  ) {
    return { ok: false, error: "Un ou plusieurs champs dépassent la longueur autorisée." };
  }

  return {
    ok: true,
    data: { nom, email, message, type, type_label, company, telephone },
  };
}

/** Envoie un email transactionnel via Brevo. Lève si la réponse n'est pas OK. */
async function sendBrevoEmail(params: {
  apiKey: string;
  to: { email: string; name?: string };
  subject: string;
  htmlContent: string;
  replyTo?: { email: string; name?: string };
}): Promise<void> {
  const response = await fetch(BREVO_ENDPOINT, {
    method: "POST",
    headers: {
      "api-key": params.apiKey,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: SENDER,
      to: [params.to],
      subject: params.subject,
      htmlContent: params.htmlContent,
      ...(params.replyTo ? { replyTo: params.replyTo } : {}),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Brevo HTTP ${response.status} : ${detail.slice(0, 500)}`);
  }
}

/**
 * Envoie un email via un template Brevo (sujet/expéditeur portés par le template,
 * non surchargés ici). Lève si la réponse n'est pas OK.
 */
async function sendBrevoTemplateEmail(params: {
  apiKey: string;
  to: { email: string; name?: string };
  templateId: number;
  params: Record<string, string>;
}): Promise<void> {
  const response = await fetch(BREVO_ENDPOINT, {
    method: "POST",
    headers: {
      "api-key": params.apiKey,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      templateId: params.templateId,
      to: [params.to],
      params: params.params,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Brevo HTTP ${response.status} : ${detail.slice(0, 500)}`);
  }
}

/** Corps HTML de la notification interne (vers Nico). */
function buildNotificationHtml(data: ContactPayload): string {
  const projet = data.type_label || data.type || "—";
  const row = (label: string, value: string): string =>
    `<tr>
      <td style="padding:6px 12px;color:#888;font-size:13px;vertical-align:top;white-space:nowrap;">${label}</td>
      <td style="padding:6px 12px;color:#111;font-size:14px;">${value}</td>
    </tr>`;

  return `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;">
    <h2 style="font-size:18px;color:#111;margin:0 0 16px;">Nouveau contact — ${escapeHtml(data.nom)}</h2>
    <table style="border-collapse:collapse;width:100%;background:#fafafa;border:1px solid #eee;border-radius:8px;">
      ${row("Nom", escapeHtml(data.nom))}
      ${row("Email", `<a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>`)}
      ${row("Téléphone", data.telephone ? escapeHtml(data.telephone) : "—")}
      ${row("Entreprise", data.company ? escapeHtml(data.company) : "—")}
      ${row("Type de projet", escapeHtml(projet))}
    </table>
    <div style="margin:16px 0 0;padding:14px 16px;background:#fff;border:1px solid #eee;border-radius:8px;">
      <div style="color:#888;font-size:13px;margin-bottom:6px;">Message</div>
      <div style="color:#111;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
    </div>
    <p style="color:#aaa;font-size:12px;margin:16px 0 0;">Envoyé via le formulaire de contact nitrello.com</p>
  </div>`;
}

/** Crée la ligne CRM dans Notion. Lève si la réponse n'est pas OK. */
async function createNotionLead(
  apiKey: string,
  data: ContactPayload,
): Promise<void> {
  const now = new Date().toISOString();
  const projet = data.type_label || data.type || "";
  const messageForNotion =
    projet
      ? `Type de projet : ${projet}\n${data.company ? `Entreprise : ${data.company}\n` : ""}---\n${data.message}`
      : data.message;

  const response = await fetch(NOTION_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Notion-Version": NOTION_VERSION,
    },
    body: JSON.stringify({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        Nom: { title: [{ text: { content: data.nom.slice(0, NOTION_RICH_TEXT_MAX) } }] },
        Email: { email: data.email },
        Téléphone: { phone_number: data.telephone || null },
        Message: {
          rich_text: [
            { text: { content: messageForNotion.slice(0, NOTION_RICH_TEXT_MAX) } },
          ],
        },
        Statut: { status: { name: "Nouveau" } },
        Date: { date: { start: now } },
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Notion HTTP ${response.status} : ${detail.slice(0, 500)}`);
  }
}

// ── Handler ───────────────────────────────────────────────────────────────

export async function POST(request: Request): Promise<NextResponse> {
  // 0. Rate limiting : avant tout traitement, aucune requête au-delà du quota
  //    ne doit déclencher d'appel externe.
  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    console.error(`[api/contact] Rate limit dépassé (${ip}).`);
    return NextResponse.json(
      { success: false, error: "Trop de demandes. Réessaie dans quelques minutes." },
      { status: 429 },
    );
  }

  // 1. Parse JSON
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "JSON invalide." },
      { status: 400 },
    );
  }
  const raw = (
    typeof body === "object" && body !== null ? body : {}
  ) as Record<string, unknown>;

  // 2. Honeypot : le champ field_misc ne bloque PLUS l'envoi. S'il est rempli,
  //    on tague la soumission "suspecte" mais on la traite quand même (un faux
  //    positif autofill ne doit jamais coûter un lead). Conséquences plus bas :
  //    sujet de notif préfixé [Suspect spam] + accusé de réception NON envoyé.
  const honeypot =
    typeof raw.field_misc === "string" ? raw.field_misc.trim() : "";
  const isSuspect = honeypot !== "";
  if (isSuspect) {
    console.error(
      "[api/contact] field_misc rempli — lead tagué suspect, ack non envoyé",
    );
  }

  // 3. Validation serveur
  const parsed = parsePayload(body);
  if (!parsed.ok) {
    return NextResponse.json(
      { success: false, error: parsed.error },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // 4. Notification interne (BLOQUANT) — sans elle, le lead est perdu → 500.
  const brevoApiKey = process.env.BREVO_API_KEY;
  if (!brevoApiKey) {
    console.error("[api/contact] BREVO_API_KEY manquante : notification impossible.");
    return NextResponse.json({ success: false }, { status: 500 });
  }

  const notificationSubject = isSuspect
    ? `[Suspect spam] [Nitrello] Nouveau contact — ${data.nom}`
    : `[Nitrello] Nouveau contact — ${data.nom}`;

  try {
    await sendBrevoEmail({
      apiKey: brevoApiKey,
      to: { email: NOTIFICATION_TO, name: "Nitrello" },
      subject: notificationSubject,
      htmlContent: buildNotificationHtml(data),
      // Permet de répondre directement au demandeur depuis la notification.
      replyTo: { email: data.email, name: data.nom },
    });
  } catch (error) {
    console.error("[api/contact] Échec envoi notification Brevo :", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }

  // À partir d'ici, le lead est sauvé. Les effets de bord ci-dessous sont
  // best-effort : on logge mais on ne fait jamais échouer la réponse.

  // 5. Accusé de réception au demandeur (best-effort).
  //    Jamais envoyé pour une soumission suspecte : on ne veut pas écrire vers
  //    une adresse potentiellement usurpée par un bot (protection de la
  //    réputation d'envoi du domaine).
  if (!isSuspect) {
    try {
      await sendBrevoTemplateEmail({
        apiKey: brevoApiKey,
        to: { email: data.email, name: data.nom },
        templateId: ACK_TEMPLATE_ID,
        params: {
          PRENOM: escapeHtml(data.nom.split(" ")[0] || data.nom),
          MESSAGE: escapeHtml(data.message),
          // Laissé vide (falsy) si aucun type — préserve le {% if params.PROJET %} du template.
          PROJET: escapeHtml(data.type_label || data.type || ""),
        },
      });
    } catch (error) {
      console.error("[api/contact] Échec envoi accusé de réception :", error);
    }
  }

  // 6. Ligne CRM Notion (best-effort)
  const notionApiKey = process.env.NOTION_API_KEY;
  if (!notionApiKey) {
    console.error("[api/contact] NOTION_API_KEY manquante : ligne CRM non créée.");
  } else {
    try {
      await createNotionLead(notionApiKey, data);
    } catch (error) {
      console.error("[api/contact] Échec création ligne Notion :", error);
    }
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
