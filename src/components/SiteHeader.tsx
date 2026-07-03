import ThemeToggle from "@/components/ThemeToggle";

export default function SiteHeader() {
  return (
    <header id="header">
      <div className="container">
        <nav className="nav">
          <a href="/" className="nav-logo" aria-label="Nitrello">
            <svg viewBox="0 0 85 80" aria-hidden="true">
              <defs>
                <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#00BFFF" />
                  <stop offset="1" stopColor="#7B2FFF" />
                </linearGradient>
              </defs>
              <g transform="scale(0.19277)">
                <path d="m51.23,344.11C5.58,291.62-12.74,217.37,9.33,146.18,35.46,61.87,110.73,6.07,193.93.45,198.67.13,203.44,0,208.23,0c8.73.19,35.69,2.11,55.78,18.17,37.69,31.8,53.73,83.53,38.47,132.75l-34.56,111.5c-1,3.22-3.41,4.06-5.27,4.22-1.84.15-4.35-.31-5.84-3.33l-63.93-128.84c-8.15-16.38-25.26-25.96-43.51-24.3-18.04,1.65-33.06,14.63-38.43,31.93l-59.56,201.04-.16.95Z" fill="#00BFFF" />
                <path d="m364.09,71.13c45.7,52.49,64.04,126.78,41.96,198.02-26.13,84.31-101.38,140.11-184.58,145.73-.5.03-1.01.07-1.51.09-39.59,2.4-77.62-17.8-96.88-52.47-.66-1.2-1.31-2.41-1.94-3.63-15.28-29.72-17.55-64.45-7.66-96.37l34.16-110.19c1-3.22,3.41-4.07,5.27-4.23,1.84-.14,4.36.32,5.86,3.33l63.93,128.84c8.06,16.23,24.93,25.78,42.99,24.34,18.08-1.45,33.22-13.58,38.59-30.9l59.8-202.56Z" fill="url(#logo-grad)" />
              </g>
            </svg>
            <span>Nitrello</span>
          </a>
          <ul className="nav-links" id="nav-links">
            <li><a href="/automatisation-ia" className="nav-link-ia">Automatisation IA<span className="nav-dot-new" aria-hidden="true"></span></a></li>
            <li><a href="/#services">Services</a></li>
            <li><a href="/#method">Méthode</a></li>
            <li><a href="/#pricing">Chiffrage</a></li>
            <li><a href="/#work">Réalisations</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/#about">À propos</a></li>
            <li><a href="/#faq">FAQ</a></li>
          </ul>
          <div className="nav-cta">
            <ThemeToggle />
            <a href="/#contact" className="btn btn-ghost">En discuter</a>
            <button className="nav-toggle" aria-label="Menu" id="nav-toggle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
