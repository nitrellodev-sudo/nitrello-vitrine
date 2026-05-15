"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // Ne pas scroller au top si on cible une ancre (ex: /#services)
    if (typeof window !== "undefined" && !window.location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
}
