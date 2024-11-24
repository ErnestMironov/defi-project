import { useStrategiesMetrics } from '@api/maat-finance/useStrategiesMetrics'
import ChartIcon from '@assets/icons/chart.svg'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import { Table } from '@components/table'
import { TokenIconComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue'
import { type ComponentProps, useMemo } from 'react'

import { MultiColoredLineChart } from '../../components/MultiColoredLineChart'
import type { StrategiesMetricsChartData } from './StrategiesCharts'
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

  if (isLoading || !!error || !!strategiesError || isStrategiesLoading) {
    return <StrategiesChartSkeleton title="APY" />
  }

  return (
    <div
      className={cn(
        'flex w-full divide-x divide-stroke-100',
        isFetching && 'animate-pulse',
        className,
      )}
      {...rest}
    >
      <div className="flex-1 py-8">
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
          className="mt-6 h-[14.5rem] px-8"
          data={formattedStrategiesMetrics}
          frame="MAX"
          yAxisType="percent"
          dataKey="apy"
        />
      </div>
      <div className="divide-y divide-stroke-100">
        <div className="p-4">
          <BaseContainer className="flex w-fit items-center gap-2 rounded-xl px-4 py-3 text-sm/[1.5rem] font-medium">
            <ChartIcon className="size-4" /> Top 3
          </BaseContainer>
        </div>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Token</Table.HeadCell>
              <Table.HeadCell>Chain</Table.HeadCell>
              <Table.HeadCell>APY</Table.HeadCell>
              <Table.HeadCell>Protocol</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {topStrategiesWithColors.map((strategy, i) => (
              <Table.Row key={i}>
                <Table.Cell>
                  <div className="flex items-center gap-[0.38rem]">
                    <TokenIconComponent
                      symbol={strategy.strategy.token.symbol}
                      className="size-4"
                    />
                    <p>{strategy.strategy.token.symbol}</p>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-[0.38rem]">
                    <TokenIconComponent
                      symbol={strategy.strategy.token.chain_id}
                      className="size-4"
                    />
                    <p>
                      {
                        CHAIN_NAMES_BY_ID[
                          strategy.strategy.token
                            .chain_id as keyof typeof CHAIN_NAMES_BY_ID
                        ]
                      }
                    </p>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  {formatAmount(strategy.strategy.apy, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  <span className="text-text-260">%</span>
                </Table.Cell>
                <Table.Cell>{strategy.strategy.protocol}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-[0.38rem]">
                    <p className="font-medium text-text-260">#{i + 1}</p>
                    <div
                      className="size-2 rounded-full"
                      style={{ backgroundColor: strategy.color }}
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
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
