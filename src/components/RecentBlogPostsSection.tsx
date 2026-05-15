import Link from "next/link";
import { getAllPublishedPosts } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";

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
            <BlogCard key={post.id} post={post} variant="card" />
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
