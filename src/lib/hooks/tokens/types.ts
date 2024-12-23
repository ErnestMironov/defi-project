// Types for token normalization
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
