"use client";

import Script from "next/script";

import { GOOGLE_ADS_BOOKING_LABEL } from "@/lib/google-ads";

// Charge l'embed Cal.com en lazy. Le snippet officiel installe `window.Cal`
// puis configure le namespace "echange" utilisé par les liens data-cal-link.
//
// L'écoute de `bookingSuccessful` est posée DANS le snippet et pas via le
// callback onReady de next/script : sur un script inline, onReady ne se
// déclenche pas de façon fiable et l'écoute n'était jamais enregistrée
// (constaté en test le 22/08/2026). Ici l'ordre est garanti par la file
// d'attente de Cal lui-même.
//
// C'est le seul signal qui prouve qu'un rendez-vous a réellement été pris :
// un clic sur un bouton ne prouve rien. Il alimente l'action principale de
// Google Ads. gtag n'existe que si le visiteur a accepté la bannière, d'où
// le garde-fou.
const CAL_EMBED_SNIPPET = `
(function (C, A, L) {
  let p = function (a, ar) { a.q.push(ar); };
  let d = C.document;
  C.Cal = C.Cal || function () {
    let cal = C.Cal;
    let ar = arguments;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      d.head.appendChild(d.createElement("script")).src = A;
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1];
      api.q = api.q || [];
      if (typeof namespace === "string") {
        cal.ns[namespace] = cal.ns[namespace] || api;
        p(cal.ns[namespace], ar);
        p(cal, ["initNamespace", namespace]);
      } else {
        p(cal, ar);
      }
      return;
    }
    p(cal, ar);
  };
})(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "echange", { origin: "https://app.cal.com" });
Cal.ns["echange"]("ui", {
  cssVarsPerTheme: {
    light: { "cal-brand": "#00BFFF" },
    dark:  { "cal-brand": "#00BFFF" }
  },
  hideEventTypeDetails: false,
  layout: "month_view"
});
Cal.ns["echange"]("on", {
  action: "bookingSuccessful",
  callback: function () {
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", "conversion", { send_to: "${GOOGLE_ADS_BOOKING_LABEL}" });
      }
    } catch (e) {
      // la mesure ne doit jamais casser la prise de rendez-vous
    }
  }
});
`;

export default function CalEmbedScript() {
  return (
    <Script id="cal-embed" strategy="lazyOnload">
      {CAL_EMBED_SNIPPET}
    </Script>
  );
}
