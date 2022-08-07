/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
  },
  images: {
    loader: "default",
    domains: ["localhost"],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
