import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: '*.coinmarketcap.com',
      },
      {
        hostname: 'i.seadn.io',
      },
      {
        hostname: '*.mypinata.cloud',
      },
    ],
  },
}

export default nextConfig
