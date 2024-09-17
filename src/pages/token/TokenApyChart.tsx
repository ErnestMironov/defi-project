import { useProtocolMetrics } from '@api/queries/useProtocolMetrics'
import type { RechartDataType } from '@components/chart/line-chart/AreaChart'
import { AreaChart } from '@components/chart/line-chart/AreaChart'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import { MultiSelect } from '@components/select/MultiSelect'
import type { OptionType } from '@components/select/Select'
import { Skeleton } from '@components/ui/skeleton'
import { SELECT_CHAINS, SELECT_PROTOCOLS } from '@constants/select-constant'
import { cn } from '@utils/cn'
import { type ComponentProps, useMemo, useState } from 'react'

interface TokenApyChartProperties extends ComponentProps<'div'> {
  symbol: 'USDT' | 'USDC'
}

export const TokenApyChart = (props: TokenApyChartProperties) => {
  const { className, symbol, ...rest } = props
  const { currentFrame, frames, onFrameChange, currentTimestamp } = useFrameSelect()
  const [currentChain, setCurrentChain] = useState<OptionType[]>([])
  const [currentProtocol, setCurrentProtocol] = useState<OptionType[]>([])

  const { data, isLoading, error } = useProtocolMetrics({
    metrics_type: ['apy'],
    tokens: [symbol],
    from_timestamp: currentTimestamp,
    protocols: currentProtocol.map((item) => item.value),
    chains: currentChain.map((item) => item.value),
  })
  const formattedTvlData: RechartDataType[] = useMemo(() => {
    if (!data) return []
    return Object.entries(
      data?.[symbol]?.history ?? {
        [currentTimestamp]: { apy: 0 },
        [Date.now()]: { apy: 0 },
      },
    ).map(([key, value]) => {
      // format timestamp to unix timestamp
      const timestamp = Number(key) * (key.length === 10 ? 1000 : 1)

      return {
        name: key,
        timestamp,
        value: value.apy,
      }
    })
  }, [data, symbol])
  return (
    <div className={cn('flex flex-col gap-8', className)} {...rest}>
      <div className="flex items-center justify-between">
        <h3 className="text-[2rem]/[2.4rem]">APY</h3>
        <div className="flex items-center gap-3 *:h-[2.6875rem]">
          <MultiSelect
            options={SELECT_CHAINS}
            value={currentChain}
            onChange={setCurrentChain}
            placeholder="All Chains"
            className="w-40"
            classNames={{ content: 'w-full' }}
          />
          <MultiSelect
            options={SELECT_PROTOCOLS}
            value={currentProtocol}
            onChange={setCurrentProtocol}
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
      {isLoading || !!error ? (
        <Skeleton className="h-80" />
      ) : (
        <AreaChart data={formattedTvlData} color="#6160FF" yAxisType="percent" />
      )}
    </div>
  )
}
