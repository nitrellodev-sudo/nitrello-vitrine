"use client";

import { useEffect } from "react";

/**
 * Anime le workflow de la page /automatisation-ia : chaque noeud s'allume en
 * sequence, une etincelle passe sur les connecteurs, la boucle tourne en
 * continu tant que #wf-track est visible (IntersectionObserver), s'arrete sinon.
 * Composant listener invisible, sur le meme modele que RevealOnScroll.
 */
export default function WorkflowAnimation() {
  useEffect(() => {
    const track = document.getElementById("wf-track");
    if (!track) return;

    const nodes = Array.from(track.querySelectorAll<HTMLElement>(".wf-node"));
    const conns = Array.from(
      track.querySelectorAll<HTMLElement>(".wf-connector"),
    );
    if (!nodes.length) return;

    const reset = () => {
      nodes.forEach((n) => n.classList.remove("active"));
      conns.forEach((c) => c.classList.remove("flowing", "done"));
    };

    // Respect de prefers-reduced-motion : etat final statique, pas de boucle.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      nodes.forEach((n) => n.classList.add("active"));
      conns.forEach((c) => c.classList.add("done"));
      return;
    }

    const timers = new Set<ReturnType<typeof setTimeout>>();
    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
    };
    const clearTimers = () => {
      timers.forEach((id) => clearTimeout(id));
      timers.clear();
    };

    let running = false;

    const cycle = () => {
      reset();
      const total = nodes.length;
      const activate = (idx: number) => {
        if (idx >= total) {
          later(cycle, 1400);
          return;
        }
        nodes[idx].classList.add("active");
        if (idx < total - 1) {
          const conn = conns[idx];
          later(() => {
            if (conn) {
              conn.classList.add("flowing");
              later(() => conn.classList.add("done"), 500);
            }
          }, 480);
          later(() => activate(idx + 1), 1050);
        } else {
          later(() => activate(idx + 1), 900);
        }
      };
      activate(0);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !running) {
            running = true;
            cycle();
          } else if (!entry.isIntersecting && running) {
            running = false;
            clearTimers();
            reset();
          }
        });
      },
      { threshold: 0.35 },
    );
    observer.observe(track);

    return () => {
      observer.disconnect();
      clearTimers();
      reset();
    };
  }, []);

  return null;
}
