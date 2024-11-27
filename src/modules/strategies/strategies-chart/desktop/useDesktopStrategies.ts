import { useStrategies } from '@api/maat-finance/useStrategies'
import { COLORS } from '@modules/strategies/components/MultiColoredLineChart'
import { useEffect } from 'react'

import { useMobileCustomStrategiesChartStore } from '../mobile/useMobileStrategiesChartStore'

const TOP_STRATEGIES_SIZE = 3

export const useDesktopStrategies = () => {
  const { data, ...rest } = useStrategies({
    size: TOP_STRATEGIES_SIZE,
    sort: 'apy',
    order_by: 'desc',
  })

  const {
    topStrategiesWithColors,
    setTopStrategiesWithColors,
    customStrategiesWithColors,
    setCustomStrategiesWithColors,
    selectedStrategiesType,
    setSelectedStrategiesType,
    onCustomStrategiesVisibilityChange,
    onStrategySelect,
  } = useMobileCustomStrategiesChartStore()
  const currentStrategies =
    selectedStrategiesType.value === 'Custom'
      ? customStrategiesWithColors
      : topStrategiesWithColors

  useEffect(() => {
    if (data) {
      const topColoredStrategies = COLORS.slice(0, TOP_STRATEGIES_SIZE).map(
        (color, i) => ({
          color,
          strategy: data.items[i],
          visible: true,
        }),
      )
      setTopStrategiesWithColors(topColoredStrategies)
      if (customStrategiesWithColors.length === 0) {
        setCustomStrategiesWithColors(topColoredStrategies)
      }
    }
  }, [
    customStrategiesWithColors.length,
    data,
    setCustomStrategiesWithColors,
    setSelectedStrategiesType,
    setTopStrategiesWithColors,
  ])
  const onReset = () => {
    setTopStrategiesWithColors([])
    setCustomStrategiesWithColors([])
  }

  return {
    topStrategiesWithColors,
    setTopStrategiesWithColors,
    customStrategiesWithColors,
    setCustomStrategiesWithColors,
    selectedStrategiesType,
    setSelectedStrategiesType,
    onCustomStrategiesVisibilityChange,
    onStrategySelect,
    onReset,
    strategies: data?.items,
    currentStrategies,
    ...rest,
  }
}
