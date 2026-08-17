"use client";

import { useEffect } from "react";

import { getVisitorOrigin } from "@/lib/attribution";
import {
  trackEmailClickConversion,
  trackPhoneClickConversion,
} from "@/lib/google-ads";

// ============================================================================
// Mesure des contacts directs : clic sur un numéro de téléphone (tel:) ou sur
// une adresse email (mailto:).
//
// Pourquoi c'est nécessaire : le site propose trois chemins de contact — le
// formulaire, la popup Cal.com, et le contact direct (téléphone / email,
// présents dans la section Contact ET dans le pied de page). Seul le
// formulaire était mesuré. Un visiteur venu d'une annonce qui appelle
// directement — le cas le plus fréquent pour une prestation locale sur
// mobile — n'existait tout simplement pas dans Google Ads.
//
// Écoute déléguée sur le document : un seul listener couvre tous les liens de
// toutes les pages, y compris ceux ajoutés après coup (menu burger, popup).
// La capture est en phase bouillonnante et ne fait qu'observer : le clic suit
// son cours normal, rien n'est intercepté ni retardé.
// ============================================================================
export default function ContactClickTracking() {
  useEffect(() => {
    // Fige l'origine du visiteur dès l'arrivée : ce composant est monté dans
    // layout.tsx, donc sur toutes les pages. Attendre l'envoi du formulaire
    // serait trop tard, une navigation interne ayant pu effacer le gclid de
    // l'URL entre-temps.
    getVisitorOrigin();

    const onClick = (event: MouseEvent): void => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a[href]");
      if (!link) return;

      // getAttribute et non .href : le DOM normalise, on veut le préfixe brut.
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        trackPhoneClickConversion();
      } else if (href.startsWith("mailto:")) {
        trackEmailClickConversion();
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
