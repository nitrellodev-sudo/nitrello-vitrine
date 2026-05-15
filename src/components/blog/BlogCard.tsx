import Image from "next/image";
import Link from "next/link";
import type { BlogPostPreview } from "@/lib/blog";
import { TAG_LABELS, formatDate } from "@/lib/blog-format";

type Variant = "list" | "card";

interface BlogCardProps {
  post: BlogPostPreview;
  variant?: Variant;
}

interface VariantConfig {
  rootClass: string;
  titleTag: "h2" | "h3";
  sizes: string;
}

const VARIANT_CONFIG: Record<Variant, VariantConfig> = {
  list: {
    rootClass: "blog-card blog-card--list",
    titleTag: "h2",
    sizes: "(max-width: 768px) 100vw, 300px",
  },
  card: {
    rootClass: "blog-card recent-posts__card blog-card--card",
    titleTag: "h3",
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  },
};

export default function BlogCard({ post, variant = "list" }: BlogCardProps) {
  const config = VARIANT_CONFIG[variant];
  const Title = config.titleTag;

  return (
    <li className={config.rootClass}>
      <Link
        href={`/blog/${post.slug}`}
        className="blog-card__link"
        prefetch={true}
        scroll={true}
      >
        {post.cover_image_url && (
          <figure className="blog-card__cover">
            <Image
              src={post.cover_image_url}
              alt={post.cover_image_alt ?? post.title}
              width={640}
              height={360}
              sizes={config.sizes}
              className="blog-card__cover-img"
            />
          </figure>
        )}
        <div className="blog-card__body">
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
          <Title className="blog-card__title">{post.title}</Title>
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
        </div>
      </Link>
    </li>
  );
}
