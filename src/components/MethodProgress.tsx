"use client";

import { useEffect } from "react";

/**
 * Pilote la section "Ma methode" de /automatisation-ia : la ligne verticale
 * (#ia-method-fill) se remplit au scroll, et chaque etape (.ia-method-step)
 * s'allume quand elle devient visible. Composant listener invisible, sur le
 * meme modele que RevealOnScroll.
 */
export default function MethodProgress() {
  useEffect(() => {
    const steps = Array.from(
      document.querySelectorAll<HTMLElement>(".ia-method-step"),
    );
    const wrap = document.getElementById("ia-method-wrap");
    const fill = document.getElementById("ia-method-fill");
    if (!steps.length || !wrap || !fill) return;

    // Respect de prefers-reduced-motion : etat final statique, pas de suivi scroll.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      steps.forEach((s) => s.classList.add("in"));
      // La ligne couvre la hauteur du wrap moins les marges top/bottom (30px).
      fill.style.height =
        Math.max(0, wrap.getBoundingClientRect().height - 60) + "px";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in");
        });
      },
      { threshold: 0.5 },
    );
    steps.forEach((s) => observer.observe(s));

    const update = () => {
      const rect = wrap.getBoundingClientRect();
      const scrolled = Math.min(
        Math.max(window.innerHeight * 0.55 - rect.top, 0),
        rect.height,
      );
      fill.style.height = Math.max(0, scrolled - 30) + "px";
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return null;
}
