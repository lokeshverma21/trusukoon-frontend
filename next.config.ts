import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns  : [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        // pathname: '/path/to/images/*',
      },
    ],
    // domains: ['images.unsplash.com'], // Add the Unsplash domain here
  },
};

export default nextConfig;
