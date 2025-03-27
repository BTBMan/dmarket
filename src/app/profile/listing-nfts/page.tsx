'use client'

import { useAccount, useReadContract, useReadContracts } from 'wagmi'
import { useEffect, useState } from 'react'
import NFTCard from '@/components/NFTCard'
import DialogForm from '@/components/NFTForm/DialogForm'
import { NFTMarketplace } from '@/contract-data/NFTMarketplace'

export interface NFtItem {
  tokenId: bigint
  price: bigint
  seller: `0x${string}`
  owner: `0x${string}`
  sold: boolean
  metadata: NFTMetadata
}

export default function NftsPage() {
  const [nftList, setNftList] = useState<NFtItem[]>([])
  const { address } = useAccount()
  const { data: nfts } = useReadContract({
    ...NFTMarketplace,
    functionName: 'getSellingListBySeller',
    args: [address!],
  })
  const { data: tokenUris } = useReadContracts({
    contracts: (nfts || []).map(item => ({
      ...NFTMarketplace,
      functionName: 'tokenURI',
      args: [item.tokenId],
    })),
  })

  useEffect(() => {
    const handleNfts = async () => {
      const list = await Promise.all(
        (nfts || []).map(async (item, idx) => {
          const tokenUri = (tokenUris || [])[idx].result as string
          const metadata: NFTMetadata = await fetch(tokenUri).then(res => res.json())

          return {
            tokenId: item.tokenId,
            price: item.price,
            seller: item.seller,
            owner: item.owner,
            sold: item.sold,
            metadata,
          }
        }),
      )

      setNftList(list)
    }

    if (nfts?.length && tokenUris?.length) {
      handleNfts()
    }
  }, [nfts, tokenUris])

  return (
    <div>
      <div className="flex justify-end mb-[var(--main-padding)]">
        <DialogForm />
      </div>
      <div className="grid grid-cols-5 gap-4 max-xl:grid-cols-4">
        { (nftList || []).map(item => (
          <NFTCard key={item.tokenId} {...item} />
        )) }
      </div>
    </div>
  )
}
