import { useStrategiesMetrics } from '@api/maat-finance/useStrategiesMetrics'
import ChartIcon from '@assets/icons/chart.svg'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import { Table } from '@components/table'
import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { cn } from '@utils/cn'
import { type ComponentProps, useMemo } from 'react'

import { MultiColoredLineChart } from '../../components/MultiColoredLineChart'
import type { StrategiesMetricsChartData } from './StrategiesCharts'
import { TopStrategyRow, TopStrategyRowSkeleton } from './TopStrategyRow'
import { useDesktopStrategies } from './useDesktopStrategies'

interface StrategiesChartProperties extends ComponentProps<'div'> {}

export const StrategiesApyChart = (props: StrategiesChartProperties) => {
  const { className, ...rest } = props
  const { currentFrame, currentTimestamp, frames, onFrameChange } = useFrameSelect('Week')

  const {
    isLoading: isStrategiesLoading,
    error: strategiesError,
    topStrategiesWithColors,
  } = useDesktopStrategies()

  const {
    data: strategiesMetrics,
    isLoading,
    isFetching,
    error,
  } = useStrategiesMetrics({
    strategy_id: topStrategiesWithColors.map(({ strategy }) => strategy.id),
    from_timestamp: currentTimestamp.toString(),
  })
  const formattedStrategiesMetrics: StrategiesMetricsChartData[] = useMemo(() => {
    return Object.entries(strategiesMetrics ?? {}).map(([timestamp, strategies]) => {
      const formattedTimestamp = Number(timestamp) * (timestamp.length === 10 ? 1000 : 1)
      const formattedValues = topStrategiesWithColors.map(({ strategy, visible }) => {
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
  }, [topStrategiesWithColors, strategiesMetrics])

  // if (isLoading || !!error || !!strategiesError || isStrategiesLoading) {
  //   return null
  // }

  return (
    <div
      className={cn(
        'flex w-full divide-x divide-stroke-100',
        isFetching && 'animate-pulse',
        className,
      )}
      {...rest}
    >
      <div className="py-8">
        <div className="flex items-center justify-between gap-4 border-b border-stroke-100 px-8 pb-[1.31rem]">
          <div className="space-y-1">
            <h2 className="text-lg uppercase">APY</h2>
            <p className="text-sm/[1.25rem] text-text-2100">Annual Percentage Yield</p>
          </div>
          <FramesSelect
            frame={currentFrame}
            frames={frames}
            onFrameChange={onFrameChange}
          />
        </div>
        <MultiColoredLineChart
          isLoading={isLoading || !!error}
          className="mt-6 h-[14.5rem] w-[69.0625rem] px-8"
          data={formattedStrategiesMetrics}
          frame="MAX"
          yAxisType="percent"
          dataKey="apy"
        />
      </div>
      <div className="flex-1 divide-y divide-stroke-100">
        <div className="p-4">
          <BaseContainer className="flex w-fit items-center gap-2 rounded-xl px-4 py-3 text-sm/[1.5rem] font-medium">
            <ChartIcon className="size-4" /> Top 3
          </BaseContainer>
        </div>
        <Table>
          <Table.Head className="[&>tr>th]:py-2 [&>tr>th]:first:pl-5 [&>tr>th]:last:pr-5">
            <Table.Row>
              <Table.HeadCell className="w-[7.5rem]">Token</Table.HeadCell>
              <Table.HeadCell className="w-[9.375rem]">Chain</Table.HeadCell>
              <Table.HeadCell className="w-[9.375rem]">APY</Table.HeadCell>
              <Table.HeadCell>Protocol</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body className="[&_tr:after:last-child]:rounded-br-[1.25rem] [&_tr]:h-[5.5rem]">
            {!!strategiesError || isStrategiesLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <TopStrategyRowSkeleton key={i} />
                ))
              : topStrategiesWithColors.map((strategy, i) => (
                  <TopStrategyRow key={i} strategy={strategy} i={i} />
                ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}
