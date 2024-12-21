import { useEffect, useRef } from 'react'

interface UseVaultSelectionParameters {
  bestUSDCApy: number | undefined
  bestUSDTApy: number | undefined
  isStrategiesLoading: boolean
  onVaultSelect: (vault: 'USDC' | 'USDT') => void
}

/**
 * Hook to handle vault selection logic based on APY
 */
export const useVaultSelection = ({
  bestUSDCApy,
  bestUSDTApy,
  isStrategiesLoading,
  onVaultSelect,
}: UseVaultSelectionParameters) => {
  const vaultSet = useRef(false)

  useEffect(() => {
    if (!vaultSet.current && !isStrategiesLoading) {
      if (bestUSDCApy !== undefined && bestUSDTApy !== undefined) {
        onVaultSelect(Number(bestUSDCApy) > Number(bestUSDTApy) ? 'USDC' : 'USDT')
      } else {
        onVaultSelect(bestUSDCApy === undefined ? 'USDT' : 'USDC')
      }
      vaultSet.current = true
    }
  }, [bestUSDCApy, bestUSDTApy, isStrategiesLoading, onVaultSelect])
}
