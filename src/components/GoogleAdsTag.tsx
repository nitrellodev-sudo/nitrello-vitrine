"use client";

import Script from "next/script";

// ID public de la balise Google Ads (visible dans le HTML servi, pas un secret).
export const GOOGLE_ADS_ID = "AW-18381393904";

// Consent Mode v2 en mode "basic" : ce composant n'est monté par ConsentBanner
// QU'APRÈS consentement explicite, donc l'état "default" reflète un
// consentement publicitaire déjà accordé. analytics_storage reste denied :
// la mesure d'audience du site est Vercel Analytics (cookieless), pas de GA.
// Le snippet inline pousse la file dataLayer PUIS ajoute lui-même le script
// externe (même pattern que CalEmbedScript) : l'ordre consent -> config ->
// chargement est garanti.
const GTAG_SNIPPET = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'denied'
});
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');
var s = document.createElement('script');
s.async = true;
s.src = 'https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}';
document.head.appendChild(s);
`;

export default function GoogleAdsTag() {
  return (
    <Script id="google-ads-gtag" strategy="afterInteractive">
      {GTAG_SNIPPET}
    </Script>
  );
}
