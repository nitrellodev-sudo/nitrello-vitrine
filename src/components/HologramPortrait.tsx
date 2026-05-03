"use client";

import { useEffect } from "react";

const MAX_TILT_DEG = 10;

// Effet 3D mouse-tilt sur #hologram-portrait.
// Respecte prefers-reduced-motion (désactive complètement si réduction demandée).
// Les variables CSS --mx, --my, --rx, --ry sont consommées par globals.css.
export default function HologramPortrait() {
  useEffect(() => {
    const portrait = document.getElementById("hologram-portrait");
    if (!portrait) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let rafId: number | null = null;
    let pendingX = 50;
    let pendingY = 50;

    const applyTilt = (): void => {
      const xPct = pendingX;
      const yPct = pendingY;
      const ry = ((xPct - 50) / 50) * MAX_TILT_DEG;
      const rx = -((yPct - 50) / 50) * MAX_TILT_DEG;
      portrait.style.setProperty("--mx", `${xPct}%`);
      portrait.style.setProperty("--my", `${yPct}%`);
      portrait.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      portrait.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      rafId = null;
    };

    const onEnter = (): void => {
      portrait.classList.add("is-tilting");
    };

    const onMove = (e: MouseEvent): void => {
      const rect = portrait.getBoundingClientRect();
      pendingX = ((e.clientX - rect.left) / rect.width) * 100;
      pendingY = ((e.clientY - rect.top) / rect.height) * 100;
      if (rafId === null) {
        rafId = requestAnimationFrame(applyTilt);
      }
    };

    const onLeave = (): void => {
      portrait.classList.remove("is-tilting");
      portrait.style.setProperty("--mx", "50%");
      portrait.style.setProperty("--my", "50%");
      portrait.style.setProperty("--rx", "0deg");
      portrait.style.setProperty("--ry", "0deg");
    };

    portrait.addEventListener("mouseenter", onEnter);
    portrait.addEventListener("mousemove", onMove);
    portrait.addEventListener("mouseleave", onLeave);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      portrait.removeEventListener("mouseenter", onEnter);
      portrait.removeEventListener("mousemove", onMove);
      portrait.removeEventListener("mouseleave", onLeave);
      portrait.classList.remove("is-tilting");
    };
  }, []);

  return null;
}
