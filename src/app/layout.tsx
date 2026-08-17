import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import ConsentBanner from "@/components/ConsentBanner";
import ContactClickTracking from "@/components/ContactClickTracking";
import GoogleAdsTag from "@/components/GoogleAdsTag";
import HeaderScrollState from "@/components/HeaderScrollState";
import MobileNav from "@/components/MobileNav";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollRestoration from "@/components/ScrollRestoration";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

// ============================================
// POLICES GOOGLE FONTS - chargement optimise
// ============================================
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

// ============================================
// METADONNEES SEO - completes (OpenGraph, Twitter, JSON-LD)
// ============================================
export const metadata: Metadata = {
  metadataBase: new URL("https://nitrello.com"),
  title: {
    default: "Automatisation IA et outils sur mesure pour TPE et PME · Nitrello",
    template: "%s · Nitrello",
  },
  description:
    "Nicolas Tinnirello, développeur freelance en Isère. J'automatise par l'IA et je construis les outils de gestion qui font gagner du temps aux TPE et PME.",
  keywords: [
    "développeur freelance",
    "automatisation IA",
    "automatisation des tâches",
    "automatisation bâtiment",
    "automatisation BTP",
    "automatisation entreprise de nettoyage",
    "outils de gestion sur mesure",
    "CRM sur mesure",
    "développeur Next.js",
    "site vitrine",
    "TPE PME",
    "Grenoble",
    "Saint-Sauveur",
    "Isère",
    "Voiron",
    "Pays Voironnais",
  ],
  authors: [{ name: "Nicolas Tinnirello", url: "https://nitrello.com" }],
  creator: "Nicolas Tinnirello",
  publisher: "Nitrello",
  alternates: {
    canonical: "https://nitrello.com",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://nitrello.com",
    siteName: "Nitrello",
    title: "Je transforme ton temps perdu en argent gagné.",
    description:
      "Automatisation par l'IA, outils de gestion, sites sur-mesure. Je construis les outils qui travaillent pendant que tu fais ton métier.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Je transforme ton temps perdu en argent gagné.",
    description:
      "Automatisation par l'IA, outils de gestion, sites sur-mesure. Les outils travaillent, tu fais ton métier.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

// ============================================
// VIEWPORT - separe de metadata depuis Next.js 14
// ============================================
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

// ============================================
// JSON-LD SCHEMA.ORG — LocalBusiness + Person
// LocalBusiness : meilleur signal pour le SEO local que ProfessionalService
// Sans streetAddress (réservé aux mentions légales, à venir)
// Sans geo (sur-précision inutile pour activité freelance distribuée)
// ============================================
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://nitrello.com/#business",
      name: "Nitrello",
      alternateName: "Nitrello — Nicolas Tinnirello",
      description:
        "Automatisation par l'IA, outils de gestion et sites sur mesure pour les TPE, PME et indépendants, à Grenoble, en Isère et partout en France.",
      url: "https://nitrello.com",
      image: "https://nitrello.com/nicolas.png",
      logo: "https://nitrello.com/favicon.svg",
      telephone: "+33688649584",
      email: "contact@nitrello.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "36 Impasse du Domaine du Mûrier",
        addressLocality: "Saint-Sauveur",
        postalCode: "38160",
        addressRegion: "Isère",
        addressCountry: "FR",
      },
      areaServed: { "@type": "Country", name: "France" },
      founder: { "@id": "https://nitrello.com/#nicolas" },
      sameAs: [
        "https://www.instagram.com/nitrello",
        "https://www.facebook.com/share/1DhpLQ9SKR/",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://nitrello.com/#nicolas",
      name: "Nicolas Tinnirello",
      url: "https://nitrello.com",
      image: "https://nitrello.com/nicolas.png",
      jobTitle: "Développeur freelance en automatisation IA et outils sur mesure",
      worksFor: { "@id": "https://nitrello.com/#business" },
      knowsAbout: [
        "Automatisation",
        "Intelligence artificielle",
        "Développement web",
        "Développement mobile",
        "Next.js",
        "Supabase",
        "TypeScript",
      ],
      sameAs: [
        "https://www.linkedin.com/in/nitrello",
        "https://www.malt.fr/profile/nicolastinnirello",
      ],
    },
  ],
};

// ============================================
// SCRIPT ANTI-FOUC - dark mode par defaut
// Doit s'executer AVANT le rendu pour eviter le flash
// ============================================
const themeInitScript = `
(function () {
  try {
    var saved = localStorage.getItem('nitrello-theme');
    if (saved !== 'light') document.documentElement.setAttribute('data-theme', 'dark');
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

// ============================================
// LAYOUT ROOT
// ============================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning
      lang="fr"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Anti-FOUC : doit s'exécuter en tout premier, avant la moindre peinture.
            Balise <script> HTML native (bloquante) placée comme premier enfant du
            <head> — surtout pas next/script, qui s'injecterait trop tard. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* JSON-LD inliné en balise native : présent dans le HTML brut pour tous
            les robots (Bing, IA), pas seulement ceux qui exécutent le JS.
            next/script l'injecterait côté client uniquement. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#contenu" className="skip-link">Aller au contenu</a>
        <ScrollRestoration />
        <ScrollProgress />
        <HeaderScrollState />
        <MobileNav />
        <div className="scroll-progress" aria-hidden="true"></div>
        <SiteHeader />
        <div id="contenu">{children}</div>
        <SiteFooter />
        {/* Balise Google Ads : montée pour tous, consentements refusés par
            défaut (Consent Mode v2 avancé). Elle n'écrit aucun cookie tant
            que la bannière n'a pas été acceptée · voir GoogleAdsTag.tsx.
            ConsentBanner reste propriétaire du choix, GoogleAdsTag le relaie. */}
        <GoogleAdsTag />
        <ContactClickTracking />
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
