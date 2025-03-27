'use client'

import { useAccount, useReadContract, useReadContracts } from 'wagmi'
import { useEffect, useState } from 'react'
import NFTCard from '@/components/NFTCard'
import DialogForm from '@/components/NFTForm/DialogForm'
import { NFTMarketplace } from '@/contract-data/NFTMarketplace'
import Skeleton from '@/components/Skeleton'
import Empty from '@/components/Empty'

export interface NFtItem {
  tokenId: bigint
  price: bigint
  seller: `0x${string}`
  owner: `0x${string}`
  sold: boolean
  metadata: NFTMetadata
}

export default function NftsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [nftList, setNftList] = useState<NFtItem[]>([])
  const { address } = useAccount()
  const { data: nfts, refetch: refetchNfts } = useReadContract({
    ...NFTMarketplace,
    functionName: 'getSellingListBySeller',
    args: [address!],
  })
  const { data: tokenUris, refetch: refetchTokenUris } = useReadContracts({
    contracts: (nfts || []).map(item => ({
      ...NFTMarketplace,
      functionName: 'tokenURI',
      args: [item.tokenId],
    })),
  })

  useEffect(() => {
    const handleNfts = async () => {
      setIsLoading(true)
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

      setIsLoading(false)
      setNftList(list)
    }

    if (nfts) {
      if (nfts?.length) {
        if (tokenUris?.length) {
          handleNfts()
        }
      }
      else {
        setIsLoading(false)
      }
    }
  }, [nfts, tokenUris])

  const refetch = () => {
    refetchNfts()
    refetchTokenUris()
  }

  const listRender = () => {
    if (isLoading) {
      return <Skeleton type="card" />
    }

    if (!nftList.length) {
      return <Empty />
    }

    return (
      <div className="grid grid-cols-5 gap-4 max-xl:grid-cols-4">
        { (nftList || []).map(item => (
          <NFTCard key={item.tokenId} {...item} />
        )) }
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-end mb-[var(--main-padding)]">
        <DialogForm onMinted={refetch} />
      </div>
      { listRender() }
    </div>
  )
}
