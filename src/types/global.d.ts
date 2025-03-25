import type { PropsWithChildren } from 'react'

declare global {
  type PageProps<P = unknown, S = unknown> = Readonly<{
    params: Promise<P>
    searchParams: Promise<S>
  }>

  type PagePropsWithChildren<P = unknown, S = unknown> = Readonly<PropsWithChildren<PageProps<P, S>>>

  namespace NodeJS {
    interface ProcessEnv {
      // WalletConnect
      NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string

      // CoinMarketCap
      COIN_MARKET_DOMAIN: string
      COIN_MARKET_KEY: string
      NEXT_PUBLIC_COIN_MARKET_STATIC_DOMAIN: string
      NEXT_PUBLIC_COIN_MARKET_GENERATED_DOMAIN: string

      // Foundry
      TEST_PRIVATE_KEY: string
      LOCAL_PRIVATE_KEY: string
      LOCAL_RPC_URL: string
      SEPOLIA_RPC_URL: string
      ETHERSCAN_API_KEY: string

      // Pinata
      PINATA_JWT: string
      NEXT_PUBLIC_GATEWAY_URL: string
    }
  }

  interface NFTMetadata {
    name: string
    description: string
    image: string
    attributes?: Record<string, any>[]
  }
}

export {}
