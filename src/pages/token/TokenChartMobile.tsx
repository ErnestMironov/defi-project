import Dot from '@assets/icons/dot.svg'
import Filter from '@assets/icons/filter.svg'
import { AreaChart } from '@components/chart/line-chart/AreaChart'
import { getDotStyles } from '@components/chart/line-chart/utils/chart-helpers'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import { DrawerMultiSelect } from '@components/select/DrawerMultiSelect'
import {
  DrawerIconTrigger,
  MobileFiltersDrawer,
} from '@components/select/MobileFiltersDrawer'
import type { OptionType } from '@components/select/Select'
import { AnimatedTabs } from '@components/tab/AnimatedTabs'
import { Skeleton } from '@components/ui/skeleton'
import { SELECT_CHAINS, SELECT_PROTOCOLS } from '@constants/select-constant'
import { cn } from '@utils/cn'
import { formatPercentValue, formatUsdValue } from '@utils/formatValue'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useTokenMetrics } from './useTokenMetrics'

export type RechartDataType = {
  name: string
  timestamp: number
  value: number | null
}

interface TokenChartProperties extends ComponentProps<'div'> {}

export const TokenChartMobile = (props: TokenChartProperties) => {
  const { className, ...rest } = props
  const { symbol } = useParams()
  const [activeTab, setActiveTab] = useState<'apy' | 'tvl'>('apy')

  const { currentFrame, frames, onFrameChange } = useFrameSelect()

  const [selectedProtocols, setSelectedProtocols] = useState<OptionType[]>([])
  const [selectedChains, setSelectedChains] = useState<OptionType[]>([])

  const { apyData, tvlData, isLoading, error, apy, tvl } = useTokenMetrics(
    symbol as 'USDT' | 'USDC',
  )

  const renderApyBody = () => {
    switch (true) {
      case isLoading:
      case !!error: {
        return <Skeleton className="size-full rounded-3xl" />
      }
      default: {
        return <AreaChart data={apyData} color="#6160FF" yAxisType="percent" />
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
        return <AreaChart data={tvlData} color="#A6C1FF" yAxisType="usd" />
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
              {activeTab === 'apy' ? formatPercentValue(apy) : formatUsdValue(tvl)}
            </span>
          </div>
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
