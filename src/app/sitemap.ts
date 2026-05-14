import type { MetadataRoute } from "next";

/**
 * Génère dynamiquement /sitemap.xml à partir de cette route Next.js.
 * Convention App Router : https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 *
 * Note : les articles de blog seront ajoutés ici en Phase 1 SEO,
 * en lisant la table Supabase `blog_posts` (status=published).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nitrello.com";
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/card/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
