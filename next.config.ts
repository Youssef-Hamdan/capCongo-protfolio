import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /** In dev, avoid long-lived optimizer cache so replaced `public/` files show up quickly. */
    minimumCacheTTL: process.env.NODE_ENV === "development" ? 0 : undefined,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
