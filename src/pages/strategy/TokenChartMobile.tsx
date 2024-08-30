import { useMaatTokensApy } from '@api/queries/useMaatTokensApy'
import { useMaatTokensTvl } from '@api/queries/useMaatTokensTvl'
import Dot from '@assets/icons/dot.svg'
import { AreaChart } from '@components/chart/line-chart/AreaChart'
import { getDotStyles } from '@components/chart/line-chart/utils/chart-helpers'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import { AnimatedTabs } from '@components/tab/AnimatedTabs'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { useState } from 'react'

export type RechartDataType = {
  name: string
  timestamp: number
  value: number | null
}

const MOCK_APY_DATA: RechartDataType[] = [
  {
    timestamp: 1_700_000_000,
    value: 10,
    name: 'Strategy 1',
  },
  {
    timestamp: 170_000_100,
    value: 2,
    name: 'Strategy 2',
  },
  {
    timestamp: 170_000_200,
    value: 10,
    name: 'Strategy 3',
  },
]
export const MOCK_TVL_DATA: RechartDataType[] = [
  {
    timestamp: 1_700_000_000,
    value: 10,
    name: 'Strategy 1',
  },
  {
    timestamp: 170_000_100,
    value: 4,
    name: 'Strategy 2',
  },
  {
    timestamp: 170_000_200,
    value: 10,
    name: 'Strategy 3',
  },
]

interface TokenChartProperties extends ComponentProps<'div'> {}

export const TokenChartMobile = (props: TokenChartProperties) => {
  const { className, ...rest } = props
  const [activeTab, setActiveTab] = useState<'apy' | 'tvl'>('apy')

  const { currentFrame, frames, onFrameChange, currentTimestamp } = useFrameSelect()

  const { loading: loadingApy, error: errorApy } = useMaatTokensApy({
    from: currentTimestamp,
  })

  const { loading: loadingTvl, error: errorTvl } = useMaatTokensTvl({
    from: currentTimestamp,
  })

  const renderApyBody = () => {
    switch (true) {
      case loadingApy:
      case !!errorApy: {
        return <Skeleton className="size-full rounded-3xl" />
      }
      default: {
        return <AreaChart data={MOCK_APY_DATA} color="#6160FF" yAxisType="percent" />
      }
    }
  }

  const renderTvlBody = () => {
    switch (true) {
      case loadingTvl:
      case !!errorTvl: {
        return <Skeleton className="size-full rounded-3xl" />
      }
      default: {
        return <AreaChart data={MOCK_TVL_DATA} color="#A6C1FF" yAxisType="usd" />
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
              {activeTab === 'apy' ? '384%' : '$123,456'}
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
