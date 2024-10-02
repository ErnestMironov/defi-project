/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable sonarjs/no-identical-functions */
import { useProtocolMetrics } from '@api/queries/useProtocolMetrics'
import Dot from '@assets/icons/dot.svg'
import type { RechartDataType } from '@components/chart/line-chart/LineChart'
import { LineChartComponent } from '@components/chart/line-chart/LineChart'
import { getDotStyles } from '@components/chart/line-chart/utils/chart-helpers'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import { MultiSelect } from '@components/select/MultiSelect'
import { type OptionType } from '@components/select/Select'
import { Skeleton } from '@components/ui/skeleton'
import { CHART_TOKENS } from '@constants/chart-tokens'
import { SELECT_CHAINS, SELECT_PROTOCOLS } from '@constants/select-constant'
import { cn } from '@utils/cn'
import { type ComponentProps, useMemo, useState } from 'react'

interface ApyTokensChartDesktopProperties extends ComponentProps<'div'> {}

export const ApyTokensChartDesktop = (_props: ApyTokensChartDesktopProperties) => {
  const { currentFrame, frames, onFrameChange, currentTimestamp } = useFrameSelect()
  const [selectedChain, setSelectedChain] = useState<OptionType[]>([])
  const [selectedProtocol, setSelectedProtocol] = useState<OptionType[]>([])
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
      <div className="flex items-center justify-between px-4">
        <h2 className="flex-1 text-[2rem]/[2.4rem] uppercase">APY</h2>
        <div className="flex h-[2.6875rem] items-center gap-3">
          <MultiSelect
            options={SELECT_CHAINS}
            value={selectedChain}
            onChange={setSelectedChain}
            placeholder="All Chains"
            className="w-40"
            classNames={{ content: 'w-full' }}
          />
          <MultiSelect
            options={SELECT_PROTOCOLS}
            value={selectedProtocol}
            onChange={setSelectedProtocol}
            placeholder="All Protocols"
            className="w-40"
            classNames={{ content: 'w-full' }}
          />
          <FramesSelect
            frame={currentFrame}
            frames={frames}
            onFrameChange={onFrameChange}
          />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4 px-4">
        {CHART_TOKENS.map((item) => {
          return (
            <div key={item.title} className="flex items-center gap-[0.56rem]">
              <Dot
                className={cn(
                  getDotStyles(item.color),
                  'w-2.5 h-[0.625rem] overflow-visible',
                )}
              />
              <span className="text-[0.875rem]/[1.05rem]">{item.title}</span>
            </div>
          )
        })}
      </div>
      <div className={cn('mt-4 h-72', isPlaceholderData && 'animate-pulse')}>
        {renderBody()}
      </div>
    </div>
  )
}
