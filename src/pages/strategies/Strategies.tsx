import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import type { OptionType } from '@components/select/Select'
import { ScrollArea } from '@components/ui/scroll-area'
import { cn } from '@utils/cn'
import { type ComponentProps, useState } from 'react'

import { StrategyRow } from './components/StrategyRow'
import { COLORS, MultiColoredLineChart } from './modules/charts/MultiColoredLineChart'
import { SelectPopover } from './modules/strategies/SelectMenu'

const MOCK_APY_DATA = [
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

const MOCK_STRATEGIES = [
  {
    symbol: 'USDT',
    chain: 'Arbitrum',
    protocol: 'SonneFi',
  },
  {
    symbol: 'USDT',
    chain: 'Base',
    protocol: 'AAVE',
  },
  {
    symbol: 'USDT',
    chain: 'Mantle',
    protocol: 'Beefy',
  },
  {
    symbol: 'USDC',
    chain: 'Arbitrum',
    protocol: 'Compound',
  },
  {
    symbol: 'USDT',
    chain: 'Arbitrum',
    protocol: 'Aave',
  },
]

interface StrategiesProperties extends ComponentProps<'div'> {}

const SELECT_STRATEGIES: OptionType[] = [
  { label: 'Top 5 strategies', value: 'Top 5 strategies' },
  {
    label: 'Custom',
    value: 'Custom',
    Icon: () => <></>,
    callback: () => {},
  },
]

export const Strategies = (props: StrategiesProperties) => {
  const { className, ...rest } = props
  const [strategies, setStrategies] = useState(SELECT_STRATEGIES[0])

  const {
    currentFrame,
    currentTimestamp: _currentTimestamp,
    frames,
    onFrameChange,
  } = useFrameSelect()

  return (
    <div className={cn(className, '')} {...rest}>
      <div className="mt-[5.31rem] flex w-full gap-5">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-[2rem]/[2.4rem]">APY</h2>
            <FramesSelect
              frame={currentFrame}
              frames={frames}
              onFrameChange={onFrameChange}
            />
          </div>
          <MultiColoredLineChart
            className="mt-6 h-[26.5625rem]"
            data={MOCK_APY_DATA}
            yPostfix="%"
            frame="MAX"
          />
        </div>
        <div className="w-[27.0625rem] rounded-3xl bg-cards px-5 py-6">
          <SelectPopover
            options={SELECT_STRATEGIES}
            value={strategies}
            onChange={(option) => setStrategies(option)}
          />
          <ScrollArea className="-mx-4 mt-8 px-4">
            <div className="max-h-[22.75rem] space-y-3 ">
              {MOCK_STRATEGIES.map((strategy, index) => (
                <StrategyRow color={COLORS[index]} {...strategy} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
