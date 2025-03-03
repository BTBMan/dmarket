import Highlight from '@/components/Highlight'
import CryptoTable from '@/components/CryptoTable'

export default function RootPage() {
  // const testCMCRequest = async () => {
  //   const data = await fetch(`${process.env.COIN_MARKET_DOMAIN}/cryptocurrency/listings/latest`, {
  //     headers: {
  //       'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_KEY as string,
  //     },
  //   }).then(res => res.json())

  //   console.log(data)
  // }

  return (
    <div>
      <Highlight />
      <div className="mt-6">
        <CryptoTable />
      </div>
    </div>
  )
}
