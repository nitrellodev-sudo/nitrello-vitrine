import Link from "next/link";
import type { Metadata } from "next";
import { getAllPublishedPosts } from "@/lib/blog";
import { TAG_LABELS, formatDate } from "@/lib/blog-format";

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
            <li key={post.id} className="blog-card">
              <Link
                href={`/blog/${post.slug}`}
                className="blog-card__link"
                prefetch={true}
                scroll={true}
              >
                <div className="blog-card__meta">
                  <time
                    dateTime={post.published_at ?? ""}
                    className="blog-card__date"
                  >
                    {formatDate(post.published_at)}
                  </time>
                  {post.reading_time_min !== null && (
                    <span className="blog-card__reading-time">
                      · {post.reading_time_min} min de lecture
                    </span>
                  )}
                </div>
                <h2 className="blog-card__title">{post.title}</h2>
                {post.excerpt && (
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                )}
                {post.tags.length > 0 && (
                  <div className="blog-card__tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="blog-card__tag">
                        {TAG_LABELS[tag] ?? tag}
                      </span>
                    ))}
                  </div>
                )}
                <span className="blog-card__read-more">
                  Lire l&apos;article
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
