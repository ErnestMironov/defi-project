/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-identical-functions */
import { useProtocolMetrics } from '@api/maat-finance/useProtocolMetrics'
import Dot from '@assets/icons/dot.svg'
import type { RechartDataType } from '@components/chart/line-chart/LineChart'
import { LineChartComponent } from '@components/chart/line-chart/LineChart'
import { getDotStyles } from '@components/chart/line-chart/utils/chart-helpers'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import { type OptionType } from '@components/select/Select'
import { Skeleton } from '@components/ui/skeleton'
import { CHART_TOKENS } from '@constants/chart-tokens'
import { cn } from '@utils/cn'
import { type ComponentProps, useMemo } from 'react'

interface ApyTokensChartDesktopProperties extends ComponentProps<'div'> {
  selectedChain: OptionType[]
  selectedProtocol: OptionType[]
}

export const ApyTokensChartDesktop = ({
  selectedChain,
  selectedProtocol,
}: ApyTokensChartDesktopProperties) => {
  const { currentFrame, frames, onFrameChange, currentTimestamp } = useFrameSelect()
  const { data, isLoading, error, isPlaceholderData } = useProtocolMetrics({
    metrics_type: ['apy'],
    token: ['USDT', 'USDC'],
    from_timestamp: currentTimestamp,
    protocol: selectedProtocol.map((item) => item.value),
    chain: selectedChain.map((item) => item.value),
  })

  const formattedApyData: RechartDataType[] = useMemo(() => {
    if (!data) return []
    return Object.entries(
      data?.history?.USDC?.timestamps ??
        data?.history?.USDT?.timestamps ?? {
          [currentTimestamp]: {},
          [Date.now()]: {},
        },
    ).map(([key]) => {
      const uv = data?.history?.USDC?.timestamps?.[key]?.apy ?? 0
      const pv = data?.history?.USDT?.timestamps?.[key]?.apy ?? 0
      // format timestamp to unix timestamp
      const timestamp = Number(key) * (key.length === 10 ? 1000 : 1)

      return {
        name: key,
        timestamp,
        uv,
        pv,
      }
    })
  }, [data, currentTimestamp])

  const renderBody = () => {
    switch (true) {
      case isLoading:
      case !!error: {
        return <Skeleton className="size-full rounded-3xl" />
      }
      default: {
        return (
          <LineChartComponent
            data={formattedApyData}
            yAxisType="percentage"
            frame={currentFrame}
          />
        )
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 border-b border-stroke-100 px-8 pb-5">
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
      <div className="mt-6 flex items-center justify-end gap-3 px-8">
        {CHART_TOKENS.map((item) => {
          return (
            <div key={item.title} className="flex items-center gap-2">
              <Dot
                className={cn(
                  getDotStyles(item.color),
                  'w-2.5 h-[0.625rem] overflow-visible',
                )}
              />
              <span className="text-sm">{item.title}</span>
            </div>
          )
        })}
      </div>
      <div className={cn('h-[14rem] px-8', isPlaceholderData && 'animate-pulse')}>
        {renderBody()}
      </div>
    </div>
  )
}
