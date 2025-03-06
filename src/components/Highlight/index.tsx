import { useState } from 'react'
import HighlightCard from './HighlightCard'

interface CardItem {
  title: string
  list: CoinItem[]
}

interface CoinItem {
  name: string
  symbol: string
  price: number
  change: number
}

export default function Highlight() {
  const [cardList, setCardList] = useState<Record<string, any>[]>([
    {
      title: 'Trending Coins',
      list: [],
    },
    {
      title: 'Trending on DEXScan',
      list: [],
    },
    {
      title: 'Recently Added',
      list: [],
    },
  ])

  const LIMIT = 5
  const getTrendingCoins = async () => {
    const res = await fetch(`${process.env.COIN_MARKET_DOMAIN}/v1/cryptocurrency/trending/latest?limit=${LIMIT}`, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_KEY as string,
      },
    }).then(res => res.json())

    return res
  }

  const getDEXTrendingCoins = async () => {
    const res = await fetch(`${process.env.COIN_MARKET_DOMAIN}/v4/dex/listings/quotes?limit=${LIMIT}`, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_KEY as string,
      },
    }).then(res => res.json())

    return res
  }

  const getRecentlyAddedCoins = async () => {
    const res = await fetch(`${process.env.COIN_MARKET_DOMAIN}/v1/cryptocurrency/listings/new?limit=${LIMIT}`, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_KEY as string,
      },
    }).then(res => res.json())

    return res
  }

  const getHighlightData = async () => {
    const resArr = await Promise.all([
      getTrendingCoins(),
      getDEXTrendingCoins(),
      getRecentlyAddedCoins(),
    ])
  }

  return (
    <div>
      <h1 className="text-[24px] font-bold pt-3">Today's Cryptocurrency Prices by Dmarket</h1>
      <h4 className="text-[14px] text-gray-500 mt-3">blablabla</h4>
      <div className="grid grid-cols-3 gap-4 mt-8">
        <HighlightCard title="Trending Coins" />
        <HighlightCard title="Trending on DEXScan" />
        <HighlightCard title="Recently Added" />
      </div>
    </div>
  )
}
