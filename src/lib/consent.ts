// ============================================
// CONSENTEMENT PUBLICITAIRE - store externe minimal, sans React
// Le choix du visiteur reste côté navigateur (même pattern
// localStorage que le thème "nitrello-theme"). Consommé par
// ConsentBanner via useSyncExternalStore.
// ============================================

export const AD_CONSENT_STORAGE_KEY = "nitrello-consent-ads";
export const CONSENT_OPEN_EVENT = "nitrello:consent-open";
export const CONSENT_CHANGE_EVENT = "nitrello:consent-change";

export type AdConsentStatus = "granted" | "denied" | "unset";

// Filet si localStorage est indisponible (navigation privée stricte) :
// le choix vaut alors pour la session en cours uniquement.
let sessionFallback: AdConsentStatus = "unset";

export function readAdConsent(): AdConsentStatus {
  try {
    const value = localStorage.getItem(AD_CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : sessionFallback;
  } catch {
    return sessionFallback;
  }
}

export function writeAdConsent(status: "granted" | "denied"): void {
  sessionFallback = status;
  try {
    localStorage.setItem(AD_CONSENT_STORAGE_KEY, status);
  } catch {
    // localStorage indisponible : sessionFallback suffit pour la session
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT));
}

export function subscribeToAdConsent(onChange: () => void): () => void {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
}

// Suppression best-effort des cookies first-party _gcl_* posés par gtag,
// appelée quand le visiteur retire un consentement déjà accordé.
export function clearGoogleAdsCookies(): void {
  try {
    document.cookie.split(";").forEach((entry) => {
      const name = entry.split("=")[0]?.trim() ?? "";
      if (name.startsWith("_gcl")) {
        document.cookie = `${name}=; Max-Age=0; path=/; domain=.nitrello.com`;
        document.cookie = `${name}=; Max-Age=0; path=/`;
      }
    });
  } catch {
    // document.cookie inaccessible : rien à nettoyer
  }
}
