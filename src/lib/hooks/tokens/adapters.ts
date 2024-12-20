import type { TokenShares } from '@api/contracts/useGetUserShares'
import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import { formatUnits } from 'viem'

import type { NormalizedToken, TokensAdapter, TokensByChain } from './types'

export const depositTokensAdapter: TokensAdapter<ITokenData> = {
  normalize: (token: ITokenData): NormalizedToken => ({
    id: `${token?.contract_address || ''}-${token?.chain_id || '0'}`,
    name: token?.contract_name || '',
    symbol: token?.contract_ticker_symbol || '',
    balance: token?.balance || '0',
    balanceUsd: token?.balance_usd || '0',
    chainId: token?.chain_id || 0,
    decimals: token?.contract_decimals || 0,
  }),

  normalizeByChain: (data: Record<string, ITokenData[]>): TokensByChain => {
    if (!data || typeof data !== 'object') return {}

    const result: TokensByChain = {}

    Object.entries(data).forEach(([chain, tokens]) => {
      if (Array.isArray(tokens)) {
        result[chain] = tokens.map(depositTokensAdapter.normalize)
      }
    })

    return result
  },
}

export const withdrawTokensAdapter: TokensAdapter<TokenShares> = {
  normalize: (token: TokenShares): NormalizedToken => {
    let balanceUsd = '0'
    try {
      if (token?.stableBalance && token?.decimals) {
        balanceUsd = formatUnits(BigInt(token.stableBalance), token.decimals)
      }
    } catch {
      balanceUsd = '0'
    }

    return {
      id: `${token?.stable || ''}-${token?.chainId || '0'}`,
      name: token?.stable || '',
      symbol: token?.stable || '',
      balance: token?.stableBalance?.toString() || '0',
      balanceUsd,
      chainId: token?.chainId || 0,
      decimals: token?.decimals || 0,
    }
  },

  normalizeByChain: (data: Record<string, TokenShares[]>): TokensByChain => {
    if (!data || typeof data !== 'object') return {}

    const result: TokensByChain = {}

    Object.entries(data).forEach(([chain, tokens]) => {
      if (Array.isArray(tokens)) {
        result[chain] = tokens.map(withdrawTokensAdapter.normalize)
      }
    })

    return result
  },
}
