'use client'

import { useAccount, useReadContract, useReadContracts } from 'wagmi'
import { useEffect, useState } from 'react'
import type { NFtItem } from '../listing-nfts/page'
import NFTCard from '@/components/NFTCard'
import { NFTMarketplace } from '@/contract-data/NFTMarketplace'

export default function NftsPage() {
  const [nftList, setNftList] = useState<NFtItem[]>([])
  const { address } = useAccount()
  const { data: nfts } = useReadContract({
    ...NFTMarketplace,
    functionName: 'getNFTsByOwner',
    args: [address!],
  })
  console.log(nfts)
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
        (nfts || []).map(async (item, _idx) => {
          // const tokenUri = (tokenUris || [])[idx].result
          const metadata: NFTMetadata = await fetch('https://blush-accessible-wolf-315.mypinata.cloud/ipfs/bafkreiawe24ncwwg67y4x456s5ku36meyvujcsr37xpjug2isvr2xjemjy').then(res => res.json())

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
      <div className="grid grid-cols-5 gap-4 max-xl:grid-cols-4">
        { (nftList || []).map(item => (
          <NFTCard key={item.tokenId} {...item} />
        )) }
      </div>
    </div>
  )
}
