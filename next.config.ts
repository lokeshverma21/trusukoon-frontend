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
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "https://trusukoon-backend-pvt.vercel.app/api/v1/:path*",
      },
    ];
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:8000/api/:path*",
  //     },
  //   ];
  // },
};

export default nextConfig;
