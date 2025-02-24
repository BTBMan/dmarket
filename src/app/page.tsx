import Highlight from '@/components/Highlight'
import CryptoTable from '@/components/CryptoTable'

export default function RootPage() {
  return (
    <div>
      <Highlight />
      <div className="mt-6">
        <CryptoTable />
      </div>
    </div>
  )
}
