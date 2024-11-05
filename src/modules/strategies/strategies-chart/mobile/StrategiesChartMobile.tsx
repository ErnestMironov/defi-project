/* eslint-disable sonarjs/no-small-switch */
import { useStrategiesMetrics } from '@api/maat-finance/useStrategiesMetrics'
import ArrowDown from '@assets/icons/arrow-down.svg'
import Close from '@assets/icons/close.svg'
import Filter from '@assets/icons/filter.svg'
import Custom from '@assets/icons/setting.svg'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import type { OptionType } from '@components/select/Select'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@components/ui/drawer'
import { Skeleton } from '@components/ui/skeleton'
import { MultiColoredLineChart } from '@modules/strategies/components/MultiColoredLineChart'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { useMemo, useState } from 'react'

import type { StrategiesMetricsChartData } from '../desktop/StrategiesCharts'
import { useDesktopStrategies } from '../desktop/useDesktopStrategies'
import { SelectStrategiesMobilePopover } from './SelectStrategiesMobilePopover'
import { CustomStrategyMobileDrawerItem } from './strategy-mobile-drawer/CustomStrategyMobileDrawerItem'
import { StrategyMobileDrawerItem } from './strategy-mobile-drawer/StrategyMobileDrawerItem'
import { useMobileCustomStrategiesChartStore } from './useMobileStrategiesChartStore'

export const SELECT_STRATEGIES: OptionType[] = [
  { label: 'Top 5 strategies', value: 'Top 5 strategies' },
  {
    label: 'Custom',
    value: 'Custom',
    Icon: Custom,
    callback: () => {},
  },
]
export type RechartDataType = {
  name: string
  timestamp: number
  values: (number | null)[]
}

interface StrategiesChartMobileProperties extends ComponentProps<'div'> {}

export const StrategiesChartMobile = (props: StrategiesChartMobileProperties) => {
  const { className, ...rest } = props
  const [activeTab, _setActiveTab] = useState<'apy' | 'tvl'>('apy')
  const { currentFrame, frames, onFrameChange, currentTimestamp } = useFrameSelect('1W')
  const {
    topStrategiesWithColors,
    customStrategiesWithColors,
    selectedStrategiesType,
    setSelectedStrategiesType,
    onCustomStrategiesVisibilityChange,
    onStrategySelect,
  } = useMobileCustomStrategiesChartStore()

  const { onReset, isLoading, error } = useDesktopStrategies()
  const currentStrategies =
    selectedStrategiesType.value === 'Custom'
      ? customStrategiesWithColors
      : topStrategiesWithColors

  const {
    data: strategiesMetrics,
    isLoading: isMetricsLoading,
    isFetching: isMetricsFetching,
    error: metricsError,
  } = useStrategiesMetrics({
    strategy_id: currentStrategies.map(({ strategy }) => strategy.id),
    from_timestamp: currentTimestamp.toString(),
  })
  const formattedStrategiesMetrics: StrategiesMetricsChartData[] = useMemo(() => {
    return Object.entries(strategiesMetrics ?? {}).map(([timestamp, strategies]) => {
      const formattedTimestamp = Number(timestamp) * (timestamp.length === 10 ? 1000 : 1)
      const formattedValues = currentStrategies.map(({ strategy, visible }) => {
        if (!visible) return null
        const strategyData = strategies[strategy.id]
        return {
          ...strategyData,
          apy: strategyData?.apy === 0 ? null : strategyData?.apy,
          tvl: strategyData?.tvl === 0 ? null : strategyData?.tvl,
        }
      })
      return {
        name: 'APY',
        timestamp: formattedTimestamp,
        values: formattedValues,
      }
    })
  }, [currentStrategies, strategiesMetrics])

  // ---------------------------------

  const renderApyBody = () => {
    switch (true) {
      case isLoading:
      case isMetricsLoading:
      case !!error:
      case !!metricsError: {
        return <Skeleton className="size-full rounded-3xl" />
      }
      default: {
        return (
          <MultiColoredLineChart
            isFetching={isMetricsFetching}
            data={formattedStrategiesMetrics}
            yAxisType="percent"
            dataKey="apy"
          />
        )
      }
    }
  }

  const renderTvlBody = () => {
    switch (true) {
      case isLoading:
      case !!error:
      case isMetricsLoading:
      case !!metricsError: {
        return <Skeleton className="size-full rounded-3xl" />
      }
      default: {
        return (
          <MultiColoredLineChart
            isFetching={isMetricsFetching}
            data={formattedStrategiesMetrics}
            yAxisType="usd"
            dataKey="tvl"
          />
        )
      }
    }
  }

  const renderSelectStrategies = () => {
    switch (true) {
      case isLoading:
      case isMetricsLoading:
      case !!metricsError: {
        return <Skeleton className="h-80 w-full rounded-3xl" />
      }
      case selectedStrategiesType.label === 'Custom': {
        return (
          <>
            {customStrategiesWithColors.map((strategyWithColor, i) => (
              <CustomStrategyMobileDrawerItem
                {...strategyWithColor}
                key={i}
                onVisibilityChange={() =>
                  onCustomStrategiesVisibilityChange(strategyWithColor)
                }
                onStrategySelect={(newStrategy) =>
                  onStrategySelect(newStrategy, strategyWithColor)
                }
                strategiesWithColors={customStrategiesWithColors}
                index={i + 1}
              />
            ))}
          </>
        )
      }
      case selectedStrategiesType.label === 'Top 5 strategies': {
        return (
          <>
            {topStrategiesWithColors.map((strategy, i) => (
              <StrategyMobileDrawerItem {...strategy} key={i} />
            ))}
          </>
        )
      }
      default: {
        return null
      }
    }
  }

  return (
    <section className={cn('mt-[2.5rem]', className, '')} {...rest}>
      {/* <AnimatedTabs
        className="mt-4"
        classNames={{
          tab: 'w-[6.25rem] text-base py-[0.72rem]',
          container: 'p-1',
        }}
        activeTab={activeTab}
        tabs={[
          { id: 'apy', label: 'APY' },
          { id: 'tvl', label: 'TVL' },
        ]}
        layoutId="tokens"
        onTabChange={(tab) => setActiveTab(tab as 'apy' | 'tvl')}
      /> */}
      <div className="mt-6 flex items-center">
        <h3 className="text-2xl font-medium">APY</h3>
        <FramesSelect
          className="ml-auto h-10 rounded-lg"
          frame={currentFrame}
          frames={frames}
          onFrameChange={onFrameChange}
        />
      </div>
      <div className="mt-6 h-[10.125rem]">
        {activeTab === 'apy' && renderApyBody()}
        {activeTab === 'tvl' && renderTvlBody()}
      </div>
      {/* select strategies */}
      <Drawer>
        <DrawerTrigger
          disabled={isLoading || !!error}
          className="mt-6 flex w-full items-center rounded-lg bg-cards p-4"
        >
          <Filter className="size-6" />
          <span className="ml-2">{selectedStrategiesType.value}</span>
          <ArrowDown className="ml-auto size-4" />
        </DrawerTrigger>
        <DrawerContent
          aria-describedby={undefined}
          className="px-4 pb-8"
          withDraggable={false}
        >
          <DrawerTitle className="sr-only">Select strategies</DrawerTitle>
          <div className="flex items-center justify-between gap-6">
            <SelectStrategiesMobilePopover
              options={SELECT_STRATEGIES}
              value={selectedStrategiesType}
              onChange={(value) => setSelectedStrategiesType(value)}
            />
            {selectedStrategiesType.label === 'Custom' && (
              <Close className="size-6" onClick={onReset} />
            )}
          </div>
          <div className="mt-4 space-y-2">{renderSelectStrategies()}</div>
        </DrawerContent>
      </Drawer>
    </section>
  )
}
