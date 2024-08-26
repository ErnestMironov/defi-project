import { ArrowButton } from '@components/button/ArrowButton'
import { SectionTitle } from '@components/section/SectionTitle'
import { AnimatedTabs } from '@components/tab/AnimatedTabs'
import useDeviceWidth from '@hooks/useDeviceWidth'
import { cn } from '@utils/cn'
import { type ComponentProps, useState } from 'react'

import { ApyChartModule } from './charts/apy/ApyChartModule'
import { TvlChartModule } from './charts/TvlChartModule'

interface TokensProperties extends ComponentProps<'div'> {}

export const TokenCharts = (props: TokensProperties) => {
  const { className, ...rest } = props
  const { isBelowDesktop } = useDeviceWidth()

  if (isBelowDesktop) return <TokenChartsMobile {...props} />

  return (
    <section className={cn(className, '')} {...rest}>
      <SectionTitle>Tokens</SectionTitle>
      <div className="mt-[4.78rem] grid gap-4 max-lg:mt-4 max-lg:gap-8 lg:grid-cols-2">
        <ApyChartModule />
        <TvlChartModule />
      </div>
    </section>
  )
}

const TokenChartsMobile = (props: TokensProperties) => {
  const { className, ...rest } = props
  const [activeTab, setActiveTab] = useState<'apy' | 'tvl'>('apy')
  return (
    <section className={cn(className, '')} {...rest}>
      <div className="flex items-center justify-between">
        <SectionTitle>Tokens</SectionTitle>
        <ArrowButton />
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
      <div className="mt-6">
        {activeTab === 'apy' && <ApyChartModule />}
        {activeTab === 'tvl' && <TvlChartModule />}
      </div>
    </section>
  )
}
