import type { Token } from '@api/maat-finance/types'
import { useStrategiesMetrics } from '@api/maat-finance/useStrategiesMetrics'
import Dot from '@assets/icons/dot.svg'
import { AreaChart } from '@components/chart/line-chart/AreaChart'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import { Skeleton } from '@components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

export type RechartDataType = {
  name: string
  timestamp: number
  value: number | null
}

interface TokenChartProperties extends ComponentProps<'div'> {
  token: Token
}

export const TokenChartMobile = (props: TokenChartProperties) => {
  const { className, token, ...rest } = props
  const { currentFrame, frames, onFrameChange, currentTimestamp } = useFrameSelect()

  const { id } = useParams()
  const {
    data: apyData,
    isLoading,
    isError,
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

  console.log(formattedData)

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
    <section className={cn('bg-cards-widget rounded-b-3xl', className, '')} {...rest}>
      <div className="p-3">
        <FramesSelect
          className="h-12 w-full *:flex-1"
          frame={currentFrame}
          frames={frames}
          onFrameChange={onFrameChange}
        />
      </div>

      <Tabs defaultValue="apy">
        <TabsList className="w-full justify-start rounded-none border-y border-stroke-100 px-4 *:py-3 max-lg:gap-5">
          <TabsTrigger variant="underline" value="apy">
            APY
          </TabsTrigger>
          <TabsTrigger variant="underline" value="tvl">
            TVL
          </TabsTrigger>

          <div className="ml-auto flex items-center gap-3 text-text-2100" />
          <div className="flex items-center gap-[0.38rem]">
            <Dot className={cn('size-[0.375rem] overflow-visible')} />
            <span className="text-sm text-text-2100">{token.symbol}</span>
          </div>
        </TabsList>
        <TabsContent value="apy" className="h-60 p-2">
          {renderApyBody()}
        </TabsContent>
        <TabsContent value="tvl" className="h-60 p-2">
          {renderTvlBody()}
        </TabsContent>
      </Tabs>
      <div className="mt-6 flex items-center">
        <div className="flex flex-col justify-center gap-2">
          <div className="flex items-center gap-2" />
        </div>
      </div>
    </section>
  )
}
