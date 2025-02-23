import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets'
import { hardhat, mainnet, sepolia } from 'viem/chains'
import { http } from 'wagmi'

export const wagmiConfig = getDefaultConfig({
  appName: 'Decentralized Marketplace',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
      ],
    },
  ],
  ssr: true,
  chains: [
    mainnet,
    sepolia,
    hardhat,
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [hardhat.id]: http(),
  },
})
