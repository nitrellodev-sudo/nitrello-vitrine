"use client";

import Script from "next/script";
import { useEffect } from "react";

import { trackBookingConversion } from "@/lib/google-ads";

// Événement interne émis par le snippet Cal.com quand un rendez-vous est
// réellement confirmé (et non au simple clic, ni à l'ouverture de la popup).
// Il fait le pont entre le monde « string inline » du snippet et React.
const CAL_BOOKED_EVENT = "nitrello:cal-booked";

// Charge l'embed Cal.com en lazy. Le snippet officiel installe `window.Cal`
// puis configure le namespace "echange" utilisé par les liens data-cal-link.
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
      window.dispatchEvent(new CustomEvent("${CAL_BOOKED_EVENT}"));
    } catch (e) {}
  }
});
`;

export default function CalEmbedScript() {
  // Rendez-vous confirmé dans la popup Cal.com → conversion Google Ads.
  // Le formulaire de contact n'était jusqu'ici la SEULE conversion mesurée :
  // une prise de rendez-vous, pourtant le signal d'intention le plus fort du
  // site, était complètement invisible pour la campagne.
  useEffect(() => {
    const onBooked = (): void => trackBookingConversion();
    window.addEventListener(CAL_BOOKED_EVENT, onBooked);
    return () => window.removeEventListener(CAL_BOOKED_EVENT, onBooked);
  }, []);

  return (
    <Script id="cal-embed" strategy="lazyOnload">
      {CAL_EMBED_SNIPPET}
    </Script>
  );
}
