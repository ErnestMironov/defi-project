import { useMemo } from 'react'
import type { ChainType } from '@constants/chains'
import type { NormalizedToken, TokensByChain } from './types'

const sortTokensByUSDBalance = (tokens: NormalizedToken[]) => {
  return tokens.sort((a, b) => Number(b.balanceUsd) - Number(a.balanceUsd))
}

const searchTokens = (tokens: NormalizedToken[], searchValue: string) => {
  return tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchValue.toLowerCase()),
  )
}

export const useTokensList = (
  tokens: TokensByChain | undefined,
  chain: ChainType | null,
  searchValue: string,
): NormalizedToken[] => {
  return useMemo(() => {
    if (!tokens) return []

    if (chain) {
      const chainTokens = tokens[chain] || []
      const filteredChainTokens = searchValue
        ? searchTokens(chainTokens, searchValue)
        : chainTokens
      return sortTokensByUSDBalance(filteredChainTokens)
    }

    const allTokens = Object.values(tokens).flat()
    const filteredAllTokens = searchValue
      ? searchTokens(allTokens, searchValue)
      : allTokens
    return sortTokensByUSDBalance(filteredAllTokens)
  }, [tokens, chain, searchValue])
} 