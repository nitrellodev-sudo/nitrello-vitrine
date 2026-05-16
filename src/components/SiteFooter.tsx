import Link from "next/link";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Méthode", href: "/#method" },
  { label: "Tarifs", href: "/#pricing" },
  { label: "Réalisations", href: "/#work" },
  { label: "Blog", href: "/blog" },
  { label: "À propos", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nitrello",
    ariaLabel: "LinkedIn de Nicolas Tinnirello — ouverture dans un nouvel onglet",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18.34V9.83H5.67v8.51h2.67ZM7 8.67a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1Zm11.33 9.67v-4.66c0-2.5-1.34-3.66-3.13-3.66a2.7 2.7 0 0 0-2.45 1.35V9.83h-2.67c.04.75 0 8.51 0 8.51h2.67v-4.75c0-.24.02-.48.09-.66.2-.48.63-.97 1.36-.97.97 0 1.36.74 1.36 1.81v4.57h2.77Z" />
      </svg>
    ),
  },
  {
    label: "Malt",
    href: "https://www.malt.fr/profile/nicolastinnirello",
    ariaLabel: "Profil Malt de Nicolas Tinnirello — ouverture dans un nouvel onglet",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M5 4h2.6v9.6L12 4l4.4 9.6V4H19v16h-2.6l-4.4-9.6L7.6 20H5V4Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nitrello",
    ariaLabel: "Instagram de Nicolas Tinnirello — ouverture dans un nouvel onglet",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1DhpLQ9SKR/",
    ariaLabel: "Facebook de Nicolas Tinnirello — ouverture dans un nouvel onglet",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.87.24-1.46 1.49-1.46H16.6V4.43A21.1 21.1 0 0 0 14.4 4.3c-2.2 0-3.7 1.34-3.7 3.8V10.5H8.1v3h2.6V21h2.8Z" />
      </svg>
    ),
  },
];

export default function SiteFooter() {
  return (
    <footer role="contentinfo" className="site-footer">
      <div className="site-footer__container container">
        <div className="site-footer__grid">

          <section className="site-footer__brand" aria-labelledby="footer-brand-heading">
            <h2 id="footer-brand-heading" className="sr-only">À propos de Nitrello</h2>
            <Link href="/" className="site-footer__logo" aria-label="Retour à l'accueil Nitrello">
              <svg viewBox="0 0 85 80" aria-hidden="true" focusable="false">
                <defs>
                  <linearGradient id="site-footer-logo-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#00BFFF" />
                    <stop offset="1" stopColor="#7B2FFF" />
                  </linearGradient>
                </defs>
                <g transform="scale(0.19277)">
                  <path d="m51.23,344.11C5.58,291.62-12.74,217.37,9.33,146.18,35.46,61.87,110.73,6.07,193.93.45,198.67.13,203.44,0,208.23,0c8.73.19,35.69,2.11,55.78,18.17,37.69,31.8,53.73,83.53,38.47,132.75l-34.56,111.5c-1,3.22-3.41,4.06-5.27,4.22-1.84.15-4.35-.31-5.84-3.33l-63.93-128.84c-8.15-16.38-25.26-25.96-43.51-24.3-18.04,1.65-33.06,14.63-38.43,31.93l-59.56,201.04-.16.95Z" fill="#00BFFF" />
                  <path d="m364.09,71.13c45.7,52.49,64.04,126.78,41.96,198.02-26.13,84.31-101.38,140.11-184.58,145.73-.5.03-1.01.07-1.51.09-39.59,2.4-77.62-17.8-96.88-52.47-.66-1.2-1.31-2.41-1.94-3.63-15.28-29.72-17.55-64.45-7.66-96.37l34.16-110.19c1-3.22,3.41-4.07,5.27-4.23,1.84-.14,4.36.32,5.86,3.33l63.93,128.84c8.06,16.23,24.93,25.78,42.99,24.34,18.08-1.45,33.22-13.58,38.59-30.9l59.8-202.56Z" fill="url(#site-footer-logo-grad)" />
                </g>
              </svg>
              <span>Nitrello</span>
            </Link>
            <p className="site-footer__tagline">Ton idée devient une application. Plus vite que tu ne l&apos;imagines.</p>
            <p className="site-footer__geo">Freelance dev web, mobile et IA en Isère. Pour les PME et indépendants à Grenoble et partout en France.</p>
          </section>

          <nav className="site-footer__nav" aria-labelledby="footer-nav-heading">
            <h2 id="footer-nav-heading" className="site-footer__heading">Navigation</h2>
            <ul className="site-footer__list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <section className="site-footer__contact" aria-labelledby="footer-contact-heading">
            <h2 id="footer-contact-heading" className="site-footer__heading">Contact</h2>
            <address className="site-footer__nap">
              <span className="site-footer__nap-line site-footer__nap-line--name">Nicolas Tinnirello</span>
              <span className="site-footer__nap-line">Saint-Sauveur · 38160 · Isère</span>
              <a className="site-footer__nap-line site-footer__nap-line--link" href="mailto:contact@nitrello.com">contact@nitrello.com</a>
              <a className="site-footer__nap-line site-footer__nap-line--link" href="tel:+33688649584">06 88 64 95 84</a>
            </address>
          </section>

          <section className="site-footer__social" aria-labelledby="footer-social-heading">
            <h2 id="footer-social-heading" className="site-footer__heading">Ailleurs</h2>
            <ul className="site-footer__list">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.ariaLabel}
                    className="site-footer__social-link"
                  >
                    <span className="site-footer__social-icon">{s.icon}</span>
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">© 2026 Nitrello · Nicolas Tinnirello</p>
          <ul className="site-footer__legal">
            <li><Link href="/mentions-legales">Mentions légales</Link></li>
            <li><Link href="/politique-confidentialite">Politique de confidentialité</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
