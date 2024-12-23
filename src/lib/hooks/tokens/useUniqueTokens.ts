import type { TokenShares } from '@api/contracts/useGetUserShares'
import { useMemo } from 'react'

import type { WithdrawToken } from './useTokensList'

/**
 * Hook to process unique tokens from shares array
 * Filters tokens by minimum balance and groups them by chain
 */
export const useUniqueTokens = (shares: TokenShares[] | undefined) => {
  return useMemo(() => {
    if (!shares) return {}

    const uniqueTokens = shares
      .filter((token) => token.balance > 999_999)
      .reduce((map, token) => {
        const key = `${token.chainId}-${token.address}`
        const existing = map.get(key)

        if (!existing || token.balance > existing.balance) {
          map.set(key, token)
        }

        return map
      }, new Map<string, TokenShares>())

    return Array.from(uniqueTokens.values()).reduce(
      (accumulator, token) => {
        const chainId = token.chainId.toString()
        if (!accumulator[chainId]) {
          accumulator[chainId] = []
        }
        // Instead of transforming here, we'll just pass the TokenShares
        // The transformation will happen in the WithdrawAssetItem component
        accumulator[chainId].push(token as unknown as WithdrawToken)
        return accumulator
      },
      {} as Record<string, WithdrawToken[]>,
    )
  }, [shares])
}
