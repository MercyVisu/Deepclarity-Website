import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: false,
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
