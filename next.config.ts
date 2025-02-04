import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

module.exports = {
  images: {
    domains: ['animeheroes.s3.sa-east-1.amazonaws.com'],
  },
};

export default nextConfig;
