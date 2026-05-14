import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  },

  // ============================================
  // Headers de securite (best practices 2026)
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
