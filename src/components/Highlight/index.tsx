import HighlightCard from './HighlightCard'

export default function Highlight() {
  return (
    <div>
      <h1 className="text-[24px] font-bold pt-3">Today's Cryptocurrency Prices by Dmarket</h1>
      <h4 className="text-[14px] text-gray-500 mt-3">blablabla</h4>
      <div className="grid grid-cols-3 gap-4 mt-8">
        <HighlightCard title="Trending Coins" />
        <HighlightCard title="Top Gainers" />
        <HighlightCard title="Recently Added" />
      </div>
    </div>
  )
}
