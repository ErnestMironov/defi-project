import type { StrategyData } from '@api/queries/useStrategiesMetrics'
import type { OptionType } from '@components/select/Select'
import { ScrollArea } from '@components/ui/scroll-area'
import { SelectStrategiesPopover } from '@modules/strategies/components/SelectStrategiesPopover'
import { StrategyRow } from '@modules/strategies/components/StrategyRow'

import { StrategiesApyChart } from './StrategiesApyChart'
import { StrategiesTvlChart } from './StrategiesTvlChart'
import { useDesktopStrategies } from './useDesktopStrategies'
import { useSelectorMove } from './useSelectorMove'

export type StrategiesMetricsChartData = {
  name: string
  timestamp: number
  values: (StrategyData | null)[]
}

export const SELECT_STRATEGIES: OptionType[] = [
  { label: 'Top 5 strategies', value: 'Top 5 strategies' },
  {
    label: 'Custom',
    value: 'Custom',
    Icon: () => <></>,
    callback: () => {},
  },
]

export const StrategiesCharts = () => {
  const {
    selectedStrategiesType,
    setSelectedStrategiesType,
    topStrategiesWithColors,
    customStrategiesWithColors,
  } = useDesktopStrategies()

  const {
    shouldMoveSelect,
    chartDistance,
    containerReference,
    firstChartReference,
    secondChartReference,
    selectReference,
  } = useSelectorMove()

  return (
    <div className="flex justify-between gap-5">
      <div ref={containerReference} className="flex flex-1 flex-col gap-[6.25rem]">
        <div ref={firstChartReference}>
          <StrategiesApyChart />
        </div>
        <div ref={secondChartReference}>
          <StrategiesTvlChart />
        </div>
      </div>
      <div
        ref={selectReference}
        style={{
          transform: shouldMoveSelect
            ? `translateY(${chartDistance}px)`
            : 'translateY(0)',
        }}
        className="h-fit w-[27.0625rem] rounded-3xl bg-cards px-5 py-6 transition-all duration-300"
      >
        <SelectStrategiesPopover
          options={SELECT_STRATEGIES}
          value={selectedStrategiesType}
          onChange={(option) => setSelectedStrategiesType(option)}
        />
        <ScrollArea className="-mx-4 mt-8 px-4">
          <div className="max-h-[22.75rem] space-y-3">
            {selectedStrategiesType.value === 'Custom' &&
              customStrategiesWithColors.map(({ strategy, color }, index) => (
                <StrategyRow color={color} strategy={strategy} key={index} />
              ))}
            {selectedStrategiesType.value === 'Top 5 strategies' &&
              topStrategiesWithColors.map(({ strategy, color }, index) => (
                <StrategyRow color={color} strategy={strategy} key={index} />
              ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
