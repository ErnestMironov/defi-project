import type { Token } from '@0xsquid/squid-types'
import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import { useTokensBalance } from '@api/tokens-balance/use-tokens-balance'
import type { OptionType } from '@components/select/Select'
import { CHAIN_IDS_BY_BACKEND_NAMES } from '@constants/chains'
import { useBestApy } from '@hooks/useBestApy'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'

import { useSquidSDKState } from './useSquidSdkState'

/**
 * Sorts tokens by quote in descending order
 * @param tokens - Array of tokens to sort
 */
const sortTokensByQuote = (tokens: ITokenData[]) => {
  return tokens.sort((a, b) => Number(b.balance_usd) - Number(a.balance_usd))
}

export const useAllAssets = (chains: OptionType[]) => {
  const { address } = useAccount()
  const { data: userTokens, isLoading } = useTokensBalance({ address })
  const { squid, loading } = useSquidSDKState()

  const supportedBySquidTokens = squid?.tokens as Token[]
  const supportedTokensAddr = useMemo(() => {
    return supportedBySquidTokens?.map((token) => token.address.toLowerCase())
  }, [supportedBySquidTokens])

  const filteredByChainTokens = (() => {
    if (!userTokens || !supportedTokensAddr || supportedBySquidTokens?.length === 0)
      return []
    if (chains.length > 0) {
      const chainIds = new Set(
        chains.map(
          (chain) =>
            CHAIN_IDS_BY_BACKEND_NAMES[
              chain.value as keyof typeof CHAIN_IDS_BY_BACKEND_NAMES
            ],
        ),
      )
      const _filteredByChainTokens = Object.values(userTokens)
        .flat()
        .filter((token) => chainIds.has(token?.chain_id as never))

      return sortTokensByQuote(_filteredByChainTokens as ITokenData[])
    }

    const allTokens = Object.values(userTokens).flat()
    return sortTokensByQuote(allTokens as ITokenData[])
  })()

  const { bestOverallAPY } = useBestApy()
  const potentialUsdProfit = useMemo(() => {
    const usdSum = filteredByChainTokens.reduce((accumulator, token) => {
      return accumulator.plus(token.balance_usd)
    }, new BigNumber(0))
    return usdSum.times(bestOverallAPY).div(100).toString()
  }, [filteredByChainTokens, bestOverallAPY])

  return {
    tokens: filteredByChainTokens,
    isLoading: isLoading || loading,
    potentialUsdProfit,
  }
}
