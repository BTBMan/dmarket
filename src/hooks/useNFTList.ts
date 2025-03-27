import { useEffect, useState } from 'react'
import { useReadContract, useReadContracts } from 'wagmi'
import { NFTMarketplace } from '@/contract-data/NFTMarketplace'

export interface NFtItem {
  tokenId: bigint
  price: bigint
  seller: `0x${string}`
  owner: `0x${string}`
  sold: boolean
  metadata: NFTMetadata
}

type FunctionName = 'getSellingListBySeller' | 'getNFTsByOwner' | 'getAllSellingList'

interface Options {
  functionName: FunctionName
  args?: readonly [`0x${string}`] | readonly []
}

export function useNFTList({
  functionName,
  args = [],
}: Options) {
  const [isLoading, setIsLoading] = useState(true)
  const [nftList, setNftList] = useState<NFtItem[]>([])

  const { data: nfts, refetch: refetchNfts } = useReadContract({
    ...NFTMarketplace,
    functionName,
    args,
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

  return {
    isLoading,
    nftList,
    refetch,
  }
}
