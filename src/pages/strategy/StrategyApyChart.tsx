/* eslint-disable sonarjs/no-small-switch */
import { useStrategiesMetrics } from '@api/maat-finance/useStrategiesMetrics'
import { AreaChart } from '@components/chart/line-chart/AreaChart'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

export type RechartDataType = {
  name: string
  timestamp: number
  value: number | null
}

interface AreaChartComponentProperties {
  className?: string
}

export const StrategyApyChart = ({ className }: AreaChartComponentProperties) => {
  const { currentFrame, frames, onFrameChange, currentTimestamp } = useFrameSelect()
  const { id } = useParams()
  const {
    data: apyData,
    isLoading,
    isPlaceholderData,
  } = useStrategiesMetrics(
    { strategy_id: [String(id)], from_timestamp: currentTimestamp.toString() },
    !!id,
  )
  const formattedData: { apy: RechartDataType[]; tvl: RechartDataType[] } =
    useMemo(() => {
      if (!id) return { apy: [], tvl: [] }
      const data = Object.entries(apyData ?? {}).map(([timestamp, strategies]) => {
        const formattedTimestamp =
          Number(timestamp) * (timestamp.length === 10 ? 1000 : 1)
        const apy = strategies[id]?.apy === 0 ? null : strategies[id]?.apy
        const tvl = strategies[id]?.tvl === 0 ? null : strategies[id]?.tvl
        return {
          apy: {
            name: 'APY',
            timestamp: formattedTimestamp,
            value: apy,
          },
          tvl: {
            name: 'TVL',
            timestamp: formattedTimestamp,
            value: tvl,
          },
        }
      })

      return {
        apy: data.map((item) => item.apy),
        tvl: data.map((item) => item.tvl),
      }
    }, [apyData, id])

  const renderContent = () => {
    switch (true) {
      case isLoading: {
        return <Skeleton className={cn('h-[13.7rem] mx-8 mb-5 rounded-2xl')} />
      }
      default: {
        return (
          <AreaChart
            className={cn(isPlaceholderData && 'animate-pulse', className)}
            data={formattedData.apy}
            color="#6160FF"
            yAxisType="percent"
          />
        )
      }
    }
  }

  return (
    <div className={cn('flex flex-col gap-8')}>
      <div className="flex items-center justify-between border-b border-stroke-100 px-8 py-5">
        <FramesSelect
          frame={currentFrame}
          frames={frames}
          onFrameChange={onFrameChange}
        />
      </div>
      {renderContent()}
    </div>
  )
}
