import type { Metadata } from "next";
import { getAllPublishedPosts } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Automatisation, outils de gestion, retours de projets réels : des conseils concrets pour faire gagner du temps aux TPE et PME. Le blog de Nitrello.",
  alternates: {
    canonical: "https://nitrello.com/blog",
  },
  openGraph: {
    title: "Le blog Nitrello",
    description:
      "Automatisation, outils de gestion, retours de projets réels : des conseils concrets pour faire gagner du temps aux TPE et PME.",
    url: "https://nitrello.com/blog",
    type: "website",
    locale: "fr_FR",
  },
};

// ISR : revalidation toutes les 60 secondes
export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts = await getAllPublishedPosts();

  return (
    <main className="blog-page">
      <header className="blog-page__header">
        <p className="blog-page__kicker">LE CARNET</p>
        <h1 className="blog-page__title">Blog</h1>
        <p className="blog-page__intro">
          Automatisation, outils de gestion, cadrage de projet : des conseils
          concrets pour faire gagner du temps à ton entreprise, tirés de
          projets réels.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="blog-page__empty">
          <p>
            Aucun article publié pour l&apos;instant. Le premier arrive
            bientôt.
          </p>
        </div>
      ) : (
        <ul className="blog-page__list">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} variant="list" />
          ))}
        </ul>
      )}
    </main>
  );
}
