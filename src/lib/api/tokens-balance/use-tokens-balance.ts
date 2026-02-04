import { CHAIN_IDS_BY_NAME } from '@constants/chains'
import type { Chains } from '@covalenthq/client-sdk'
import { USE_MOCKS } from '@configs/mocks'
import { getTokenBalances, getTokens } from '@lifi/sdk'
import { useQuery } from '@tanstack/react-query'
import BigNumber from 'bignumber.js'
import { formatUnits, zeroAddress } from 'viem'

const chains = [
  CHAIN_IDS_BY_NAME.Arbitrum,
  CHAIN_IDS_BY_NAME.Optimism,
  CHAIN_IDS_BY_NAME.Polygon,
  CHAIN_IDS_BY_NAME.Bsc,
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
      if (USE_MOCKS) {
        return {
          [CHAIN_IDS_BY_NAME.Arbitrum]: [
            {
              chain_id: CHAIN_IDS_BY_NAME.Arbitrum,
              contract_address: '0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
              contract_name: 'USD Coin',
              balance: '1250000000',
              balance_usd: '1250.00',
              rate: '1',
              contract_decimals: 6,
              contract_ticker_symbol: 'USDC',
              is_native: false,
              logo_url: '',
            },
            {
              chain_id: CHAIN_IDS_BY_NAME.Arbitrum,
              contract_address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
              contract_name: 'Tether USD',
              balance: '980000000',
              balance_usd: '980.00',
              rate: '1',
              contract_decimals: 6,
              contract_ticker_symbol: 'USDT',
              is_native: false,
              logo_url: '',
            },
            {
              chain_id: CHAIN_IDS_BY_NAME.Arbitrum,
              contract_address: '0xC02aaA39b223FE8D0A0E5C4F27eAD9083C756Cc2',
              contract_name: 'Wrapped Ether',
              balance: '420000000000000000',
              balance_usd: '1197.00',
              rate: '2850',
              contract_decimals: 18,
              contract_ticker_symbol: 'WETH',
              is_native: false,
              logo_url: '',
            },
          ],
          [CHAIN_IDS_BY_NAME.Base]: [
            {
              chain_id: CHAIN_IDS_BY_NAME.Base,
              contract_address: '0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
              contract_name: 'USD Coin',
              balance: '540000000',
              balance_usd: '540.00',
              rate: '1',
              contract_decimals: 6,
              contract_ticker_symbol: 'USDC',
              is_native: false,
              logo_url: '',
            },
          ],
          [CHAIN_IDS_BY_NAME.Polygon]: [
            {
              chain_id: CHAIN_IDS_BY_NAME.Polygon,
              contract_address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
              contract_name: 'Wrapped Matic',
              balance: '220000000000000000000',
              balance_usd: '180.40',
              rate: '0.82',
              contract_decimals: 18,
              contract_ticker_symbol: 'WMATIC',
              is_native: false,
              logo_url: '',
            },
            {
              chain_id: CHAIN_IDS_BY_NAME.Polygon,
              contract_address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
              contract_name: 'USD Coin',
              balance: '300000000',
              balance_usd: '300.00',
              rate: '1',
              contract_decimals: 6,
              contract_ticker_symbol: 'USDC',
              is_native: false,
              logo_url: '',
            },
          ],
        }
      }

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
      return portfolio
    },
  })
}
