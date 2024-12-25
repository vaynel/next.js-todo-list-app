import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  //reactStrictMode: false, // Strict Mode 비활성화
  /* config options here */
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
