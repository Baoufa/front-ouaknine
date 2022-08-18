/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
  },
  images: {
    minimumCacheTTL: 2629800,
    loader: 'default',
    domains: ['cdn.sanity.io'],
    // dangerouslyAllowSVG: true,
    // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
