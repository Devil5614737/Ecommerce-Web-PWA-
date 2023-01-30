/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      "cdn.rareblocks.xyz",
      "static.nike.com",
      "platform-lookaside.fbsbx.com",
      "lh3.googleusercontent.com",
    ],
  },
});

module.exports = nextConfig;
