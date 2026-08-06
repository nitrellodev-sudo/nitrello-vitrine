import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!supabaseUrl) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL manquante au build. Vérifier .env.local en local ou les variables d'environnement du projet sur Vercel.",
  );
}
const supabaseHostname = new URL(supabaseUrl).hostname;

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.28"],
  // ============================================
  // Reactivite stricte - aide a detecter les bugs
  // ============================================
  reactStrictMode: true,

  // ============================================
  // Compression gzip pour les reponses HTTP
  // ============================================
  compress: true,

  // ============================================
  // Cache puissant pour images optimisees
  // ============================================
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 an
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseHostname,
        pathname: "/storage/v1/object/public/blog-images/**",
      },
    ],
  },

  // ============================================
  // Headers de securite (best practices 2026)
  // + Content-Type explicite pour les fichiers .vcf
  // ============================================
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/:path*.vcf",
        headers: [
          {
            key: "Content-Type",
            value: "text/vcard; charset=utf-8",
          },
          {
            key: "Content-Disposition",
            value: "attachment",
          },
        ],
      },
    ];
  },

  // ============================================
  // Rewrites - mapping /card et /card/ vers le HTML statique
  // ============================================
  async rewrites() {
    return [
      {
        source: "/card",
        destination: "/card/index.html",
      },
      {
        source: "/card/",
        destination: "/card/index.html",
      },
    ];
  },

  // ============================================
  // Redirections SEO (preservation referencement)
  // ============================================
  async redirects() {
    return [
      // Si quelqu'un a un ancien lien vers /index.html, on redirige vers la home
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
