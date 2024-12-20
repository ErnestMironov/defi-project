import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import type { TokenShares } from '@api/contracts/useGetUserShares'
import type { ChainType } from '@constants/chains'

export interface NormalizedToken {
  id: string
  name: string
  symbol: string
  balance: string
  balanceUsd: string
  chainId: number
  decimals: number
}

export type TokensByChain = Record<string, NormalizedToken[]>

export interface TokensAdapter<T> {
  normalize: (data: T) => NormalizedToken
  normalizeByChain: (data: Record<string, T[]>) => TokensByChain
} 