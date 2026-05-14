import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
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
    "Saint-Marcellin",
    "Isère",
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
// JSON-LD SCHEMA.ORG - structure pour Google E-E-A-T
// ============================================
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://nitrello.com/#nicolas",
      name: "Nicolas Tinnirello",
      url: "https://nitrello.com",
      image: "https://nitrello.com/nicolas.png",
      jobTitle: "Développeur freelance web, mobile et IA",
      worksFor: {
        "@id": "https://nitrello.com/#nitrello",
      },
      sameAs: [
        "https://www.linkedin.com/in/nitrello",
        "https://www.malt.fr/profile/nicolastinnirello",
        "https://www.instagram.com/nitrello",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://nitrello.com/#nitrello",
      name: "Nitrello",
      url: "https://nitrello.com",
      logo: "https://nitrello.com/favicon.svg",
      image: "https://nitrello.com/nicolas.png",
      description:
        "Développement freelance d'applications web et mobile, outils internes et automatisations IA pour PME, indépendants et startups.",
      founder: { "@id": "https://nitrello.com/#nicolas" },
      areaServed: { "@type": "Country", name: "France" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Saint-Marcellin",
        addressRegion: "Isère",
        addressCountry: "FR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "contact@nitrello.com",
        telephone: "+33688649584",
        availableLanguage: ["French"],
      },
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
    <html
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
