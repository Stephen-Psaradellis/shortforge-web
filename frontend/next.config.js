/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['shortforge-backend-production.up.railway.app', 'localhost'],
  },
}

module.exports = nextConfig
