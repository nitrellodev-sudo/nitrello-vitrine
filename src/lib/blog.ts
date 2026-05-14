import { supabase, type BlogPost } from "./supabase";

export type BlogPostPreview = Pick<
  BlogPost,
  | "id"
  | "slug"
  | "title"
  | "excerpt"
  | "cover_image_url"
  | "tags"
  | "reading_time_min"
  | "published_at"
>;

export async function getAllPublishedPosts(): Promise<BlogPostPreview[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "id, slug, title, excerpt, cover_image_url, tags, reading_time_min, published_at"
    )
    .eq("site_id", "nitrello")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[blog] Erreur getAllPublishedPosts:", error);
    return [];
  }

  return data ?? [];
}

export async function getPublishedPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("site_id", "nitrello")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[blog] Erreur getPublishedPostBySlug:", error);
    return null;
  }

  return data;
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("site_id", "nitrello")
    .eq("status", "published");

  if (error) {
    console.error("[blog] Erreur getAllPublishedSlugs:", error);
    return [];
  }

  return data?.map((row) => row.slug) ?? [];
}