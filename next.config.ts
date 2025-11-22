import type { NextConfig } from "next";

// Performance optimizations for better FCP

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    optimizeCss: true,
    webVitalsAttribution: ['CLS', 'LCP', 'FCP'],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        }
      ]
    }
  ],
};

export default nextConfig;
