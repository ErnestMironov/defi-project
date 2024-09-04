import type { Strategy } from '@api/maat-finance/types'
import type { OptionType } from '@components/select/Select'
import { create } from 'zustand'

export type StrategyWithColor = {
  color: string
  visible: boolean
  strategy: Strategy
}

const STRATEGIES_TYPES: OptionType[] = ['Top 5 strategies', 'Custom'].map((type) => ({
  label: type,
  value: type,
}))

interface MobileCustomStrategiesChartStoreState {
  topStrategiesWithColors: StrategyWithColor[]
  setTopStrategiesWithColors: (by: StrategyWithColor[]) => void
  customStrategiesWithColors: StrategyWithColor[]
  setCustomStrategiesWithColors: (by: StrategyWithColor[]) => void
  strategiesTypes: OptionType[]
  selectedStrategiesType: OptionType
  setSelectedStrategiesType: (by: OptionType) => void
  onCustomStrategiesVisibilityChange: (strategy: StrategyWithColor) => void
  onTopStrategiesVisibilityChange: (strategy: StrategyWithColor) => void
  onStrategySelect: (newStrategy: Strategy, replaceStrategy: StrategyWithColor) => void
}

const onVisibilityChange = (
  strategy: StrategyWithColor,
  strategiesWithColors: StrategyWithColor[],
) => {
  return strategiesWithColors.map((item) => {
    if (item.strategy.id === strategy.strategy.id) {
      return { ...item, visible: !item.visible }
    }
    return item
  })
}

const onStrategySelect = (
  newStrategy: Strategy,
  replaceStrategy: StrategyWithColor,
  strategiesWithColors: StrategyWithColor[],
): StrategyWithColor[] => {
  return strategiesWithColors.map((item) => {
    if (item.strategy.id === replaceStrategy.strategy.id) {
      return { ...item, strategy: newStrategy }
    }
    return item
  })
}

export const useMobileCustomStrategiesChartStore =
  create<MobileCustomStrategiesChartStoreState>()((set, get) => ({
    topStrategiesWithColors: [],
    setTopStrategiesWithColors: (topStrategiesWithColors) =>
      set({ topStrategiesWithColors }),
    customStrategiesWithColors: [],
    setCustomStrategiesWithColors: (customStrategiesWithColors) =>
      set({ customStrategiesWithColors }),
    strategiesTypes: STRATEGIES_TYPES,
    selectedStrategiesType: STRATEGIES_TYPES[0],
    setSelectedStrategiesType: (selectedStrategiesType) =>
      set({ selectedStrategiesType }),
    onCustomStrategiesVisibilityChange: (strategy) => {
      const newStrategiesWithColors = onVisibilityChange(
        strategy,
        get().customStrategiesWithColors,
      )
      set({ customStrategiesWithColors: newStrategiesWithColors })
    },
    onTopStrategiesVisibilityChange: (strategy) => {
      const newStrategiesWithColors = onVisibilityChange(
        strategy,
        get().topStrategiesWithColors,
      )
      set({ topStrategiesWithColors: newStrategiesWithColors })
    },
    onStrategySelect: (newStrategy, replaceStrategy) => {
      const newStrategiesWithColors = onStrategySelect(
        newStrategy,
        replaceStrategy,
        get().customStrategiesWithColors,
      )
      set({ customStrategiesWithColors: newStrategiesWithColors })
    },
  }))
