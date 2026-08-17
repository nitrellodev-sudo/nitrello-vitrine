"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  CONSENT_OPEN_EVENT,
  clearGoogleAdsCookies,
  readAdConsent,
  subscribeToAdConsent,
  writeAdConsent,
  type AdConsentStatus,
} from "@/lib/consent";

// null côté serveur et pendant l'hydratation : rien n'est rendu, le HTML SSR
// et le premier rendu client coïncident (aucun mismatch). Après hydratation,
// useSyncExternalStore relit le store localStorage et re-rend avec le choix.
const getServerSnapshot = (): AdConsentStatus | null => null;

// Propriétaire unique de l'état de consentement publicitaire : cette bannière
// ÉCRIT le choix, GoogleAdsTag (monté dans layout.tsx, indépendamment) le LIT
// et le relaie à gtag via Consent Mode v2. Depuis le passage en mode avancé,
// la balise n'est plus montée d'ici : elle est présente pour tout le monde,
// avec les consentements refusés par défaut (voir GoogleAdsTag).
export default function ConsentBanner() {
  const status = useSyncExternalStore<AdConsentStatus | null>(
    subscribeToAdConsent,
    readAdConsent,
    getServerSnapshot,
  );
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (status === null) return null;

  const isOpen = status === "unset" || reopened;

  const accept = () => {
    setReopened(false);
    writeAdConsent("granted");
  };

  const refuse = () => {
    const hadGranted = status === "granted";
    setReopened(false);
    writeAdConsent("denied");
    if (hadGranted) {
      // Retrait d'un consentement déjà accordé. En Consent Mode v2 avancé,
      // GoogleAdsTag repasse gtag en `denied` tout seul (il écoute le store) :
      // plus besoin de recharger la page. Il reste à purger les cookies
      // _gcl_* déjà posés, que gtag ne supprime pas de lui-même.
      clearGoogleAdsCookies();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="consent-banner"
          role="region"
          aria-label="Gestion des cookies"
        >
          <p className="consent-banner__text">
            Ce site utilise un cookie pour mesurer l&apos;efficacité de ses
            publicités. Il n&apos;est activé qu&apos;avec votre accord.{" "}
            <Link href="/politique-confidentialite">En savoir plus</Link>
          </p>
          <div className="consent-banner__actions">
            <button
              type="button"
              className="consent-banner__btn"
              onClick={refuse}
            >
              Refuser
            </button>
            <button
              type="button"
              className="consent-banner__btn"
              onClick={accept}
            >
              Accepter
            </button>
          </div>
        </div>
      )}
    </>
  );
}
