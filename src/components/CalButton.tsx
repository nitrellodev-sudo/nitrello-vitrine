"use client";

import { MouseEvent, ReactNode } from "react";

interface CalButtonProps {
  href: string;
  className?: string;
  id?: string;
  ariaLabel?: string;
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
  children,
}: CalButtonProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    // Si Cal.com est chargé et le namespace "30min" initialisé → popup
    if (typeof window !== "undefined" && window.Cal?.ns?.["30min"]) {
      e.preventDefault();
      window.Cal.ns["30min"]("modal", { calLink: "nicolas-2j0lvm/30min" });
    }
    // Sinon, on laisse le clic suivre l'href (fallback redirection vers cal.com)
  };

  return (
    <a
      href={href}
      className={className}
      id={id}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
