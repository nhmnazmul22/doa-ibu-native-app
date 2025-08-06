import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/secure_admin",
  trailingSlash: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
