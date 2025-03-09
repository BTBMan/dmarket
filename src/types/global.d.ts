import type { PropsWithChildren } from 'react'

declare global {
  type PageProps<P = unknown, S = unknown> = Readonly<{
    params: Promise<P>
    searchParams: Promise<S>
  }>

  type PagePropsWithChildren<P = unknown, S = unknown> = Readonly<PropsWithChildren<PageProps<P, S>>>

  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string
      COIN_MARKET_DOMAIN: string
      COIN_MARKET_KEY: string
      NEXT_PUBLIC_COIN_MARKET_STATIC_DOMAIN: string
      NEXT_PUBLIC_COIN_MARKET_GENERATED_DOMAIN: string
    }
  }
}

export {}
