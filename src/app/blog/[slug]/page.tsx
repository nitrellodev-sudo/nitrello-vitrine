import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked, Renderer, type Tokens } from "marked";
import { getPublishedPostBySlug, getAllPublishedSlugs } from "@/lib/blog";
import TableOfContents from "@/components/TableOfContents";
import {
  calculateReadingTime,
  countWords,
  extractFaq,
  extractTableOfContents,
  slugifyHeading,
  stripInlineMarkdown,
  type FaqEntry,
} from "@/lib/blog-utils";
import { TAG_LABELS, formatDate } from "@/lib/blog-format";

const SITE_URL = "https://nitrello.com";

// Crédits photo des covers d'articles. Conditionnel par slug, en dur.
// Quand on aura 3+ articles avec crédit (Rule of Three), on évaluera un
// pattern Map / colonne BDD selon la structure réelle observée.
function renderCoverCredit(slug: string) {
  if (slug === "methode-discovery-cahier-des-charges-actionnable") {
    return (
      <figcaption className="blog-article__cover-credit">
        Photo&nbsp;:{" "}
        <a
          href="https://unsplash.com/@kellysikkema"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kelly Sikkema
        </a>{" "}
        / Unsplash
      </figcaption>
    );
  }
  return null;
}

// --- Helpers Markdown / SEO ---------------------------------------------

// --- Marked configuration -----------------------------------------------

const renderer = new Renderer();
renderer.heading = function (
  this: Renderer,
  token: Tokens.Heading
): string {
  const { tokens, depth } = token;
  const html = this.parser.parseInline(tokens);
  if (depth === 2 || depth === 3) {
    const plain = stripInlineMarkdown(token.text ?? html.replace(/<[^>]*>/g, ""));
    const id = slugifyHeading(plain);
    return `<h${depth} id="${id}">${html}</h${depth}>\n`;
  }
  return `<h${depth}>${html}</h${depth}>\n`;
};

marked.use({
  gfm: true,
  breaks: true,
  renderer,
});

// --- Next.js page -------------------------------------------------------

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

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
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
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

  const contentHtml = await marked.parse(post.content_md);

  const readingTime =
    post.reading_time_min ?? calculateReadingTime(post.content_md);
  const wordCount = countWords(post.content_md);
  const tocEntries = extractTableOfContents(post.content_md);
  const faqEntries = extractFaq(post.content_md);
  const showToc = tocEntries.filter((entry) => entry.level === 2).length >= 4;

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;

  const blogPostingJsonLd = {
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
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Nitrello",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    keywords: post.tags.join(", "),
    wordCount,
    timeRequired: `PT${readingTime}M`,
    articleSection: post.tags.map((tag) => TAG_LABELS[tag] ?? tag),
    inLanguage: "fr-FR",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  const faqJsonLd =
    faqEntries.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqEntries.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: {
              "@type": "Answer",
              text: answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <main className="blog-article">
        <nav className="blog-breadcrumbs" aria-label="Fil d'Ariane">
          <ol className="blog-breadcrumbs__list">
            <li className="blog-breadcrumbs__item">
              <Link href="/" className="blog-breadcrumbs__link">
                Accueil
              </Link>
            </li>
            <li
              className="blog-breadcrumbs__separator"
              aria-hidden="true"
            >
              ›
            </li>
            <li className="blog-breadcrumbs__item">
              <Link href="/blog" className="blog-breadcrumbs__link">
                Blog
              </Link>
            </li>
            <li
              className="blog-breadcrumbs__separator"
              aria-hidden="true"
            >
              ›
            </li>
            <li className="blog-breadcrumbs__item">
              <span
                className="blog-breadcrumbs__current"
                aria-current="page"
              >
                {post.title}
              </span>
            </li>
          </ol>
        </nav>

        <div className="blog-article__layout">
          <article className="blog-article__main">
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
                <span className="blog-article__reading-time">
                  · {readingTime} min de lecture
                </span>
              </div>
            </header>

            {post.cover_image_url && (
              <figure className="blog-article__cover">
                <Image
                  src={post.cover_image_url}
                  alt={post.cover_image_alt ?? post.title}
                  width={1600}
                  height={900}
                  priority
                  sizes="(max-width: 768px) 100vw, 760px"
                  className="blog-article__cover-img"
                />
                {renderCoverCredit(post.slug)}
              </figure>
            )}

            <div
              className="blog-article__content prose"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </article>

          {showToc && (
            <aside className="blog-article__sidebar">
              <TableOfContents entries={tocEntries} />
            </aside>
          )}
        </div>

        <footer className="blog-article__footer">
          <Link href="/blog" className="blog-article__back-bottom">
            ← Retour au blog
          </Link>
        </footer>
      </main>
    </>
  );
}
