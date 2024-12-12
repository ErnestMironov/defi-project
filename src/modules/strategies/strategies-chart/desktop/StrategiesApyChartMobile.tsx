import { useStrategiesMetrics } from '@api/maat-finance/useStrategiesMetrics'
import ChartIcon from '@assets/icons/chart.svg'
import type { FrameType } from '@components/frames-select/useFrameSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import { Table } from '@components/table'
import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { cn } from '@utils/cn'
import { type ComponentProps, useMemo } from 'react'

import { MultiColoredLineChart } from '../../components/MultiColoredLineChart'
import type { StrategiesMetricsChartData } from './StrategiesCharts'
import { TopStrategyRow, TopStrategyRowSkeleton } from './TopStrategyRow'
import { useDesktopStrategies } from './useDesktopStrategies'

interface StrategiesChartProperties extends ComponentProps<'div'> {
  frame: FrameType
}

export const StrategiesApyChartMobile = (props: StrategiesChartProperties) => {
  const { className, frame, ...rest } = props
  const { currentTimestamp } = useFrameSelect(frame)

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
      className={cn('flex flex-col w-full', isFetching && 'animate-pulse', className)}
      {...rest}
    >
      <MultiColoredLineChart
        isLoading={isLoading || !!error}
        className="h-60 w-full p-4"
        data={formattedStrategiesMetrics}
        frame="MAX"
        yAxisType="percent"
        dataKey="apy"
      />
      <div className="flex-1 divide-y divide-stroke-100">
        <div className="p-3">
          <BaseContainer className="flex w-fit items-center gap-1 rounded-xl p-3 text-[0.75rem]/[1.25rem] font-medium">
            <ChartIcon className="size-4" /> Top 3
          </BaseContainer>
        </div>
        <Table className="max-lg:[&_td:not(:first-child):not(:last-child)]:px-1">
          <Table.Head className="[&>tr>th:not(:first-child):not(:last-child)]:px-2 [&>tr>th]:text-[0.8125rem]/[1.75rem] [&>tr>th]:first:pl-4 [&>tr>th]:last:pr-4">
            <Table.Row>
              <Table.HeadCell>Token</Table.HeadCell>
              <Table.HeadCell>Chain</Table.HeadCell>
              <Table.HeadCell>APY</Table.HeadCell>
              <Table.HeadCell>Protocol</Table.HeadCell>
              <Table.HeadCell />
            </Table.Row>
          </Table.Head>
          <Table.Body className="max-lg:text-[0.75rem]/[1.75rem] [&_tr:after:last-child]:rounded-br-[1.25rem] [&_tr]:h-[5.5rem] max-lg:[&_tr]:h-14">
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
