import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [
      // Avoid app/index colliding with root on some hosts; keep old URL working
      { source: "/index", destination: "/ledger", permanent: false },
      { source: "/index/:path*", destination: "/ledger", permanent: false },
    ];
  },
};

export default nextConfig;
