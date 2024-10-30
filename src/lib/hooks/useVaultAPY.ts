import { useStrategies } from '@api/maat-finance/useStrategies'
import { formatAmount } from '@utils/formatValue'
import { useMemo } from 'react'

interface UseVaultAPYReturn {
  bestUSDCAPy: number
  bestUSDTAPy: number
  isLoading: boolean
}

export const useVaultAPY = (): UseVaultAPYReturn => {
  const { isLoading, data: strategies } = useStrategies({
    size: 100,
  })

  const bestUSDCAPy = useMemo(() => {
    const USDCStrategies = strategies?.items.filter(
      (strategy) => strategy.token.symbol.toUpperCase() === 'USDC',
    )
    return Math.max(
      ...(USDCStrategies?.map(
        (strategy) =>
          +formatAmount(strategy.apy, {
            maximumFractionDigits: 2,
          }),
      ) ?? [0]),
    )
  }, [strategies?.items])

  const bestUSDTAPy = useMemo(() => {
    const USDTStrategies = strategies?.items.filter(
      (strategy) => strategy.token.symbol.toUpperCase() === 'USDT',
    )
    return Math.max(
      ...(USDTStrategies?.map(
        (strategy) =>
          +formatAmount(strategy.apy, {
            maximumFractionDigits: 2,
          }),
      ) ?? [0]),
    )
  }, [strategies?.items])

  return {
    bestUSDCAPy,
    bestUSDTAPy,
    isLoading,
  }
}
