import { useStrategies } from '@api/maat-finance/useStrategies'
import { formatAmount } from '@utils/formatValue'
import { useMemo } from 'react'

interface UseVaultAPYReturn {
  bestUSDCApy: number
  bestUSDTApy: number
  isLoading: boolean
}

export const useVaultAPY = (): UseVaultAPYReturn => {
  const { isLoading, data: strategies } = useStrategies({
    size: 100,
  })

  const bestUSDCApy = useMemo(() => {
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

  const bestUSDTApy = useMemo(() => {
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
    bestUSDCApy,
    bestUSDTApy,
    isLoading,
  }
}
