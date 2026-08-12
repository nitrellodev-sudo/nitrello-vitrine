// ============================================
// GOOGLE ADS - identifiants publics et envoi de conversions
// Ces valeurs sont visibles dans le HTML servi, ce ne sont pas des secrets.
// gtag n'existe sur la page QUE si le visiteur a accepté la bannière
// (voir ConsentBanner/GoogleAdsTag) : sans consentement, aucun envoi.
// ============================================

export const GOOGLE_ADS_ID = "AW-18381393904";

// Action « Envoi de formulaire de lead » créée dans Google Ads le 12/08/2026.
export const GOOGLE_ADS_LEAD_FORM_LABEL = `${GOOGLE_ADS_ID}/le-8CIjFsuAcEPCf97xE`;

type GtagFn = (...args: unknown[]) => void;

// Conversion « formulaire envoyé » : à appeler uniquement sur succès confirmé
// par l'API. Silencieux si gtag est absent (consentement refusé ou non donné).
export function trackLeadFormConversion(): void {
  try {
    const gtag = (window as Window & { gtag?: GtagFn }).gtag;
    if (typeof gtag === "function") {
      gtag("event", "conversion", { send_to: GOOGLE_ADS_LEAD_FORM_LABEL });
    }
  } catch {
    // l'envoi de conversion ne doit jamais casser le parcours du formulaire
  }
}
