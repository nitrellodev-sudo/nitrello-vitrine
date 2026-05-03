"use client";

import { useEffect } from "react";

// Composant invisible : pose les listeners sur les éléments existants
// (#nav-toggle bouton hamburger, #nav-links la liste) sans restructurer
// le DOM, pour préserver le layout exact de l'index.html original.
export default function MobileNav() {
  useEffect(() => {
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");
    if (!navToggle || !navLinks) return;

    const onToggleClick = (): void => {
      navLinks.classList.toggle("open");
    };

    const onLinkClick = (e: Event): void => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A") {
        navLinks.classList.remove("open");
      }
    };

    navToggle.addEventListener("click", onToggleClick);
    navLinks.addEventListener("click", onLinkClick);

    return () => {
      navToggle.removeEventListener("click", onToggleClick);
      navLinks.removeEventListener("click", onLinkClick);
      navLinks.classList.remove("open");
    };
  }, []);

  return null;
}
