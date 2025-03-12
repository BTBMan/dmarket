import NFTCard from '@/components/NFTCard'
import DialogForm from '@/components/NFTForm/DialogForm'

export default function NftsPage() {
  return (
    <div>
      <div className="flex justify-end mb-[var(--main-padding)]">
        <DialogForm />
      </div>
      <div className="grid grid-cols-5 gap-4 max-xl:grid-cols-4">
        { Array.from({ length: 10 }, (_, i) => i + 1).map(v => (
          <NFTCard key={v} />
        )) }
      </div>
    </div>
  )
}
