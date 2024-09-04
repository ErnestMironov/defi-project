import { useMaatTokensApy } from '@api/queries/useMaatTokensApy'
import { useMaatTokensTvl } from '@api/queries/useMaatTokensTvl'
import Dot from '@assets/icons/dot.svg'
import Filter from '@assets/icons/filter.svg'
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
import { useState } from 'react'

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

  const {
    data: dataApy,
    loading: loadingApy,
    error: errorApy,
  } = useMaatTokensApy({ from: currentTimestamp })

  const {
    data: dataTvl,
    loading: loadingTvl,
    error: errorTvl,
  } = useMaatTokensTvl({ from: currentTimestamp })

  const renderApyBody = () => {
    switch (true) {
      case loadingApy:
      case !!errorApy: {
        return <Skeleton className="size-full rounded-3xl" />
      }
      default: {
        return <LineChartComponent data={dataApy} yPostfix="%" frame={currentFrame} />
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
        return <LineChartComponent data={dataTvl} yPrefix="$" frame={currentFrame} />
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
