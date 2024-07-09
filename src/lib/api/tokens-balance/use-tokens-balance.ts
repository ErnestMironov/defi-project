import { Chains } from '@covalenthq/client-sdk'
import { useQuery } from '@tanstack/react-query'

import type { ITokenData } from './api'
import { getTokenBalances } from './api'

// mainnet, optimism, arbitrum, polygon, base, mantle, bsc

const DEFAULT_CHAINS = [
  Chains.ETH_MAINNET,
  Chains.ARBITRUM_MAINNET,
  Chains.OPTIMISM_MAINNET,
  Chains.MATIC_MAINNET,
  Chains.BSC_MAINNET,
  Chains.MANTLE_MAINNET,
  // Chains.BASE_MAINNET,
]

interface UsePortfolioProperties {
  address?: string
  chains?: Chains[]
}

type ChainPortfolio = Record<Chains, ITokenData[]>

export const useTokensBalance = ({
  address,
  chains: _chains,
}: UsePortfolioProperties) => {
  const chains = _chains || DEFAULT_CHAINS
  return useQuery<ChainPortfolio>({
    queryKey: ['portfolio', address, chains],
    queryFn: async () => {
      const portfolio: Partial<ChainPortfolio> = {}
      await Promise.all(
        chains.map(async (chainId) => {
          const tokens = await getTokenBalances(chainId, address)
          portfolio[chainId] = tokens
        }),
      )
      return portfolio as ChainPortfolio
    },
  })
}
