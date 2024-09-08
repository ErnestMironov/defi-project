import { useStrategies } from '@api/queries/useStrategies'
import { COLORS } from '@modules/strategies/components/MultiColoredLineChart'
import { useEffect } from 'react'

import { useMobileCustomStrategiesChartStore } from '../mobile/useMobileStrategiesChartStore'

export const useDesktopStrategies = () => {
  const { data, ...rest } = useStrategies({
    size: 5,
    sort: 'apy',
    orderBy: 'desc',
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
      const topColoredStrategies = COLORS.map((color, i) => ({
        color,
        strategy: data.items[i],
        visible: true,
      }))
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
