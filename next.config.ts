import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Allow HMR / dev assets when testing from a phone on the local network. */
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
