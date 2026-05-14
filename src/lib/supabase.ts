import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase pour la vitrine Nitrello (lecture publique uniquement).
 *
 * Architecture :
 * - Utilise la clé "publishable" (anciennement "anon") — safe à exposer côté client.
 * - Les RLS policies de Supabase garantissent que seuls les articles publiés
 *   (status = 'published') sont accessibles via cette clé.
 * - Aucune écriture possible depuis la vitrine (toutes les policies d'écriture
 *   exigent un user authentifié avec auth.uid() = user_id).
 *
 * Voir : docs/architecture/blog.md (à créer)
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL est manquant dans .env.local"
  );
}

if (!supabasePublishableKey) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY est manquant dans .env.local"
  );
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    // Vitrine = pas d'auth utilisateur, on désactive la persistance de session
    persistSession: false,
    autoRefreshToken: false,
  },
});

/**
 * Type d'un article de blog tel que stocké en base.
 * À garder synchronisé avec le schéma SQL (table public.blog_posts).
 */
export type BlogPost = {
  id: string;
  user_id: string;
  site_id: "nitrello" | "esprit-auto";
  slug: string;
  status: "draft" | "published" | "archived";
  title: string;
  excerpt: string | null;
  content_md: string;
  cover_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  tags: string[];
  reading_time_min: number | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};
