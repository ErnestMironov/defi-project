import type { AppKitNetwork } from '@reown/appkit/networks'
import {
  arbitrum,
  base,
  bsc,
  mainnet,
  mantle,
  optimism,
  polygon,
} from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '50045bde677b3817fbdad11aaa86c090'

// 2. Create wagmiConfig
const metadata = {
  name: 'MAAT',
  description: 'MAAT',
  url: 'https://maat.finance/', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const networks: AppKitNetwork[] = [
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
]

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
})

createAppKit({
  themeMode: 'light',
  adapters: [wagmiAdapter],
  networks: [mainnet, optimism, arbitrum, polygon, base, mantle, bsc],
  metadata,
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    onramp: true, // Optional - false as default
  },
})
