import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Désactive la vérification TypeScript pendant le build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Désactive également ESLint pour être sûr
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flashinfos237-images.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;