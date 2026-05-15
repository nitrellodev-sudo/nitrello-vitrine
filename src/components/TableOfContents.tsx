"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { type TocEntry } from "@/lib/blog-utils";

interface TableOfContentsProps {
  entries: TocEntry[];
}

export default function TableOfContents({ entries }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const h2Count = entries.filter((entry) => entry.level === 2).length;

  useEffect(() => {
    if (entries.length === 0) return;

    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    // Bande active : entre 90px du haut (sous le header) et 30% du haut.
    // On ne reset jamais activeId : si rien n'est dans la bande (bas de page),
    // le dernier titre actif reste surligné — comportement attendu.
    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-90px 0px -70% 0px",
        threshold: 0,
      }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [entries]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string): void => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setIsOpen(false);
  };

  if (entries.length === 0) return null;

  return (
    <nav
      className="blog-toc"
      role="navigation"
      aria-label="Sommaire de l'article"
    >
      <button
        type="button"
        className="blog-toc__toggle"
        aria-expanded={isOpen}
        aria-controls="blog-toc-list"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>Sommaire ({h2Count})</span>
        <span className="blog-toc__toggle-icon" aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <ul
        id="blog-toc-list"
        className="blog-toc__list"
        data-open={isOpen}
      >
        {entries.map((entry) => {
          const itemClass =
            entry.level === 3
              ? "blog-toc__item blog-toc__item--h3"
              : "blog-toc__item";
          const linkClass =
            activeId === entry.id
              ? "blog-toc__link blog-toc__link--active"
              : "blog-toc__link";
          return (
            <li key={entry.id} className={itemClass}>
              <a
                href={`#${entry.id}`}
                className={linkClass}
                onClick={(event) => handleClick(event, entry.id)}
              >
                {entry.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
