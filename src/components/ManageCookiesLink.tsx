"use client";

import { CONSENT_OPEN_EVENT } from "@/lib/consent";

// Feuille cliente minimale : permet à SiteFooter de rester un Server
// Component. Rouvre la bannière de consentement via un CustomEvent window.
export default function ManageCookiesLink() {
  return (
    <button
      type="button"
      className="consent-manage-link"
      onClick={() => window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT))}
    >
      Gérer mes cookies
    </button>
  );
}
