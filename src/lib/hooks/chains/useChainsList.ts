import type { ChainType } from '@constants/chains'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { useCallback } from 'react'

export type ChainsByChain = Record<string, ChainType[]>

/**
 * Hook for filtering chains by search value
 */
export const useChainsList = () => {
  return useCallback(
    (items: ChainType[] | ChainsByChain, searchValue: string): ChainType[] => {
      const searchLower = searchValue.toLowerCase()

      const filterChains = (chains: ChainType[]) =>
        chains.filter((chain) => {
          const chainName = CHAIN_NAMES_BY_ID[chain as keyof typeof CHAIN_NAMES_BY_ID]
          return chainName?.toLowerCase().includes(searchLower)
        })

      if (Array.isArray(items)) {
        return filterChains(items)
      }

      if (typeof items === 'object') {
        return filterChains(Object.values(items).flat())
      }

      return []
    },
    [],
  )
}
