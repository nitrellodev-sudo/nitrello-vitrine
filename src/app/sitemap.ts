import type { MetadataRoute } from "next";
import { getAllPublishedPosts } from "@/lib/blog";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://nitrello.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl + "/",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: baseUrl + "/blog",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: baseUrl + "/automatisation-ia",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const posts = await getAllPublishedPosts();
  const articlePages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: baseUrl + "/blog/" + post.slug,
    lastModified: post.published_at ? new Date(post.published_at) : now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
