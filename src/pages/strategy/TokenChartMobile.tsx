import { useStrategiesMetrics } from '@api/queries/useStrategiesMetrics'
import Dot from '@assets/icons/dot.svg'
import { AreaChart } from '@components/chart/line-chart/AreaChart'
import { getDotStyles } from '@components/chart/line-chart/utils/chart-helpers'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import { AnimatedTabs } from '@components/tab/AnimatedTabs'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import { formatPercentValue, formatUsdValue } from '@utils/formatValue'
import type { ComponentProps } from 'react'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

export type RechartDataType = {
  name: string
  timestamp: number
  value: number | null
}

interface TokenChartProperties extends ComponentProps<'div'> {}

export const TokenChartMobile = (props: TokenChartProperties) => {
  const { className, ...rest } = props
  const [activeTab, setActiveTab] = useState<'apy' | 'tvl'>('apy')

  const { currentFrame, frames, onFrameChange } = useFrameSelect()

  const { id } = useParams()
  const {
    data: apyData,
    isLoading,
    isError,
  } = useStrategiesMetrics({ strategy_id: [String(id)] }, !!id)
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

  const renderApyBody = () => {
    switch (true) {
      case isLoading:
      case isError: {
        return <Skeleton className="size-full rounded-3xl" />
      }
      default: {
        return <AreaChart data={formattedData.apy} color="#6160FF" yAxisType="percent" />
      }
    }
  }

  const renderTvlBody = () => {
    switch (true) {
      case isLoading:
      case isError: {
        return <Skeleton className="size-full rounded-3xl" />
      }
      default: {
        return <AreaChart data={formattedData.tvl} color="#A6C1FF" yAxisType="usd" />
      }
    }
  }
  return (
    <section className={cn('mt-[2.5rem]', className, '')} {...rest}>
      <AnimatedTabs
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
      />
      <div className="mt-6 flex items-center">
        <div className="flex flex-col justify-center gap-2">
          <div className="flex items-center gap-2">
            <Dot
              className={cn(
                getDotStyles(activeTab === 'apy' ? '#6160FF' : '#A6C1FF'),
                'max-lg:size-2 overflow-visible',
              )}
            />
            <span className="text-[0.75rem]/[0.9rem] font-bold text-text">
              {activeTab === 'apy'
                ? formatPercentValue(formattedData.apy.at(-1)?.value ?? 0)
                : formatUsdValue(formattedData.tvl.at(-1)?.value ?? 0, {
                    notation: 'compact',
                  })}
            </span>
          </div>
        </div>
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
    </section>
  )
}
