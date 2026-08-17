// ============================================
// ATTRIBUTION - d'où vient le visiteur qui remplit le formulaire
//
// Problème résolu : quand une demande arrive enfin, rien dans l'email de
// notification ne dit si elle vient d'une annonce Google Ads, du référencement
// naturel ou d'un bouche-à-oreille. Impossible de juger la campagne au réel,
// c'est-à-dire de la seule façon qui compte (des vrais leads, pas des clics).
//
// Choix de conception : la capture se fait UNIQUEMENT en mémoire, au premier
// chargement du module côté client. Rien n'est écrit dans un cookie, dans le
// localStorage ni dans le sessionStorage — donc rien qui touche au terminal du
// visiteur, donc aucun consentement requis (article 82). Les identifiants sont
// lus dans l'URL d'arrivée, que le visiteur transmet lui-même, et ne sont
// transmis qu'avec une demande de contact qu'il envoie volontairement.
//
// Limite assumée : une navigation interne via <Link> perd les paramètres de
// l'URL. Comme le module garde la valeur d'arrivée en mémoire pour toute la
// durée de la session JS, l'attribution survit à ces navigations.
// ============================================

/** Identifiants de clic publicitaire posés par Google sur l'URL de destination. */
const AD_CLICK_PARAMS = ["gclid", "gbraid", "wbraid", "msclkid"] as const;

/** Paramètres de campagne classiques (UTM), si la campagne en pose. */
const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

/** Longueur max retenue par valeur : borne ce qui part vers l'API. */
const MAX_VALUE_LENGTH = 200;

let captured: string | null = null;

function capture(): string {
  if (typeof window === "undefined") return "";

  const parts: string[] = [];
  try {
    const params = new URLSearchParams(window.location.search);

    for (const key of AD_CLICK_PARAMS) {
      const value = params.get(key);
      if (value) parts.push(`${key}=${value.slice(0, MAX_VALUE_LENGTH)}`);
    }
    for (const key of UTM_PARAMS) {
      const value = params.get(key);
      if (value) parts.push(`${key}=${value.slice(0, MAX_VALUE_LENGTH)}`);
    }

    // Aucun paramètre publicitaire : le référent brut reste une indication
    // utile (moteur de recherche, réseau social, lien direct).
    if (parts.length === 0 && document.referrer) {
      try {
        const referrerHost = new URL(document.referrer).hostname;
        if (referrerHost && referrerHost !== window.location.hostname) {
          parts.push(`referrer=${referrerHost}`);
        }
      } catch {
        // referrer non parsable : on n'ajoute rien
      }
    }
  } catch {
    // URL illisible : l'attribution est un bonus, jamais un blocage
  }

  return parts.join(" · ");
}

/**
 * Origine du visiteur, figée au premier appel côté client.
 * Chaîne vide si aucune information exploitable.
 *
 * À appeler tôt (ContactClickTracking le fait dès l'hydratation, sur toutes
 * les pages) : au moment de l'envoi du formulaire, une navigation interne a
 * pu remplacer l'URL d'arrivée. Le résultat n'est jamais mémorisé côté
 * serveur, où window n'existe pas — sinon la valeur vide serait figée pour
 * toute la session.
 */
export function getVisitorOrigin(): string {
  if (typeof window === "undefined") return "";
  if (captured === null) captured = capture();
  return captured;
}

/** Vrai si le visiteur est arrivé par un clic sur une annonce Google Ads. */
export function isFromGoogleAds(): boolean {
  const origin = getVisitorOrigin();
  return (
    origin.includes("gclid=") ||
    origin.includes("gbraid=") ||
    origin.includes("wbraid=")
  );
}
