import { useProtocolMetrics } from '@api/maat-finance/useProtocolMetrics'
import Chain from '@assets/icons/chain.svg'
import Dot from '@assets/icons/dot.svg'
import Filter from '@assets/icons/filter.svg'
import Protocol from '@assets/icons/protocol.svg'
import type { RechartDataType } from '@components/chart/line-chart/LineChart'
import { LineChartComponent } from '@components/chart/line-chart/LineChart'
import { getDotStyles } from '@components/chart/line-chart/utils/chart-helpers'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import { MobileCheckboxSelect } from '@components/select/MobileCheckboxSelect'
import {
  DrawerIconTrigger,
  MobileFiltersDrawer,
} from '@components/select/MobileFiltersDrawer'
import type { OptionType } from '@components/select/Select'
import { Skeleton } from '@components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { SELECT_CHAINS, SELECT_PROTOCOLS } from '@constants/select-constant'
import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { useMemo, useState } from 'react'

interface TokensChartProperties extends ComponentProps<'div'> {}

const chartData: { title: string; color: '#6160FF' | '#A6C1FF' }[] = [
  { title: 'USDC', color: '#6160FF' },
  { title: 'USDT', color: '#A6C1FF' },
]

export const TokensChartMobile = (props: TokensChartProperties) => {
  const { className, ...rest } = props

  const { currentFrame, frames, onFrameChange, currentTimestamp } = useFrameSelect()

  const [selectedProtocols, setSelectedProtocols] = useState<OptionType[]>([])
  const [selectedChains, setSelectedChains] = useState<OptionType[]>([])

  const { data, isLoading, error } = useProtocolMetrics({
    metrics_type: ['apy', 'tvl'],
    token: ['USDT', 'USDC'],
    from_timestamp: currentTimestamp,
    protocol: selectedProtocols.map((item) => item.value),
    chain: selectedChains.map((item) => item.value),
  })
  const formattedData = useMemo(() => {
    if (!data) return { apyData: [], tvlData: [] }
    const apyData: RechartDataType[] = []
    const tvlData: RechartDataType[] = []
    Object.entries(
      data?.history?.USDC?.timestamps ??
        data?.history?.USDT?.timestamps ?? {
          [currentTimestamp]: { apy: 0, tvl: 0 },
          [Date.now().valueOf()]: { apy: 0, tvl: 0 },
        },
    ).forEach(([key, value]) => {
      const pvApy = data?.history?.USDT?.timestamps?.[key]?.apy
      const pvTvl = data?.history?.USDT?.timestamps?.[key]?.tvl
      // format timestamp to unix timestamp
      const timestamp = Number(key) * (key.length === 10 ? 1000 : 1)
      apyData.push({
        name: key,
        timestamp,
        uv: value.apy,
        pv: pvApy,
      })
      tvlData.push({
        name: key,
        timestamp,
        uv: value.tvl,
        pv: pvTvl,
      })
    })
    return { apyData, tvlData }
  }, [currentTimestamp, data])

  const renderApyBody = () => {
    switch (true) {
      case isLoading:
      case !!error: {
        return <Skeleton className="size-full rounded-3xl" />
      }
      default: {
        return (
          <LineChartComponent
            data={formattedData.apyData}
            yAxisType="percentage"
            frame={currentFrame}
          />
        )
      }
    }
  }

  const renderTvlBody = () => {
    switch (true) {
      case isLoading:
      case !!error: {
        return <Skeleton className="size-full rounded-3xl" />
      }
      default: {
        return (
          <LineChartComponent
            data={formattedData.tvlData}
            yAxisType="usd"
            frame={currentFrame}
          />
        )
      }
    }
  }
  return (
    <BaseContainer className={cn(className, '')} {...rest}>
      <div className="flex items-center gap-[0.38rem] p-3">
        <FramesSelect
          className="h-12 w-full *:flex-1"
          frame={currentFrame}
          frames={frames}
          onFrameChange={onFrameChange}
        />
        <MobileFiltersDrawer
          resetFilters={() => {
            setSelectedProtocols([])
            setSelectedChains([])
          }}
          title="Filters"
          trigger={
            <DrawerIconTrigger
              Icon={Filter}
              active={selectedProtocols.length > 0 || selectedChains.length > 0}
            />
          }
        >
          <MobileCheckboxSelect
            options={SELECT_CHAINS}
            onChange={setSelectedChains}
            value={selectedChains}
            label="Chains"
            icon={<Chain />}
            placeholder="All Chains"
          />
          <MobileCheckboxSelect
            options={SELECT_PROTOCOLS}
            onChange={setSelectedProtocols}
            value={selectedProtocols}
            label="Protocols"
            icon={<Protocol />}
            placeholder="All Protocols"
          />
        </MobileFiltersDrawer>
      </div>
      <Tabs defaultValue="apy">
        <TabsList className="w-full justify-start rounded-none border-y border-stroke-100 px-4 *:py-3 max-lg:gap-5">
          <TabsTrigger variant="underline" value="apy">
            APY
          </TabsTrigger>
          <TabsTrigger variant="underline" value="tvl">
            TVL
          </TabsTrigger>
          <div className="ml-auto flex items-center gap-3 text-text-2100">
            {chartData.map((item) => {
              return (
                <button
                  type="button"
                  key={item.title}
                  className="flex items-center gap-[0.56rem]"
                >
                  <Dot
                    className={cn(
                      getDotStyles(item.color),
                      'max-lg:size-2 overflow-visible',
                    )}
                  />
                  <span className="text-[0.8125rem]/[1.25rem]">{item.title}</span>
                </button>
              )
            })}
          </div>
        </TabsList>
        <TabsContent value="apy" className="h-60 p-2">
          {renderApyBody()}
        </TabsContent>
        <TabsContent value="tvl" className="h-60 p-2">
          {renderTvlBody()}
        </TabsContent>
      </Tabs>
    </BaseContainer>
  )
}
