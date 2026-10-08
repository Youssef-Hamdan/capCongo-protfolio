import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow LAN access to the dev server (e.g. phone / other device on Wi‑Fi)
  allowedDevOrigins: ["192.168.3.135"],
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
