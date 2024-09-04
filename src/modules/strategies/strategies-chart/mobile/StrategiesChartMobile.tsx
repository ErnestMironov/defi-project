/* eslint-disable sonarjs/no-small-switch */
import type { Strategy } from '@api/maat-finance/types'
import { useStrategies } from '@api/queries/useStrategies'
import ArrowDown from '@assets/icons/arrow-down.svg'
import Close from '@assets/icons/close.svg'
import Filter from '@assets/icons/filter.svg'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import { Select } from '@components/select/Select'
import { AnimatedTabs } from '@components/tab/AnimatedTabs'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@components/ui/drawer'
import {
  COLORS,
  MultiColoredLineChart,
} from '@modules/strategies/components/MultiColoredLineChart'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { useEffect, useState } from 'react'

import { CustomStrategyMobileDrawerItem } from './strategy-mobile-drawer/CustomStrategyMobileDrawerItem'
import { StrategyMobileDrawerItem } from './strategy-mobile-drawer/StrategyMobileDrawerItem'
import { useMobileCustomStrategiesChartStore } from './useMobileStrategiesChartStore'

export type RechartDataType = {
  name: string
  timestamp: number
  values: (number | null)[]
}

const MOCK_CHART_DATA: RechartDataType[] = [
  {
    name: '',
    timestamp: 1_630_310_400_000,
    values: [0.1, 0.3, 0.4, 0.5, 0.1],
  },
  {
    name: '',
    timestamp: 1_630_310_400_000 + 1200,
    values: [1.2, 0.1, 0.4, null, 1],
  },
  {
    name: '',
    timestamp: 1_630_310_400_000 + 12_000,
    values: [0.1, null, 0.3, 0.4, 0.5],
  },
  {
    name: '',
    timestamp: 1_630_310_400_000 + 12_000_000_000_000,
    values: [1.2, 0.15, 0.4, 0.3, 1],
  },
]

export const MOCK_STRATEGIES: Strategy[] = [
  {
    address: '0x1234567890abcdef1234567890abcdef12345678',
    apy: 12.34,
    chain_id: 1,
    connected_to_vaults: null,
    id: 'strategy-1',
    info: null,
    protocol: 'aave',
    token: {
      chain_id: 137,
      symbol: 'usdt',
      name: 'Token 1',
      decimals: 18,
      address: '0xabcdefabcdefabcdefabcdefabcdefabcdef',
    },
    tvl: 1_000_000,
  },
  {
    address: '0xabcdefabcdefabcdefabcdefabcdefabcdef',
    apy: 23.45,
    chain_id: 1,
    connected_to_vaults: null,
    id: 'strategy-2',
    info: null,
    protocol: 'stargate',
    token: {
      chain_id: 137,
      symbol: 'usdt',
      name: 'Token 2',
      decimals: 18,
      address: '0x1234567890abcdef1234567890abcdef12345678',
    },
    tvl: 2_000_000,
  },
  {
    address: '0xabcdefabcdefabcdefabcdefabcdefabcdef',
    apy: 34.56,
    chain_id: 1,
    connected_to_vaults: null,
    id: 'strategy-3',
    info: null,
    protocol: 'yearn',
    token: {
      chain_id: 137,
      symbol: 'usdt',
      name: 'Token 3',
      decimals: 18,
      address: '0xabcdefabcdefabcdefabcdefabcdefabcdef',
    },
    tvl: 3_000_000,
  },
  {
    address: '0x1234567890abcdef1234567890abcdef12345678',
    apy: 45.67,
    chain_id: 1,
    connected_to_vaults: null,
    id: 'strategy-4',
    info: null,
    protocol: 'aave',
    token: {
      chain_id: 137,
      symbol: 'usdt',
      name: 'Token 4',
      decimals: 18,
      address: '0xabcdefabcdefabcdefabcdefabcdefabcdef',
    },
    tvl: 4_000_000,
  },
  {
    address: '0xabcdefabcdefabcdefabcdefabcdefabcdef',
    apy: 56.78,
    chain_id: 1,
    connected_to_vaults: null,
    id: 'strategy-5',
    info: null,
    protocol: 'stargate',
    token: {
      chain_id: 137,
      symbol: 'usdt',
      name: 'Token 5',
      decimals: 18,
      address: '0x1234567890abcdef1234567890abcdef12345678',
    },
    tvl: 5_000_000,
  },
]

interface StrategiesChartMobileProperties extends ComponentProps<'div'> {}

export const StrategiesChartMobile = (props: StrategiesChartMobileProperties) => {
  const { className, ...rest } = props
  const [activeTab, setActiveTab] = useState<'apy' | 'tvl'>('apy')

  // ----------- strategies -----------
  const { data } = useStrategies({
    size: 5,
  })
  const {
    topStrategiesWithColors,
    setTopStrategiesWithColors,
    customStrategiesWithColors,
    setCustomStrategiesWithColors,
    selectedStrategiesType,
    setSelectedStrategiesType,
    strategiesTypes,
    onCustomStrategiesVisibilityChange,
    onStrategySelect,
  } = useMobileCustomStrategiesChartStore()

  useEffect(() => {
    // if (data) {
    const topColoredStrategies = COLORS.map((color, i) => ({
      color,
      strategy: MOCK_STRATEGIES[i],
      visible: true,
    }))
    setTopStrategiesWithColors(topColoredStrategies)
    if (customStrategiesWithColors.length === 0) {
      setCustomStrategiesWithColors(topColoredStrategies)
    }
    // }
  }, [
    customStrategiesWithColors.length,
    setCustomStrategiesWithColors,
    setTopStrategiesWithColors,
  ])
  const onReset = () => {
    setTopStrategiesWithColors([])
    setCustomStrategiesWithColors([])
  }
  // ---------------------------------

  const { currentFrame, frames, onFrameChange, currentTimestamp } = useFrameSelect()

  const renderApyBody = () => {
    switch (true) {
      // case loadingApy:
      // case !!errorApy: {
      //   return <Skeleton className="size-full rounded-3xl" />
      // }
      default: {
        return <MultiColoredLineChart data={MOCK_CHART_DATA} yAxisType="percent" />
      }
    }
  }

  const renderTvlBody = () => {
    switch (true) {
      // case loadingTvl:
      // case !!errorTvl: {
      //   return <Skeleton className="size-full rounded-3xl" />
      // }
      default: {
        return <MultiColoredLineChart data={MOCK_CHART_DATA} yAxisType="usd" />
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
      {/* select strategies */}
      <Drawer>
        <DrawerTrigger className="mt-6 flex w-full items-center rounded-lg bg-cards p-4">
          <Filter className="size-6" />
          <span className="ml-2">{selectedStrategiesType.value}</span>
          <ArrowDown className="ml-auto size-4" />
        </DrawerTrigger>
        <DrawerContent
          aria-describedby={undefined}
          className="px-4 pb-8"
          withDraggable={false}
        >
          <DrawerTitle className="sr-only">Select strategies</DrawerTitle>
          <div className="flex items-center justify-between gap-6">
            <Select
              options={strategiesTypes}
              value={selectedStrategiesType}
              onChange={(value) => setSelectedStrategiesType(value)}
              leftSection={<Filter className="mr-2 inline-block size-6" />}
            />
            {selectedStrategiesType.label === 'Custom' && (
              <Close className="size-6" onClick={onReset} />
            )}
          </div>
          {selectedStrategiesType.label === 'Custom' && (
            <div className="mt-4 space-y-2">
              {customStrategiesWithColors.map((strategyWithColor, i) => (
                <CustomStrategyMobileDrawerItem
                  {...strategyWithColor}
                  key={i}
                  onVisibilityChange={() =>
                    onCustomStrategiesVisibilityChange(strategyWithColor)
                  }
                  onStrategySelect={(newStrategy) =>
                    onStrategySelect(newStrategy, strategyWithColor)
                  }
                  strategiesWithColors={customStrategiesWithColors}
                  index={i + 1}
                />
              ))}
            </div>
          )}
          {selectedStrategiesType.label === 'Top 5 strategies' && (
            <div className="mt-4 space-y-2">
              {topStrategiesWithColors.map((strategy, i) => (
                <StrategyMobileDrawerItem {...strategy} key={i} />
              ))}
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </section>
  )
}
