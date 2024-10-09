import { useStrategies } from '@api/queries/useStrategies'
import { formatAmount } from '@utils/formatValue'
import { useMemo } from 'react'

export const useBestApy = () => {
  const { data: strategies, ...rest } = useStrategies({
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
      ) ?? []),
    )
  }, [strategies?.items])

  const bestUSDTAPy = useMemo(() => {
    const USDCStrategies = strategies?.items.filter(
      (strategy) => strategy.token.symbol.toUpperCase() === 'USDT',
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

  const bestOverallAPY = useMemo(() => {
    return Math.max(bestUSDCAPy, bestUSDTAPy)
  }, [bestUSDCAPy, bestUSDTAPy])

  return {
    bestUSDCAPy,
    bestUSDTAPy,
    bestOverallAPY,
    ...rest,
  }
}
