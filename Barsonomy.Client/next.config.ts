import type { NextConfig } from "next";

// Read API_URL if provided, or default to localhost for local dev
const apiUrl =
  process.env.API_URL?.replace(/\/+$/, "") ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:5276"
    : "");

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    // If API_URL is missing during build, skip generating static rewrite rules.
    // Azure App Service will inject process.env.API_URL at runtime.
    if (!apiUrl) {
      return [];
    }

    return [
      {
        source: "/api/auth/:path*",
        destination: `${apiUrl}/:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
