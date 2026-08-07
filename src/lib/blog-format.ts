/**
 * Utilitaires de formatage pour le blog (tags et dates).
 * Single source of truth utilisée par :
 * - src/app/blog/page.tsx (liste des articles)
 * - src/app/blog/[slug]/page.tsx (article seul)
 * - src/components/RecentBlogPostsSection.tsx (section home)
 */

export const TAG_LABELS: Record<string, string> = {
  "automatisation-ia": "Automatisation IA",
  "solutions-techniques": "Solutions techniques",
  "collaboration-client": "Collaboration client",
  "independance-projet": "Indépendance projet",
  "vie-de-freelance": "Vie de freelance",
};

export function formatDate(isoDate: string | null): string {
  if (!isoDate) return "";
  return new Date(isoDate).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
