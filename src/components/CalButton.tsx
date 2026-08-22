"use client";

import { MouseEvent, ReactNode } from "react";

import { trackCalClickConversion } from "@/lib/google-ads";

interface CalButtonProps {
  href: string;
  className?: string;
  id?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
  children: ReactNode;
}

declare global {
  interface Window {
    Cal?: {
      ns?: Record<
        string,
        (action: string, config?: Record<string, unknown>) => void
      >;
    };
  }
}

export default function CalButton({
  href,
  className,
  id,
  ariaLabel,
  target,
  rel,
  children,
}: CalButtonProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    // Mesure d'abord, avant tout preventDefault : le visiteur a manifesté
    // l'intention de réserver, qu'il aille au bout ou non. Action secondaire
    // côté Google Ads, elle n'enchérit pas, elle sert à lire le tunnel.
    trackCalClickConversion();

    // Si Cal.com est chargé et le namespace "echange" initialisé → popup
    if (typeof window !== "undefined" && window.Cal?.ns?.["echange"]) {
      e.preventDefault();
      window.Cal.ns["echange"]("modal", { calLink: "nicolas-2j0lvm/echange" });
    }
    // Sinon, on laisse le clic suivre l'href (fallback redirection vers cal.com)
  };

  return (
    <a
      href={href}
      className={className}
      id={id}
      aria-label={ariaLabel}
      target={target}
      rel={rel}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
