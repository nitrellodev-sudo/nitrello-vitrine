"use client";

import Script from "next/script";
import { useEffect } from "react";

import {
  AD_CONSENT_STORAGE_KEY,
  readAdConsent,
  subscribeToAdConsent,
} from "@/lib/consent";
import { GOOGLE_ADS_ID } from "@/lib/google-ads";

// ============================================================================
// Consent Mode v2 « AVANCÉ » (changement du 17/08/2026)
//
// AVANT (mode « basic ») : gtag.js n'était injecté qu'après un clic sur
// Accepter. Conséquence mesurée : la très grande majorité des visiteurs ne
// cliquant jamais sur une bannière, Google Ads ne recevait ni page vue, ni
// conversion, ni signal d'audience. Une campagne Performance Max privée de
// signal ne peut pas apprendre : elle dépense sans jamais converger. C'est
// la cause première du « zéro demande » côté campagne.
//
// MAINTENANT (mode « avancé », celui que Google recommande) : gtag est chargé
// pour tout le monde, mais démarre avec TOUS les consentements refusés.
// La garantie juridique qui a motivé la bannière est intacte :
//   - ad_storage: 'denied' au chargement  → AUCUN cookie n'est lu ni écrit
//     sur le terminal tant que le visiteur n'a pas accepté (article 82 de la
//     loi Informatique et Libertés, qui vise l'accès et l'inscription sur le
//     terminal — pas la simple requête réseau).
//   - ads_data_redaction: true            → tant que le refus est actif, les
//     identifiants de clic publicitaire sont expurgés des pings envoyés.
//   - url_passthrough: true               → le gclid est propagé dans l'URL
//     entre les pages plutôt que stocké dans un cookie.
// Ce qui change : Google reçoit des pings sans cookie (« cookieless pings »)
// qui lui permettent de MODÉLISER les conversions non observées et de nourrir
// les enchères intelligentes. C'est ce qui débloque la campagne.
//
// Pour revenir au mode strict d'avant : remettre `granted` impossible sans
// clic, c'est-à-dire remonter ce composant sous condition `status === granted`
// dans ConsentBanner et supprimer l'écoute ci-dessous. Un seul endroit.
// ============================================================================

// Le snippet inline pousse la file dataLayer, applique les valeurs par défaut,
// relit immédiatement un consentement déjà donné (visiteur récurrent : sinon
// il repasserait 500 ms en « denied » à chaque page), PUIS charge le script
// externe. L'ordre consent → config → chargement est garanti.
const GTAG_SNIPPET = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
try {
  if (localStorage.getItem('${AD_CONSENT_STORAGE_KEY}') === 'granted') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
  }
} catch (e) {}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');
var s = document.createElement('script');
s.async = true;
s.src = 'https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}';
document.head.appendChild(s);
`;

type GtagFn = (...args: unknown[]) => void;

function pushConsentUpdate(granted: boolean): void {
  const value = granted ? "granted" : "denied";
  const gtag = (window as Window & { gtag?: GtagFn }).gtag;
  if (typeof gtag !== "function") return;
  gtag("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });
}

export default function GoogleAdsTag() {
  // Le choix vit dans le store localStorage (ConsentBanner en est le
  // propriétaire, il l'écrit). Ici on ne fait que relayer les changements à
  // gtag : accepter passe en granted sans rechargement, refuser repasse en
  // denied. On ne lit volontairement pas le store au montage — le snippet
  // inline s'en est déjà chargé, avant même le rendu React.
  useEffect(() => {
    return subscribeToAdConsent(() => {
      pushConsentUpdate(readAdConsent() === "granted");
    });
  }, []);

  return (
    <Script id="google-ads-gtag" strategy="afterInteractive">
      {GTAG_SNIPPET}
    </Script>
  );
}
