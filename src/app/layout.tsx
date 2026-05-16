import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
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
    default: "Nitrello, Ton idée devient une application",
    template: "%s | Nitrello",
  },
  description:
    "Nicolas Tinnirello, développeur freelance. Je conçois des applications web et mobile, des outils internes et des automatisations pour PME, indépendants et startups.",
  keywords: [
    "développeur freelance",
    "développeur Next.js",
    "développeur React Native",
    "développement IA",
    "SaaS sur-mesure",
    "automatisation",
    "applications web",
    "applications mobile",
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
    title: "Nitrello, Ton idée devient une application",
    description:
      "Nicolas Tinnirello, développeur freelance. Applications web et mobile, outils internes, automatisations IA pour PME et startups.",
    images: [
      {
        url: "/nicolas.png",
        width: 1200,
        height: 630,
        alt: "Nicolas Tinnirello, développeur freelance Nitrello",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitrello, Ton idée devient une application",
    description:
      "Développeur freelance. Applications web et mobile, automatisations IA pour PME et startups.",
    images: ["/nicolas.png"],
    creator: "@nitrello",
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
        "Freelance dev web, mobile et IA. Sites internet, applications, outils internes et automatisations IA pour les PME et indépendants à Grenoble et partout en France.",
      url: "https://nitrello.com",
      image: "https://nitrello.com/nicolas.png",
      logo: "https://nitrello.com/favicon.svg",
      telephone: "+33688649584",
      email: "contact@nitrello.com",
      address: {
        "@type": "PostalAddress",
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
      jobTitle: "Développeur freelance web, mobile et IA",
      worksFor: { "@id": "https://nitrello.com/#business" },
      knowsAbout: [
        "Développement web",
        "Développement mobile",
        "Intelligence artificielle",
        "Automatisation",
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
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
        >
          {themeInitScript}
        </Script>
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(jsonLd)}
        </Script>
        <ScrollRestoration />
        <ScrollProgress />
        <HeaderScrollState />
        <MobileNav />
        <div className="scroll-progress" aria-hidden="true"></div>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
