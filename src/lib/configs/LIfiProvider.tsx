import { ChainType, config, createConfig, EVM, getChains } from '@lifi/sdk'
import { useSyncWagmiConfig } from '@lifi/wallet-management'
import { useQuery } from '@tanstack/react-query'
import { getWalletClient, switchChain } from '@wagmi/core'
import type { FC } from 'react'

import { wagmiAdapter } from './wagmi'

export const LIfiProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: chains } = useQuery({
    queryKey: ['chains'] as const,
    queryFn: async () => {
      const _chains = await getChains({
        chainTypes: [ChainType.EVM],
      })
      // Update chain configuration for LI.FI SDK
      config.setChains(_chains)
      return _chains
    },
  })

  // Create SDK config using Wagmi actions and configuration
  createConfig({
    integrator: 'Your dApp/company name',
    providers: [
      EVM({
        // @ts-ignore
        getWalletClient: () => getWalletClient(wagmiAdapter.wagmiConfig),
        // @ts-ignore
        switchChain: async (chainId) => {
          const chain = await switchChain(wagmiAdapter.wagmiConfig, { chainId })
          return getWalletClient(wagmiAdapter.wagmiConfig, { chainId: chain.id })
        },
      }),
    ],
    // We disable chain preloading and will update chain configuration in runtime
    preloadChains: false,
  })

  // List of Wagmi connectors
  // Synchronize fetched chains with Wagmi config and update connectors
  useSyncWagmiConfig(
    // @ts-ignore
    wagmiAdapter.wagmiConfig,
    wagmiAdapter.wagmiConfig.connectors,
    chains,
  )

  return children
}
