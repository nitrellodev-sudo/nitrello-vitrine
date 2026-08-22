// ============================================
// GOOGLE ADS - identifiants publics et envoi de conversions
// Ces valeurs sont visibles dans le HTML servi, ce ne sont pas des secrets.
// gtag n'existe sur la page QUE si le visiteur a accepté la bannière
// (voir ConsentBanner/GoogleAdsTag) : sans consentement, aucun envoi.
// ============================================

export const GOOGLE_ADS_ID = "AW-18381393904";

// Action « Envoi de formulaire de lead » créée dans Google Ads le 12/08/2026.
export const GOOGLE_ADS_LEAD_FORM_LABEL = `${GOOGLE_ADS_ID}/le-8CIjFsuAcEPCf97xE`;

// Actions créées le 22/08/2026 pour mesurer le parcours de prise de rendez-vous,
// qui était jusque là totalement aveugle : aucun bouton Cal.com n'envoyait rien.
//
// « Réservation d'appel » est l'action PRINCIPALE du compte. C'est le vrai
// résultat commercial et le seul signal qui doit piloter les enchères.
export const GOOGLE_ADS_BOOKING_LABEL = `${GOOGLE_ADS_ID}/cDx3CJa-6uUcEPCf97xE`;

// « Clic prise de RDV » est SECONDAIRE, en observation seulement : elle mesure
// l'ouverture du calendrier, pas la réservation. Elle sert à lire le tunnel
// (combien ouvrent le calendrier pour combien réservent vraiment) et ne doit
// jamais servir à enchérir, sinon on optimise sur des gens qui ne réservent pas.
export const GOOGLE_ADS_CAL_CLICK_LABEL = `${GOOGLE_ADS_ID}/cvRbCM6U-eUcEPCf97xE`;

type GtagFn = (...args: unknown[]) => void;

// Envoi bas niveau, silencieux si gtag est absent (consentement refusé ou pas
// encore donné). Ne remonte jamais d'exception : un échec de mesure ne doit
// jamais casser le parcours du visiteur.
function sendConversion(label: string): void {
  try {
    const gtag = (window as Window & { gtag?: GtagFn }).gtag;
    if (typeof gtag === "function") {
      gtag("event", "conversion", { send_to: label });
    }
  } catch {
    // volontairement vide, voir commentaire ci-dessus
  }
}

// Conversion « formulaire envoyé » : à appeler uniquement sur succès confirmé
// par l'API.
export function trackLeadFormConversion(): void {
  sendConversion(GOOGLE_ADS_LEAD_FORM_LABEL);
}

// Conversion « clic sur un bouton de prise de RDV », donc ouverture du
// calendrier. Appelée par CalButton, sur tous les boutons du site.
export function trackCalClickConversion(): void {
  sendConversion(GOOGLE_ADS_CAL_CLICK_LABEL);
}
