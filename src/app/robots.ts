import type { MetadataRoute } from "next";

/**
 * Génère dynamiquement /robots.txt à partir de cette route Next.js.
 * Convention App Router : https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://nitrello.com/sitemap.xml",
  };
}
