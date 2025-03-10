export function cmcFetch(pathname: string, options?: RequestInit) {
  return fetch(`${process.env.COIN_MARKET_DOMAIN}/${pathname}`, {
    headers: {
      'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_KEY as string,
    },
    ...options,
  })
}
