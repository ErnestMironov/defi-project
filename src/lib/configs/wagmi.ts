import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import type { Chain } from 'viem'
import { defineChain } from 'viem'

export const XFI_CHAIN_ID = 4157

const XFI_TESTNET = defineChain({
  id: XFI_CHAIN_ID,
  name: 'CrossFi Testnet',
  nativeCurrency: { name: 'XFI', symbol: 'XFI', decimals: 18 },
  rpcUrls: {
    default: {
      // http: ['https://crossfi-testnet.blastapi.io/33bd6bb7-36c7-464b-9a19-502d6691e774'],
      http: ['https://rpc.testnet.ms'],
    },
  },
  blockExplorers: {
    default: { name: 'CrossFi Testnet Explorer', url: 'https://scan.testnet.ms' },
  },
})

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '50045bde677b3817fbdad11aaa86c090'

// 2. Create wagmiConfig
const metadata = {
  name: 'PhoLend',
  description: 'PhoLend',
  url: 'https://pholend.com/', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const chains = [XFI_TESTNET] as const

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

createWeb3Modal({
  themeMode: 'light',
  wagmiConfig,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
})

export const isAllowedChain = (chain?: Chain) => chain?.id === XFI_CHAIN_ID
