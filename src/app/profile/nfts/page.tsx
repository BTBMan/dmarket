import NFTCard from '@/components/NFTCard'
import NFTForm from '@/components/NFTForm'

export default function NftsPage() {
  return (
    <div>
      <div className="flex justify-end mb-[var(--main-padding)]">
        <NFTForm />
      </div>
      <div className="grid grid-cols-5 gap-4 max-xl:grid-cols-4">
        { Array.from({ length: 10 }).map((_, index) => (
          <NFTCard key={index} />
        )) }
      </div>
    </div>
  )
}
