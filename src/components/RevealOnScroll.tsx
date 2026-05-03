"use client";

import { useEffect } from "react";

const REVEAL_THRESHOLD = 0.12;
const REVEAL_ROOT_MARGIN = "0px 0px -80px 0px";
const ABOVE_FOLD_OFFSET = 60;

export default function RevealOnScroll() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: REVEAL_THRESHOLD, rootMargin: REVEAL_ROOT_MARGIN },
    );

    elements.forEach((el) => observer.observe(el));

    document.body.classList.add("js-ready");

    // Révéler immédiatement ce qui est déjà visible (above the fold)
    const rafId = requestAnimationFrame(() => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - ABOVE_FOLD_OFFSET) {
          requestAnimationFrame(() => el.classList.add("in"));
        }
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      document.body.classList.remove("js-ready");
    };
  }, []);

  return null;
}
