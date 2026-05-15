import type { Metadata } from "next";
import { getAllPublishedPosts } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "Blog — Nitrello",
  description:
    "Réflexions et retours d'expérience de Nicolas Tinnirello sur le développement web/mobile/IA, la collaboration client, et la vie de freelance.",
  alternates: {
    canonical: "https://nitrello.com/blog",
  },
  openGraph: {
    title: "Blog Nitrello",
    description:
      "Le carnet de bord d'un freelance dev full-stack. Solutions techniques, collaboration client, indépendance projet, vie de freelance.",
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
        <p className="blog-page__kicker">— LE CARNET</p>
        <h1 className="blog-page__title">Blog</h1>
        <p className="blog-page__intro">
          Mes réflexions, retours d&apos;expérience et coulisses de freelance
          dev. Solutions techniques, collaboration client, indépendance projet,
          vie de freelance.
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
