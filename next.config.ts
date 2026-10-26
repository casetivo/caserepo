import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif|ico)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  // Optimize images
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    formats: ["image/avif", "image/webp"],
  },
  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  // Experimental optimizations
  experimental: {
    // Optimize package imports - stops bundling entire packages
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
      "sonner",
    ],
  },
  // Reduce bundle size
  poweredByHeader: false,
  // Enable React strict mode for better performance detection
  reactStrictMode: true,
};

export default nextConfig;
