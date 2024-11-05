import type { StrategyData } from '@api/maat-finance/useStrategiesMetrics'
import type { OptionType } from '@components/select/Select'
import { ScrollArea } from '@components/ui/scroll-area'
import { Skeleton } from '@components/ui/skeleton'
import { SelectStrategiesPopover } from '@modules/strategies/components/SelectStrategiesPopover'
import { StrategyRow } from '@modules/strategies/components/StrategyRow'

import { StrategiesApyChart } from './StrategiesApyChart'
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
    isLoading,
    error,
    selectedStrategiesType,
    setSelectedStrategiesType,
    topStrategiesWithColors,
    customStrategiesWithColors,
  } = useDesktopStrategies()

  const {
    // shouldMoveSelect,
    // chartDistance,
    containerReference,
    firstChartReference,
    // secondChartReference,
    selectReference,
  } = useSelectorMove()

  const renderDrawerContent = () => {
    if (isLoading || !!error)
      return <Skeleton className="mt-8 h-[22rem] w-full rounded-xl px-4" />
    return (
      <ScrollArea className="-mx-4 mt-8 px-4">
        <div className="min-h-fit space-y-3">
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
    )
  }
  return (
    <div className="flex justify-between gap-5">
      <div ref={containerReference} className="flex flex-1 flex-col gap-[6.25rem]">
        <div ref={firstChartReference}>
          <StrategiesApyChart />
        </div>
        {/* <div ref={secondChartReference}>
          <StrategiesTvlChart />
        </div> */}
      </div>
      <div
        ref={selectReference}
        // style={{
        //   transform: shouldMoveSelect
        //     ? `translateY(${chartDistance}px)`
        //     : 'translateY(0)',
        // }}
        className="h-fit w-[27.0625rem] rounded-3xl bg-cards px-5 py-6 transition-all duration-300"
      >
        <SelectStrategiesPopover
          disabled={isLoading || !!error}
          options={SELECT_STRATEGIES}
          value={selectedStrategiesType}
          onChange={(option) => setSelectedStrategiesType(option)}
        />
        {renderDrawerContent()}
      </div>
    </div>
  )
}
