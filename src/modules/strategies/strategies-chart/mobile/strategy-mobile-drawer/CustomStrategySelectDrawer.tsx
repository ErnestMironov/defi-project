import type { Strategy } from '@api/maat-finance/types'
import Arrow from '@assets/icons/arrow-left.svg'
import { DrawerMultiSelect } from '@components/select/DrawerMultiSelect'
import type { OptionType } from '@components/select/Select'
import { IconWithLabelComponent } from '@components/token-icon'
import { Button } from '@components/ui/button'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@components/ui/drawer'
import {
  SELECT_CHAINS,
  SELECT_PROTOCOLS,
  SELECT_TOKENS,
} from '@constants/select-constant'
import { cn } from '@utils/cn'
import { type ComponentProps, useState } from 'react'

import type { StrategyWithColor } from '../useMobileStrategiesChartStore'
import { DrawerMultiSelectTokens } from './DrawerMultiSelectTokens'

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
  {
    address: '0x1234567890abcdef1234567890abcdef12345678',
    apy: 12.34,
    chain_id: 1,
    connected_to_vaults: null,
    id: 'strategy-6',
    info: null,
    protocol: 'aave',
    token: {
      chain_id: 137,
      symbol: 'usdc',
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
    id: 'strategy-7',
    info: null,
    protocol: 'stargate',
    token: {
      chain_id: 137,
      symbol: 'usdc',
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
    id: 'strategy-8',
    info: null,
    protocol: 'yearn',
    token: {
      chain_id: 137,
      symbol: 'usdc',
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
    id: 'strategy-9',
    info: null,
    protocol: 'aave',
    token: {
      chain_id: 137,
      symbol: 'usdc',
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
    id: 'strategy-10',
    info: null,
    protocol: 'stargate',
    token: {
      chain_id: 137,
      symbol: 'usdc',
      name: 'Token 5',
      decimals: 18,
      address: '0x1234567890abcdef1234567890abcdef12345678',
    },
    tvl: 5_000_000,
  },
]

interface CustomStrategySelectDrawerProperties extends ComponentProps<'div'> {
  index: number
  color: string
  onStrategySelect: (strategy: Strategy) => void
  strategiesWithColors: StrategyWithColor[]
}
export const CustomStrategySelectDrawer = (
  props: CustomStrategySelectDrawerProperties,
) => {
  const { children, index, color, onStrategySelect, strategiesWithColors } = props

  const [isOpen, setIsOpen] = useState(false)

  const [selectedChain, setSelectedChain] = useState<OptionType[]>([])
  const [selectedProtocol, setSelectedProtocol] = useState<OptionType[]>([])
  const [selectedTokens, setSelectedTokens] = useState<OptionType[]>([])

  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null)

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent
        aria-describedby={undefined}
        withDraggable={false}
        className="px-4 py-6"
      >
        <DrawerTitle className="sr-only">Select strategy</DrawerTitle>
        <div className="flex items-center">
          <Arrow className="size-6" onClick={() => setIsOpen(false)} />
          <div
            style={{ backgroundColor: color }}
            className="ml-4 size-2.5 shrink-0 rounded-full"
          />
          <span className="ml-2 text-lg text-text-90">Line {index}</span>
        </div>
        <div className="mt-6 flex items-center gap-2">
          <DrawerMultiSelect
            className="h-11 rounded-xl"
            options={SELECT_CHAINS}
            onChange={(value) => setSelectedChain(value)}
            value={selectedChain}
            placeholder="All chains"
          />
          <DrawerMultiSelect
            className="h-11 rounded-xl"
            options={SELECT_PROTOCOLS}
            onChange={(value) => setSelectedProtocol(value)}
            value={selectedProtocol}
            placeholder="All protocols"
          />
          <DrawerMultiSelectTokens
            selectedTokens={selectedTokens}
            setSelectedTokens={setSelectedTokens}
            tokens={SELECT_TOKENS}
          />
        </div>
        <div className="mt-3 min-h-28 space-y-2">
          {MOCK_STRATEGIES.map((strategy) => (
            <div
              onClick={() => setSelectedStrategy(strategy)}
              key={strategy.id}
              className={cn(
                'flex h-[3.75rem] items-center gap-[0.62rem] rounded-xl border border-stroke-100 px-4 py-3',
                {
                  'border-main-50': selectedStrategy === strategy,
                  hidden: strategiesWithColors.some(
                    (strategyWithColor) => strategyWithColor.strategy.id === strategy.id,
                  ),
                },
              )}
            >
              {[strategy.token.symbol, strategy.chain_id, strategy.protocol].map(
                (item) => (
                  <IconWithLabelComponent
                    key={item}
                    symbol={item}
                    className="size-5 text-semi-base"
                  />
                ),
              )}
              <p className="ml-auto text-semi-base font-bold">10.57%</p>
            </div>
          ))}
          {MOCK_STRATEGIES.length === 0 && (
            <div className="flex h-28 items-center justify-center text-base text-text-50">
              <span>Strategies not found</span>
            </div>
          )}
        </div>

        <div className="mt-6 flex w-full items-center gap-2 *:flex-1">
          <Button
            onClick={() => {
              setSelectedChain([])
              setSelectedProtocol([])
              setSelectedTokens([])
            }}
            variant="outline-light"
            size="lg"
            className="py-4"
          >
            Reset
          </Button>
          <Button
            disabled={!selectedStrategy}
            onClick={() => {
              if (!selectedStrategy) return
              onStrategySelect(selectedStrategy)
              setSelectedStrategy(null)
              setIsOpen(false)
            }}
            variant="light"
            size="lg"
            className="py-4 font-bold"
          >
            Apply
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
