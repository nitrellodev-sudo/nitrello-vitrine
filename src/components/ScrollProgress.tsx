"use client";

import { useEffect } from "react";

// Met à jour la variable CSS --p sur .scroll-progress en fonction
// du pourcentage scrollé. Composant invisible posé sur l'élément existant.
export default function ScrollProgress() {
  useEffect(() => {
    const progressEl = document.querySelector<HTMLElement>(".scroll-progress");
    if (!progressEl) return;

    const update = (): void => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight || 1;
      const p = Math.min(100, Math.max(0, (h.scrollTop / max) * 100));
      progressEl.style.setProperty("--p", `${p.toFixed(2)}%`);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return null;
}
