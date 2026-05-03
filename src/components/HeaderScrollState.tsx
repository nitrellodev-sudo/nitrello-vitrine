"use client";

import { useEffect } from "react";

const SCROLL_THRESHOLD = 8;

// Ajoute la classe .scrolled sur #header dès que scrollY > 8.
// Composant invisible posé sur l'élément existant.
export default function HeaderScrollState() {
  useEffect(() => {
    const header = document.getElementById("header");
    if (!header) return;

    const update = (): void => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", update);
      header.classList.remove("scrolled");
    };
  }, []);

  return null;
}
