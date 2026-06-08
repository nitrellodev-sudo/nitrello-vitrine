"use client";

import { useEffect, useRef } from "react";

const PHRASES: readonly string[] = [
  "une app web.",
  "une app mobile.",
  "un outil métier.",
  "un MVP.",
  "un SaaS.",
  "un site vitrine.",
  "une automatisation.",
];

const TYPING_DELAY_MIN = 55;
const TYPING_DELAY_VARIATION = 40;
const DELETING_DELAY = 26;
const PAUSE_AFTER_FULL = 1800;
const PAUSE_BEFORE_NEXT = 260;

export default function HeroTypewriter() {
  const accentRef = useRef<HTMLSpanElement | null>(null);
  const typedRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const accentEl = accentRef.current;
    const typedEl = typedRef.current;
    if (!accentEl || !typedEl) return;

    // Garantit le premier mot affiché même au second montage (React StrictMode, dev),
    // où le cleanup précédent a vidé le span.
    typedEl.textContent = PHRASES[0];

    // Mesure la largeur de la phrase la plus longue et plafonne à la largeur du parent
    // pour éviter le sautillement du caret tout en restant dans la colonne texte
    const probe = document.createElement("span");
    probe.style.cssText =
      "position:absolute;visibility:hidden;white-space:nowrap;font:inherit;";
    accentEl.appendChild(probe);
    let maxW = 0;
    PHRASES.forEach((w) => {
      probe.textContent = w;
      if (probe.offsetWidth > maxW) maxW = probe.offsetWidth;
    });
    probe.remove();
    const parentEl = accentEl.parentElement;
    const cap = parentEl ? parentEl.clientWidth : Number.POSITIVE_INFINITY;
    accentEl.style.minWidth = `${Math.min(maxW + 14, cap)}px`;

    // Le premier mot (PHRASES[0]) est déjà rendu dans le span (cf. JSX),
    // on démarre donc directement en mode effacement de ce mot.
    let phraseIndex = 0;
    let charIndex = PHRASES[0].length;
    let deleting = true;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const tick = (): void => {
      const full = PHRASES[phraseIndex];
      if (!deleting) {
        charIndex++;
        typedEl.textContent = full.slice(0, charIndex);
        if (charIndex === full.length) {
          deleting = true;
          timeoutId = setTimeout(tick, PAUSE_AFTER_FULL);
          return;
        }
        timeoutId = setTimeout(
          tick,
          TYPING_DELAY_MIN + Math.random() * TYPING_DELAY_VARIATION,
        );
      } else {
        charIndex--;
        typedEl.textContent = full.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % PHRASES.length;
          timeoutId = setTimeout(tick, PAUSE_BEFORE_NEXT);
          return;
        }
        timeoutId = setTimeout(tick, DELETING_DELAY);
      }
    };

    // Laisse le premier mot affiché un court instant, puis lance l'effacement.
    timeoutId = setTimeout(tick, PAUSE_AFTER_FULL);

    return () => {
      if (timeoutId !== null) clearTimeout(timeoutId);
      typedEl.textContent = "";
    };
  }, []);

  return (
    <span className="accent" id="typed" ref={accentRef}>
      <span id="typed-text" ref={typedRef}>{PHRASES[0]}</span>
      <span className="caret"></span>
    </span>
  );
}
