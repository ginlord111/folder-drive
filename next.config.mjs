/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "earnest-oyster-831.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
