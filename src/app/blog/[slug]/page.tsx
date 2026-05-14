import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getPublishedPostBySlug, getAllPublishedSlugs } from "@/lib/blog";

// Configuration du parser Markdown
marked.setOptions({
  gfm: true, // GitHub-Flavored Markdown (tables, strikethrough, etc.)
  breaks: true, // Conserve les retours à la ligne simples
});

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

// Type pour les params Next.js 15+ (Promise)
type Props = {
  params: Promise<{ slug: string }>;
};

// ISR : revalidation toutes les 60 secondes
export const revalidate = 60;

// Pré-génère toutes les pages des articles publiés au build
export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

// SEO dynamique par article
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: "Article introuvable — Nitrello",
    };
  }

  const title = post.meta_title ?? post.title;
  const description = post.meta_description ?? post.excerpt ?? undefined;
  const canonicalUrl = `https://nitrello.com/blog/${post.slug}`;
  const ogImage = post.og_image_url ?? post.cover_image_url ?? undefined;

  return {
    title: `${title} — Nitrello`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      locale: "fr_FR",
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      tags: post.tags,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Parse Markdown → HTML (côté serveur, sécurisé par marked)
  const contentHtml = await marked.parse(post.content_md);

  // JSON-LD Schema.org BlogPosting pour le SEO avancé
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.cover_image_url ?? post.og_image_url ?? undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: "Nicolas Tinnirello",
      url: "https://nitrello.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Nitrello",
      url: "https://nitrello.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://nitrello.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="blog-article">
        <nav className="blog-article__nav">
          <Link href="/blog" className="blog-article__back">
            ← Retour au blog
          </Link>
        </nav>

        <header className="blog-article__header">
          {post.tags.length > 0 && (
            <div className="blog-article__tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-article__tag">
                  {TAG_LABELS[tag] ?? tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="blog-article__title">{post.title}</h1>

          {post.excerpt && (
            <p className="blog-article__excerpt">{post.excerpt}</p>
          )}

          <div className="blog-article__meta">
            <time
              dateTime={post.published_at ?? ""}
              className="blog-article__date"
            >
              {formatDate(post.published_at)}
            </time>
            {post.reading_time_min !== null && (
              <span className="blog-article__reading-time">
                · {post.reading_time_min} min de lecture
              </span>
            )}
          </div>
        </header>

        {post.cover_image_url && (
          <figure className="blog-article__cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="blog-article__cover-img"
            />
          </figure>
        )}

        <article
          className="blog-article__content prose"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <footer className="blog-article__footer">
          <Link href="/blog" className="blog-article__back-bottom">
            ← Retour au blog
          </Link>
        </footer>
      </main>
    </>
  );
}
