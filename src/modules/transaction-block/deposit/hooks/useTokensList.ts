import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import type { ChainType } from '@constants/chains'
import { useMemo } from 'react'

const sortTokensByUSDBalance = (tokens: ITokenData[]) => {
  return tokens.sort((a, b) => Number(b.balance_usd) - Number(a.balance_usd))
}

const searchTokens = (tokens: ITokenData[], searchValue: string) => {
  return tokens.filter(
    (token) =>
      token.contract_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      token.contract_ticker_symbol?.toLowerCase().includes(searchValue.toLowerCase()),
  )
}

type TokensByChain = Record<string, ITokenData[]>

export const useTokensList = (
  userTokens: TokensByChain | undefined,
  chain: ChainType | null,
  searchValue: string,
): ITokenData[] => {
  return useMemo(() => {
    if (!userTokens) return []

    if (chain) {
      const chainTokens = userTokens[chain] || []
      const filteredChainTokens = searchValue
        ? searchTokens(chainTokens, searchValue)
        : chainTokens
      return sortTokensByUSDBalance(filteredChainTokens)
    }

    const allTokens = Object.values(userTokens).flat() as ITokenData[]
    const filteredAllTokens = searchValue
      ? searchTokens(allTokens, searchValue)
      : allTokens
    return sortTokensByUSDBalance(filteredAllTokens)
  }, [userTokens, chain, searchValue])
}
