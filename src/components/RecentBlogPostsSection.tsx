// TODO: extraire TAG_LABELS et formatDate dans src/lib/blog-format.ts à la prochaine occasion
// (actuellement dupliqués entre src/app/blog/page.tsx, src/app/blog/[slug]/page.tsx
// et ce composant — single source of truth à créer).

import Link from "next/link";
import { getAllPublishedPosts } from "@/lib/blog";

const TAG_LABELS: Record<string, string> = {
  "solutions-techniques": "Solutions techniques",
  "collaboration-client": "Collaboration client",
  "independance-projet": "Indépendance projet",
  "vie-de-freelance": "Vie de freelance",
};

function formatDate(isoDate: string | null): string {
  if (!isoDate) return "";
  return new Date(isoDate).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function RecentBlogPostsSection() {
  const posts = await getAllPublishedPosts(3);

  if (posts.length === 0) return null;

  return (
    <section id="recent-posts" className="recent-posts">
      <div className="container">
        <header className="recent-posts__header reveal">
          <p className="recent-posts__kicker">— LE CARNET</p>
          <h2 className="recent-posts__title">Articles récents</h2>
        </header>

        <ul className="recent-posts__grid">
          {posts.map((post) => (
            <li key={post.id} className="blog-card recent-posts__card">
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
                <h3 className="blog-card__title">{post.title}</h3>
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
              </Link>
            </li>
          ))}
        </ul>

        <div className="recent-posts__footer">
          <Link href="/blog" className="recent-posts__see-all">
            Voir tous les articles
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
