/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "flippant-meerkat-309.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
