/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "earnest-oyster-831.convex.cloud", // FOR PROD
        // hostname: "flippant-meerkat-309.convex.cloud", // FOR DEV
      },
    ],
  },
};

export default nextConfig;
