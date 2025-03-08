import type { CoinItem } from './HighlightCard'
import HighlightCard from './HighlightCard'
import { formatCurrency } from '@/utils'

const HIGHLIGHT_LIMIT = 5

function convertToCardItem(item: any): CoinItem {
  return {
    id: item.id,
    slug: item.slug,
    symbol: item.symbol,
    price: formatCurrency(item.quote.USD.price),
    percent_change_24h: item.quote.USD.percent_change_24h.toFixed(2),
  }
}

export default async function Highlight() {
  const getHighlightData = async () => {
    const res = await fetch(`${process.env.COIN_MARKET_DOMAIN}/v1/cryptocurrency/listings/latest`, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_KEY as string,
      },
    }).then(res => res.json())

    const topRankingCoins: CoinItem[] = []
    const topGainersCoins: CoinItem[] = []
    const topLosersCoins: CoinItem[] = []

    ;(res.data || []).forEach((item: any) => {
      if (topRankingCoins.length < HIGHLIGHT_LIMIT) {
        topRankingCoins.push(convertToCardItem(item))
      }
      if (item.quote.USD.percent_change_24h > 0 && topGainersCoins.length < HIGHLIGHT_LIMIT) {
        topGainersCoins.push(convertToCardItem(item))
      }
      else if (item.quote.USD.percent_change_24h < 0 && topLosersCoins.length < HIGHLIGHT_LIMIT) {
        topLosersCoins.push(convertToCardItem(item))
      }
    })

    return { topRankingCoins, topGainersCoins, topLosersCoins }
  }

  const { topRankingCoins, topGainersCoins, topLosersCoins } = await getHighlightData()

  return (
    <div>
      <h1 className="text-[24px] font-bold pt-3">Today's Cryptocurrency Prices by Dmarket</h1>
      <h4 className="text-[14px] text-gray-500 mt-3">Some message here...</h4>
      <div className="grid grid-cols-3 gap-4 mt-8">
        <HighlightCard title="Top Rankings" list={topRankingCoins} />
        <HighlightCard title="Top Gainers" list={topGainersCoins} />
        <HighlightCard title="Top Losers" list={topLosersCoins} />
      </div>
    </div>
  )
}
