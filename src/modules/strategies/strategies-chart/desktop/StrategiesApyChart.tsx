import { useStrategiesMetrics } from '@api/maat-finance/useStrategiesMetrics'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import { type ComponentProps, useMemo } from 'react'

import { MultiColoredLineChart } from '../../components/MultiColoredLineChart'
import type { StrategiesMetricsChartData } from './StrategiesCharts'
import { useDesktopStrategies } from './useDesktopStrategies'

interface StrategiesChartProperties extends ComponentProps<'div'> {}

export const StrategiesApyChart = (props: StrategiesChartProperties) => {
  const { className, ...rest } = props
  const { currentFrame, currentTimestamp, frames, onFrameChange } = useFrameSelect('1W')

  const {
    isLoading: isStrategiesLoading,
    error: strategiesError,
    currentStrategies,
  } = useDesktopStrategies()

  const {
    data: strategiesMetrics,
    isLoading,
    isFetching,
    error,
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

  if (isLoading || !!error || !!strategiesError || isStrategiesLoading) {
    return <StrategiesChartSkeleton title="APY" />
  }

  return (
    <div
      className={cn('flex w-full gap-5', isFetching && 'animate-pulse', className)}
      {...rest}
    >
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h2 className="text-[2rem]/[2.4rem]">APY</h2>
          <FramesSelect
            frame={currentFrame}
            frames={frames}
            onFrameChange={onFrameChange}
          />
        </div>
        <MultiColoredLineChart
          className="mt-6 h-[26.5625rem]"
          data={formattedStrategiesMetrics}
          frame="MAX"
          yAxisType="percent"
          dataKey="apy"
        />
      </div>
    </div>
  )
}

export const StrategiesChartSkeleton = (
  props: ComponentProps<'div'> & { title: string },
) => {
  const { className, title, ...rest } = props

  return (
    <div className={cn('flex w-full gap-5', className)} {...rest}>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h2 className="text-[2rem]/[2.4rem]">{title}</h2>
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="mt-6 h-[26.5625rem]">
          <Skeleton className="size-full" />
        </div>
      </div>
    </div>
  )
}
