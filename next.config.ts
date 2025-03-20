import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '*.coinmarketcap.com',
      },
      {
        hostname: 'i.seadn.io',
      },
    ],
  },
}

export default nextConfig
