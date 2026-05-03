"use client";

import { useEffect, useState } from "react";

// ============================================
// THEME TOGGLE - Bouton dark/light mode
// ============================================
// Logique :
// 1. Au montage, lire data-theme sur <html> (deja set par le script anti-FOUC du layout)
// 2. Au clic, toggler entre dark et light
// 3. Persister le choix dans localStorage (cle 'nitrello-theme')
// 4. Le CSS gere l'affichage soleil/lune via les variables et data-theme
// ============================================

type Theme = "dark" | "light";

export default function ThemeToggle() {
  // Etat initial : on lit le theme actuel applique sur <html>
  // (initialise par le script anti-FOUC du layout avant le rendu)
  const [theme, setTheme] = useState<Theme>("dark");

  // Au montage cote client, on synchronise l'etat avec ce qui est dans le DOM
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "light" || currentTheme === "dark") {
      setTheme(currentTheme);
    }
  }, []);

  // Fonction de bascule
  const toggleTheme = () => {
    const newTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    // Applique sur <html> pour que le CSS reagisse
    document.documentElement.setAttribute("data-theme", newTheme);

    // Persiste le choix dans localStorage
    try {
      localStorage.setItem("nitrello-theme", newTheme);
    } catch (e) {
      // localStorage indisponible (mode prive, etc.) - on continue silencieusement
      console.warn("localStorage indisponible, theme non persiste", e);
    }
  };

  return (
    <button
      className="theme-toggle"
      id="theme-toggle"
      type="button"
      aria-label="Changer de thème"
      onClick={toggleTheme}
    >
      <svg
        className="theme-icon-sun"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <svg
        className="theme-icon-moon"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
      </svg>
    </button>
  );
}
