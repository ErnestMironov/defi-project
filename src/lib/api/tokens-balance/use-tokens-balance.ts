import { CHAIN_IDS_BY_NAME } from '@constants/chains'
import { Chains } from '@covalenthq/client-sdk'
import { useQuery } from '@tanstack/react-query'
import type { Address } from 'viem'

import type { ITokenData } from './api'
import { getTokenBalances } from './api'

const DEFAULT_CHAINS = [
  Chains.ARBITRUM_MAINNET,
  Chains.OPTIMISM_MAINNET,
  Chains.MATIC_MAINNET,
  Chains.BASE_MAINNET,
  Chains.ETH_MAINNET,
  Chains.MANTLE_MAINNET,
  Chains.BSC_MAINNET,
  Chains.METIS_MAINNET,
  Chains.AVALANCHE_MAINNET,
]

export const COVALENT_CHAINS_MAPPER = {
  [Chains.ARBITRUM_MAINNET]: CHAIN_IDS_BY_NAME.Arbitrum,
  [Chains.OPTIMISM_MAINNET]: CHAIN_IDS_BY_NAME.Optimism,
  [Chains.MATIC_MAINNET]: CHAIN_IDS_BY_NAME.Polygon,
  [Chains.BASE_MAINNET]: CHAIN_IDS_BY_NAME.Base,
  [Chains.ETH_MAINNET]: CHAIN_IDS_BY_NAME.Ethereum,
  [Chains.MANTLE_MAINNET]: CHAIN_IDS_BY_NAME.Mantle,
  [Chains.BSC_MAINNET]: CHAIN_IDS_BY_NAME.BNB,
  [Chains.METIS_MAINNET]: CHAIN_IDS_BY_NAME.Metis,
  [Chains.AVALANCHE_MAINNET]: CHAIN_IDS_BY_NAME.Avalanche,
} as const

interface UsePortfolioProperties {
  address?: string
  chains?: Chains[]
}

type MappedTokenData = Omit<ITokenData, 'chain_id'> & {
  chain_id: (typeof COVALENT_CHAINS_MAPPER)[keyof typeof COVALENT_CHAINS_MAPPER]
}

type ChainPortfolio = Record<
  (typeof COVALENT_CHAINS_MAPPER)[keyof typeof COVALENT_CHAINS_MAPPER],
  MappedTokenData[]
>

export const useTokensBalance = ({
  address,
  chains: _chains,
}: UsePortfolioProperties) => {
  const chains = _chains || DEFAULT_CHAINS
  return useQuery<Partial<ChainPortfolio>>({
    queryKey: ['portfolio', address, chains],
    queryFn: async () => {
      const portfolio: Partial<ChainPortfolio> = {}
      await Promise.allSettled(
        chains.map(async (chainId: (typeof DEFAULT_CHAINS)[number]) => {
          try {
            const tokens = await getTokenBalances(chainId, address as Address)
            const mappedTokens = tokens.map((token) => ({
              ...token,
              chain_id:
                COVALENT_CHAINS_MAPPER[chainId as keyof typeof COVALENT_CHAINS_MAPPER],
            }))

            portfolio[
              COVALENT_CHAINS_MAPPER[chainId as keyof typeof COVALENT_CHAINS_MAPPER]
            ] = mappedTokens
          } catch (error) {
            // Log the error, but don't throw it
            console.error(`Error fetching tokens for chain ${chainId}:`, error)
          }
        }),
      )
      return portfolio
    },
  })
}
