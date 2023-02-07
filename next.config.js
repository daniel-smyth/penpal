/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com", "platform-lookaside.fbsbx.com"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
