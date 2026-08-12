"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import GoogleAdsTag from "@/components/GoogleAdsTag";
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

// Propriétaire unique de l'état de consentement publicitaire.
// La balise Google Ads n'est montée que si le statut est "granted".
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
      // Retrait d'un consentement déjà accordé : gtag est chargé dans la
      // page et ne peut pas être déchargé proprement. On supprime les
      // cookies _gcl_* puis on recharge pour repartir sans traceur.
      clearGoogleAdsCookies();
      window.location.reload();
    }
  };

  return (
    <>
      {status === "granted" && <GoogleAdsTag />}
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
