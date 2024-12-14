import type { TokenShares } from '@api/contracts/useGetUserShares'
import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import type { ChainType } from '@constants/chains'
import { useMemo } from 'react'

// Common token fields
interface BaseToken {
  balance: string
  balanceUsd: string
}

// Specific token fields for each type
interface DepositToken extends BaseToken {
  contract_name: string
  contract_ticker_symbol: string
  balance_usd: string
  chain_id: number
}

interface WithdrawToken extends BaseToken {
  stable: string
  stableBalance: string
  decimals: number
  chainId: number
}

// Define token type based on input type
type TokenType<T> = T extends ITokenData
  ? DepositToken
  : T extends TokenShares
  ? WithdrawToken
  : never

export type TokensByChain<T> = Record<string, T[]>

const sortTokensByUSDBalance = <T extends ITokenData | TokenShares>(tokens: T[]) => {
  return [...tokens].sort((a, b) => {
    const bValue = 'balance_usd' in b ? b.balance_usd : b.stableBalance
    const aValue = 'balance_usd' in a ? a.balance_usd : a.stableBalance
    return Number(bValue) - Number(aValue)
  })
}

const searchTokens = <T extends ITokenData | TokenShares>(
  tokens: T[],
  searchValue: string,
): T[] => {
  const searchLower = searchValue.toLowerCase()
  return tokens.filter((token) => {
    if ('contract_ticker_symbol' in token) {
      return (
        token.contract_name?.toLowerCase().includes(searchLower) ||
        token.contract_ticker_symbol?.toLowerCase().includes(searchLower)
      )
    }
    if ('stable' in token) {
      return token.stable?.toLowerCase().includes(searchLower)
    }
    return false
  })
}

export const useTokensList = <T extends ITokenData | TokenShares>(
  userTokens: TokensByChain<T> | undefined,
  chain: ChainType | null,
  searchValue: string,
): T[] => {
  return useMemo(() => {
    if (!userTokens) return []

    if (chain) {
      const chainTokens = userTokens[chain] || []
      const filteredChainTokens = searchValue
        ? searchTokens(chainTokens, searchValue)
        : chainTokens
      return sortTokensByUSDBalance(filteredChainTokens)
    }

    const allTokens = Object.values(userTokens).flat()
    const filteredAllTokens = searchValue
      ? searchTokens(allTokens, searchValue)
      : allTokens
    return sortTokensByUSDBalance(filteredAllTokens)
  }, [userTokens, chain, searchValue])
}
