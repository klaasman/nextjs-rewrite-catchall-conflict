import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [
        {
          source: "/:path*",
          destination: "https://httpstat.us/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
