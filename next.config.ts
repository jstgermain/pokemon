import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["raw.githubusercontent.com"],
  },
  productionBrowserSourceMaps: true,
};

export default nextConfig;
