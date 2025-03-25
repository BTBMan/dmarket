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
      {
        hostname: '*.mypinata.cloud',
      },
    ],
  },
}

export default nextConfig
