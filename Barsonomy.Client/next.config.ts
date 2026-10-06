import type { NextConfig } from "next";

const apiUrl =
  process.env.API_URL?.replace(/\/+$/, "") ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:5276"
    : undefined);

if (!apiUrl) {
  throw new Error("API_URL must be set when building for production.");
}

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
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
