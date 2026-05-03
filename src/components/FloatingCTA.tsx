"use client";

import { useEffect } from "react";

const HERO_SCROLL_RATIO = 0.55;
const CONTACT_VISIBILITY_RATIO = 0.55;
const HERO_HEIGHT_FALLBACK = 600;

// Toggle .is-visible sur #float-cta selon la position de scroll :
// - visible après ~55% du hero
// - masqué dès que la section #contact ou le footer entrent en vue
export default function FloatingCTA() {
  useEffect(() => {
    const cta = document.getElementById("float-cta");
    if (!cta) return;

    const heroEl =
      document.querySelector<HTMLElement>("#home") ||
      document.querySelector<HTMLElement>(".hero") ||
      document.querySelector<HTMLElement>("#hero") ||
      document.querySelector<HTMLElement>("header");
    const contactEl = document.querySelector<HTMLElement>("#contact");
    const footerEl = document.querySelector<HTMLElement>("footer");

    const update = (): void => {
      const scrolled = window.scrollY;
      const heroH = heroEl ? heroEl.offsetHeight : HERO_HEIGHT_FALLBACK;
      const pastHero = scrolled > heroH * HERO_SCROLL_RATIO;

      let inContactZone = false;
      if (contactEl) {
        const r = contactEl.getBoundingClientRect();
        if (r.top < window.innerHeight * CONTACT_VISIBILITY_RATIO) {
          inContactZone = true;
        }
      }
      if (footerEl) {
        const r = footerEl.getBoundingClientRect();
        if (r.top < window.innerHeight) {
          inContactZone = true;
        }
      }

      if (pastHero && !inContactZone) {
        cta.classList.add("is-visible");
      } else {
        cta.classList.remove("is-visible");
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cta.classList.remove("is-visible");
    };
  }, []);

  return null;
}
