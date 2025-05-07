import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '', // Keep empty unless a specific port is needed
        pathname: '/sensory-canvas/**', // Be more specific if possible, e.g., '/your-bucket-name/**'
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb", // Increase the limit to 2MB
    }
  },
}

export default nextConfig;
