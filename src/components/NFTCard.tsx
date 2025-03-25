import Image from 'next/image'
import { formatEther } from 'viem'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { NFtItem } from '@/app/profile/listing-nfts/page'

interface Props extends NFtItem {
  className?: string
}

export default function NFTCard({ className, metadata, tokenId, price, sold, seller }: Props) {
  const { address } = useAccount()

  return (
    <div className={className}>
      <Card className="overflow-hidden">
        <CardContent className="relative h-[340px] overflow-hidden">
          <Image
            className="hover:scale-110 transition-all duration-300 object-cover"
            src={metadata.image}
            alt={metadata.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </CardContent>
        <CardFooter className="p-4">
          <div className="w-full">
            <div className="flex items-center justify-between text-[16px]">
              <h3>{metadata.name} #{tokenId}</h3>
              <div>{formatEther(price)} ETH</div>
              {sold}
            </div>
            { (!sold && seller !== address) && <Button className="w-full mt-4 text-[16px]">BUY</Button> }
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
