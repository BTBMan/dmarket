import type { PropsWithChildren } from 'react'

declare global {
  type PageProps<P = unknown, S = unknown> = Readonly<{
    params: Promise<P>
    searchParams: Promise<S>
  }>

  type PagePropsWithChildren<P = unknown, S = unknown> = Readonly<PropsWithChildren<PageProps<P, S>>>
}

export {}
