"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";

const CONTACT_API_URL = "/api/contact";

type SubmitStatus = "idle" | "sending" | "success" | "error";

const SUBMIT_BUTTON_LABEL = (
  <>
    Envoyer mon message
    <svg
      className="arrow"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  </>
);

export default function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // UX post-succès : après 6 s, on réinitialise les champs (reset natif) et on
  // repasse en "idle". Le formulaire n'est JAMAIS démonté (il est seulement
  // masqué pendant le succès), donc sa classe d'animation `.in` — posée une
  // seule fois par RevealOnScroll — persiste : pas de zone vide au retour.
  // Le cleanup annule le timer si le composant se démonte ou si le statut change.
  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => {
      formRef.current?.reset();
      setStatus("idle");
    }, 6000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot : on relève la valeur mais on NE bloque JAMAIS l'envoi côté
    // client. Le champ est transmis tel quel au serveur, qui décide du
    // traitement (tag suspect, pas d'accusé de réception) — voir /api/contact.
    const honeypot = formData.get("field_misc");

    const typeValue = (formData.get("type") as string | null) ?? "";
    const checkedRadio = form.querySelector<HTMLInputElement>(
      'input[name="type"]:checked',
    );
    const typeLabel =
      checkedRadio?.parentElement?.querySelector("span")?.textContent ||
      typeValue;
    const name = ((formData.get("name") as string | null) ?? "").trim();
    const email = ((formData.get("email") as string | null) ?? "").trim();
    const company = ((formData.get("company") as string | null) ?? "").trim();
    const rawMessage = (
      (formData.get("message") as string | null) ?? ""
    ).trim();

    // Construction du message enrichi (le workflow n8n peut utiliser raw_message)
    const messageParts: string[] = [`Type de projet : ${typeLabel}`];
    if (company) messageParts.push(`Entreprise : ${company}`);
    messageParts.push("---");
    messageParts.push(rawMessage);
    const message = messageParts.join("\n");

    setStatus("sending");

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: name,
          email,
          telephone: "",
          message,
          type: typeValue,
          type_label: typeLabel,
          company,
          raw_message: rawMessage,
          source: "formulaire-contact-nitrello",
          submitted_at: new Date().toISOString(),
          // Honeypot transmis au serveur pour validation côté API.
          field_misc: typeof honeypot === "string" ? honeypot : "",
        }),
      });

      // Succès UNIQUEMENT si la réponse HTTP est OK ET que le corps confirme
      // explicitement {success:true}. Tout le reste bascule en erreur.
      const result = (await response.json().catch(() => null)) as
        | { success?: boolean }
        | null;
      if (response.ok && result?.success === true) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const isSending = status === "sending";
  const isSuccess = status === "success";

  return (
    <>
      {isSuccess && (
        <div className="form-success" id="form-success">
          <div className="form-success-icon">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="form-success-title">Message reçu.</p>
          <p className="form-success-sub">Je te réponds sous 24h ouvrées.</p>
        </div>
      )}

      {/* Le <form> reste monté en permanence : pendant le succès il est juste
          masqué (hidden), jamais retiré de l'arbre React. Sa classe `.in` posée
          par RevealOnScroll persiste donc, évitant la zone vide au retour idle. */}
      <form
        ref={formRef}
        className="contact-form reveal r-1"
        id="contact-form"
        onSubmit={handleSubmit}
        noValidate
        hidden={isSuccess}
      >
        {/* Honeypot anti-spam : caché aux humains, rempli automatiquement par les bots.
            display:none (mieux évité par Chrome moderne que le hors-écran). Nom neutre
            (field_misc), sans mot-clé reconnaissable, pour ne pas déclencher l'autofill. */}
        <input
          type="text"
          name="field_misc"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ display: "none" }}
        />
      <div className="form-head">
        <span className="form-num">/ FORMULAIRE</span>
        <h3>Décris-moi ton projet en quelques mots.</h3>
      </div>

      <div className="form-field">
        <label className="form-label">
          <span className="form-label-num">01</span>
          <span className="form-label-text">Type de projet</span>
        </label>
        <div className="form-radios">
          <label className="form-radio">
            <input type="radio" name="type" value="vitrine" required />
            <span>Site vitrine</span>
          </label>
          <label className="form-radio">
            <input type="radio" name="type" value="webapp" />
            <span>App web ou mobile</span>
          </label>
          <label className="form-radio">
            <input type="radio" name="type" value="tool" />
            <span>Outil interne</span>
          </label>
          <label className="form-radio">
            <input type="radio" name="type" value="auto" />
            <span>Automatisation</span>
          </label>
          <label className="form-radio">
            <input type="radio" name="type" value="other" />
            <span>Autre / je ne sais pas</span>
          </label>
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label className="form-label" htmlFor="cf-name">
            <span className="form-label-num">02</span>
            <span className="form-label-text">Ton prénom</span>
          </label>
          <input
            id="cf-name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Camille"
            required
          />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="cf-email">
            <span className="form-label-num">03</span>
            <span className="form-label-text">Ton email</span>
          </label>
          <input
            id="cf-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="camille@exemple.com"
            required
          />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="cf-company">
          <span className="form-label-num">04</span>
          <span className="form-label-text">
            Entreprise <span className="form-opt">(optionnel)</span>
          </span>
        </label>
        <input
          id="cf-company"
          type="text"
          name="company"
          autoComplete="organization"
          placeholder="Le nom de ta boîte, si tu en as une"
        />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="cf-msg">
          <span className="form-label-num">05</span>
          <span className="form-label-text">Ton message</span>
        </label>
        <textarea
          id="cf-msg"
          name="message"
          rows={5}
          placeholder="Raconte-moi en quelques lignes : le contexte, ce que tu veux faire, où tu en es, le délai si tu en as un."
          required
        />
      </div>

      <div className="form-field form-rgpd-field">
        <label className="form-checkbox-label">
          <input type="checkbox" name="rgpd" id="cf-rgpd" required />
          <span className="form-checkbox-text">
            J&apos;accepte que mes données soient utilisées pour traiter ma
            demande.
          </span>
        </label>
      </div>

      <div className="form-footer">
        <button
          type="submit"
          className="btn btn-primary form-submit"
          disabled={isSending}
        >
          {isSending ? "Envoi en cours…" : SUBMIT_BUTTON_LABEL}
        </button>
        <span className="form-foot-note">
          Je te réponds personnellement, sous 24h ouvrées.
        </span>
        {status === "error" && (
          <div
            className="form-error-msg"
            style={{
              marginTop: "16px",
              padding: "14px 18px",
              background: "rgba(224,64,64,0.08)",
              border: "1px solid rgba(224,64,64,0.3)",
              borderRadius: "6px",
              color: "#c63030",
              fontSize: "14px",
              lineHeight: 1.5,
            }}
          >
            Oups, l&apos;envoi a échoué. Tu peux m&apos;écrire directement à{" "}
            <a
              href="mailto:contact@nitrello.com"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              contact@nitrello.com
            </a>
          </div>
        )}
        </div>
      </form>
    </>
  );
}
