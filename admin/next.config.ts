import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/secure_admin",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
