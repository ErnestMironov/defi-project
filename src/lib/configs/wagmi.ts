import type { AppKitNetwork } from '@reown/appkit/networks'
import {
  arbitrum,
  avalanche,
  base,
  bsc,
  mainnet,
  mantle,
  metis,
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
  arbitrum,
  {
    ...optimism,
    rpcUrls: {
      default: {
        http: ['https://optimism-mainnet.infura.io/v3/ec25fc33eb624f13a9012f6174f20d68'],
      },
    },
  },
  polygon,
  base,
  mantle,
  metis,
  bsc,
  avalanche,
  mainnet,
]

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
})

createAppKit({
  adapters: [wagmiAdapter],
  defaultNetwork: arbitrum,
  networks: [
    arbitrum,
    {
      ...optimism,
      rpcUrls: {
        default: {
          http: [
            'https://optimism-mainnet.infura.io/v3/ec25fc33eb624f13a9012f6174f20d68',
          ],
        },
      },
    },
    polygon,
    base,
    mantle,
    metis,
    bsc,
    avalanche,
    mainnet,
  ],
  metadata,

  projectId,
  featuredWalletIds: ['c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96'],
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    onramp: true, // Optional - false as default
    socials: false,
    email: false,
  },
})
