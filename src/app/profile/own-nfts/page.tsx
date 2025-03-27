'use client'

import { useAccount } from 'wagmi'
import NFTCard from '@/components/NFTCard'
import Skeleton from '@/components/Skeleton'
import Empty from '@/components/Empty'
import { useNFTList } from '@/hooks/useNFTList'

export default function OwnNFTsPage() {
  const { address } = useAccount()
  const { isLoading, nftList } = useNFTList({
    functionName: 'getNFTsByOwner',
    args: [address!],
  })

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

  return listRender()
}
