'use client'

import Image from 'next/image'
import { formatEther } from 'viem'
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { NFtItem } from '@/hooks/useNFTList'
import { NFTMarketplace } from '@/contract-data/NFTMarketplace'

interface Props extends NFtItem {
  className?: string
  onBought?: () => void
}

export default function NFTCard({ className, metadata, tokenId, price, sold, seller, onBought }: Props) {
  const { address } = useAccount()
  const [isLoading, setIsLoading] = useState(false)

  const { writeContract, data: tx, isError } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({
    hash: tx,
  })
  useEffect(() => {
    if (isError) {
      setIsLoading(false)
    }
    if (isSuccess) {
      setIsLoading(false)
      toast.success('NFT bought successfully', {
        position: 'top-center',
      })
      onBought?.()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError])

  const buyNFT = () => {
    setIsLoading(true)
    writeContract({
      ...NFTMarketplace,
      functionName: 'purchaseMarketItem',
      args: [tokenId],
      value: price,
    })
  }

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
              <h3>{ metadata.name } #{ tokenId }</h3>
              <div>{ formatEther(price) } ETH</div>
              { sold }
            </div>
            { (!sold && seller !== address) && (
              <Button className="w-full mt-4 text-[16px]" disabled={isLoading} onClick={buyNFT}>
                { isLoading ? <><Loader2 className="animate-spin" /> Buying...</> : 'BUY' }
              </Button>
            ) }
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
