import { CHAIN_IDS_BY_NAME } from '@constants/chains'
import type { Chains } from '@covalenthq/client-sdk'
import { getTokenBalances, getTokens } from '@lifi/sdk'
import { useQuery } from '@tanstack/react-query'
import BigNumber from 'bignumber.js'
import { formatUnits, zeroAddress } from 'viem'

const chains = [
  CHAIN_IDS_BY_NAME.Arbitrum,
  CHAIN_IDS_BY_NAME.Optimism,
  CHAIN_IDS_BY_NAME.Polygon,
  CHAIN_IDS_BY_NAME.BNB,
  CHAIN_IDS_BY_NAME.Base,
  CHAIN_IDS_BY_NAME.Ethereum,
  CHAIN_IDS_BY_NAME.Avalanche,
]

interface UsePortfolioProperties {
  address?: string
  chains?: Chains[]
}

export interface ITokenData {
  chain_id: number
  contract_address: string
  contract_name: string
  balance: string
  balance_usd: string
  rate: string
  contract_decimals: number
  contract_ticker_symbol: string
  is_native: boolean
  logo_url: string
}

type ChainPortfolio = Record<number, ITokenData[]>

export const useTokensBalance = ({ address }: UsePortfolioProperties) => {
  return useQuery<Partial<ChainPortfolio>>({
    queryKey: ['portfolio', address, chains],
    queryFn: async () => {
      const portfolio: Partial<ChainPortfolio> = {}
      const tokensResponse = await getTokens()

      const processChain = async (chainId: number) => {
        if (!chainId) {
          console.warn(`Unsupported chain: ${chainId}`)
          return
        }

        const chainTokens = tokensResponse.tokens[chainId]
        if (!chainTokens?.length) {
          console.warn(`No tokens found for chain: ${chainId}`)
          return
        }

        const tokenBalances = await getTokenBalances(
          address as string,
          chainTokens,
        ).catch((error) => {
          console.error(`Error fetching token balances for chain ${chainId}:`, error)
          return null
        })

        if (!tokenBalances?.length) {
          console.warn(`No token balances found for chain: ${chainId}`)
          return
        }

        console.log('🚀 ~ processChain ~ tokenBalances:', tokenBalances)

        const mappedTokens = tokenBalances
          .filter((token) => BigInt(token.amount ?? 0) > BigInt(0))
          .map((token) => ({
            contract_address: token.address,
            balance: token.amount?.toString() ?? '0',
            balance_usd: BigNumber(formatUnits(token.amount ?? BigInt(0), token.decimals))
              .multipliedBy(new BigNumber(token.priceUSD))
              .toFixed(2),
            rate: token.priceUSD,
            chain_id: chainId,
            contract_decimals: token.decimals,
            contract_ticker_symbol: token.symbol,
            contract_name: token.name,
            is_native: token.address === zeroAddress,
            logo_url: token.logoURI ?? '',
          }))
          .filter((token) => Number(token.balance_usd) >= 1)

        if (mappedTokens.length > 0) {
          portfolio[chainId] = mappedTokens
        }
      }

      await Promise.allSettled(chains.map(processChain))
      console.log('🚀 ~ queryFn: ~ portfolio:', portfolio)
      return portfolio
    },
  })
}
