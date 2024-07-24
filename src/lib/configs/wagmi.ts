import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import type { Chain } from 'viem'
import { arbitrum, base, bsc, mainnet, mantle, optimism, polygon } from 'viem/chains'

export const XFI_CHAIN_ID = 4157
// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '50045bde677b3817fbdad11aaa86c090'

// 2. Create wagmiConfig
const metadata = {
  name: 'MAAT',
  description: 'MAAT',
  url: 'https://maat.finance/', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const chains = [
  mainnet,
  {
    ...optimism,
    rpcUrls: {
      default: {
        http: ['https://optimism-mainnet.infura.io/v3/ec25fc33eb624f13a9012f6174f20d68'],
      },
    },
  },
  arbitrum,
  polygon,
  base,
  mantle,
  bsc,
] as const
console.log('🚀 ~ optimism:', optimism)

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
