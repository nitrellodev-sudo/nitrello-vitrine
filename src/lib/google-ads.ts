// ============================================
// GOOGLE ADS - identifiants publics et envoi de conversions
// Ces valeurs sont visibles dans le HTML servi, ce ne sont pas des secrets.
//
// Depuis le passage en Consent Mode v2 « avancé » (voir GoogleAdsTag), gtag
// est TOUJOURS présent sur la page : c'est l'état de consentement qui décide
// si Google peut poser un cookie. Un envoi de conversion sans consentement
// part donc quand même, sans identifiant publicitaire (ping cookieless) :
// Google le compte en conversion modélisée. C'est exactement ce qui manquait
// à la campagne, qui ne voyait quasiment rien.
// ============================================

export const GOOGLE_ADS_ID = "AW-18381393904";

// ── Actions de conversion ──────────────────────────────────────────────────
//
// Chaque entrée est le libellé (« label ») renvoyé par Google Ads à la
// création de l'action de conversion, SANS le préfixe AW-xxxxxxxx/.
// Une entrée vide = action pas encore créée dans Google Ads : l'envoi est
// alors silencieusement ignoré, rien ne casse.
//
// Où le trouver : Google Ads → Objectifs → Conversions → l'action →
// « Configurer la balise » → « Installer la balise manuellement ». Le
// snippet contient send_to: 'AW-18381393904/XXXXXXXXXXXXXXXXXXX'.
export const GOOGLE_ADS_LABELS = {
  /** Formulaire de contact envoyé et confirmé par l'API. Créée le 12/08/2026. */
  leadForm: "le-8CIjFsuAcEPCf97xE",
  /** Rendez-vous confirmé dans le calendrier Cal.com. À créer. */
  booking: "",
  /** Clic sur le numéro de téléphone. À créer. */
  phoneClick: "",
  /** Clic sur l'adresse email. À créer. */
  emailClick: "",
} as const;

export type GoogleAdsAction = keyof typeof GOOGLE_ADS_LABELS;

// Rétrocompat : l'ancien nom exporté, toujours le chemin complet send_to.
export const GOOGLE_ADS_LEAD_FORM_LABEL = `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LABELS.leadForm}`;

type GtagFn = (...args: unknown[]) => void;

// Anti-doublon : un clic sur « appeler » peut partir plusieurs fois (double
// tap, retour arrière). Google déduplique côté serveur pour les conversions
// « uniques », mais autant ne pas polluer la mesure à la source.
const alreadySent = new Set<GoogleAdsAction>();

/**
 * Envoie une conversion Google Ads. Silencieux (et sans erreur) si l'action
 * n'a pas encore de label, ou si gtag n'est pas disponible.
 *
 * @param action    clé de GOOGLE_ADS_LABELS
 * @param options.once  n'envoyer qu'une fois par chargement de page
 */
export function trackConversion(
  action: GoogleAdsAction,
  options: { once?: boolean } = {},
): void {
  try {
    const label = GOOGLE_ADS_LABELS[action];
    if (!label) return;
    if (options.once) {
      if (alreadySent.has(action)) return;
      alreadySent.add(action);
    }

    const gtag = (window as Window & { gtag?: GtagFn }).gtag;
    if (typeof gtag !== "function") return;

    gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${label}`,
    });
  } catch {
    // l'envoi de conversion ne doit jamais casser le parcours du visiteur
  }
}

/** Conversion « formulaire envoyé » : sur succès confirmé par l'API uniquement. */
export function trackLeadFormConversion(): void {
  trackConversion("leadForm");
}

/** Conversion « rendez-vous pris » : sur événement bookingSuccessful de Cal.com. */
export function trackBookingConversion(): void {
  trackConversion("booking");
}

/** Conversion « appel » : clic sur un lien tel:, une fois par page. */
export function trackPhoneClickConversion(): void {
  trackConversion("phoneClick", { once: true });
}

/** Conversion « email » : clic sur un lien mailto:, une fois par page. */
export function trackEmailClickConversion(): void {
  trackConversion("emailClick", { once: true });
}
