import NFTCard from '@/components/NFTCard'

export default function NftsPage() {
  return (
    <div>
      <div className="grid grid-cols-5 gap-4 max-xl:grid-cols-4">
        { Array.from({ length: 10 }).map((_, index) => (
          <NFTCard key={index} />
        )) }
      </div>
    </div>
  )
}
