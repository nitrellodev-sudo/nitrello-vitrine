"use client";

import { useEffect } from "react";

// Pose les listeners de toggle sur tous les .faq-q présents dans le DOM.
// Préserve le markup existant — chaque .faq-item garde sa structure HTML.
export default function FaqAccordion() {
  useEffect(() => {
    const buttons = Array.from(
      document.querySelectorAll<HTMLButtonElement>(".faq-item .faq-q"),
    );

    const handlers = buttons.map((btn) => {
      const handler = (): void => {
        const item = btn.closest(".faq-item");
        if (!item) return;
        const open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      };
      btn.addEventListener("click", handler);
      return { btn, handler };
    });

    return () => {
      handlers.forEach(({ btn, handler }) => {
        btn.removeEventListener("click", handler);
      });
    };
  }, []);

  return null;
}
