"use client";

import Script from "next/script";

// Charge l'embed Cal.com en lazy. Le snippet officiel installe `window.Cal`
// puis configure le namespace "30min" utilisé par les liens data-cal-link.
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
Cal("init", "30min", { origin: "https://app.cal.com" });
Cal.ns["30min"]("ui", {
  cssVarsPerTheme: {
    light: { "cal-brand": "#00BFFF" },
    dark:  { "cal-brand": "#00BFFF" }
  },
  hideEventTypeDetails: false,
  layout: "month_view"
});
`;

export default function CalEmbedScript() {
  return (
    <Script id="cal-embed" strategy="lazyOnload">
      {CAL_EMBED_SNIPPET}
    </Script>
  );
}
