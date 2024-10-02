import { useProtocolMetrics } from '@api/queries/useProtocolMetrics'
import Dot from '@assets/icons/dot.svg'
import Filter from '@assets/icons/filter.svg'
import type { RechartDataType } from '@components/chart/line-chart/LineChart'
import { LineChartComponent } from '@components/chart/line-chart/LineChart'
import { getDotStyles } from '@components/chart/line-chart/utils/chart-helpers'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import { ArrowLink } from '@components/link/ArrowLink'
import { SectionTitle } from '@components/section/SectionTitle'
import { DrawerMultiSelect } from '@components/select/DrawerMultiSelect'
import {
  DrawerIconTrigger,
  MobileFiltersDrawer,
} from '@components/select/MobileFiltersDrawer'
import type { OptionType } from '@components/select/Select'
import { AnimatedTabs } from '@components/tab/AnimatedTabs'
import { Skeleton } from '@components/ui/skeleton'
import { SELECT_CHAINS, SELECT_PROTOCOLS } from '@constants/select-constant'
import { ROUTES } from '@routes/routes'
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
  const [activeTab, setActiveTab] = useState<'apy' | 'tvl'>('apy')

  const { currentFrame, frames, onFrameChange, currentTimestamp } = useFrameSelect()

  const [selectedProtocols, setSelectedProtocols] = useState<OptionType[]>([])
  const [selectedChains, setSelectedChains] = useState<OptionType[]>([])

  const { data, isLoading, error } = useProtocolMetrics({
    metrics_type: ['apy', 'tvl'],
    tokens: ['USDT', 'USDC'],
    from_timestamp: currentTimestamp,
    protocols: selectedProtocols.map((item) => item.value),
    chains: selectedChains.map((item) => item.value),
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
    <section className={cn(className, '')} {...rest}>
      <div className="flex items-center justify-between">
        <SectionTitle>Tokens</SectionTitle>
        <ArrowLink to={ROUTES.TOKENS} />
      </div>
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
      <div className="mt-6 flex items-start">
        <div className="flex flex-col justify-center gap-2">
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
                <span className="text-[0.75rem]/[0.9rem]">{item.title}</span>
              </button>
            )
          })}
        </div>
        <FramesSelect
          className="ml-auto h-10 rounded-lg"
          frame={currentFrame}
          frames={frames}
          onFrameChange={onFrameChange}
        />
        <MobileFiltersDrawer
          className="ml-3"
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
          <DrawerMultiSelect
            options={SELECT_PROTOCOLS}
            onChange={setSelectedProtocols}
            value={selectedProtocols}
            label="Protocol"
            placeholder="All Protocols"
          />
          <DrawerMultiSelect
            options={SELECT_CHAINS}
            onChange={setSelectedChains}
            value={selectedChains}
            label="Chain"
            placeholder="All Chains"
          />
        </MobileFiltersDrawer>
      </div>
      <div className="mt-6 h-[10.125rem]">
        {activeTab === 'apy' && renderApyBody()}
        {activeTab === 'tvl' && renderTvlBody()}
      </div>
    </section>
  )
}
