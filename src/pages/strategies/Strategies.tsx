import type { OptionType } from '@components/select/Select'
import { Footer } from '@layouts/footer/Footer'
import { Strategies } from '@modules/strategies/Strategies'
import { StrategiesChart } from '@modules/strategies/StrategiesChart'
import { TransactionHistory } from '@modules/transaction-history/TransactionHistory'
import {
  SELECT_ACTIONS,
  SELECT_CHAINS,
  SELECT_MAAT_ACTIONS,
  SELECT_PROTOCOLS,
  SELECT_STATUSES,
  SELECT_TOKENS,
} from '@constants/select-constant'
import { cn } from '@utils/cn'
import { type ComponentProps } from 'react'

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

export const MOCK_STRATEGIES = [
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
export const SELECT_STRATEGIES: OptionType[] = [
  { label: 'Top 5 strategies', value: 'Top 5 strategies' },
  {
    label: 'Custom',
    value: 'Custom',
    Icon: () => <></>,
    callback: () => {},
  },
]

interface StrategiesProperties extends ComponentProps<'div'> {}

export const StrategiesPage = (props: StrategiesProperties) => {
  const { className, ...rest } = props

  return (
    <div className={cn(className, 'mt-[5.31rem]')} {...rest}>
      <StrategiesChart
        title="APY"
        yAxisType="percent"
        selectStrategies={SELECT_STRATEGIES}
        chartData={MOCK_APY_DATA}
        strategies={MOCK_STRATEGIES}
      />
      <StrategiesChart
        title="TVL"
        yAxisType="usd"
        selectStrategies={SELECT_STRATEGIES}
        chartData={MOCK_APY_DATA}
        strategies={MOCK_STRATEGIES}
        className="mt-[6.25rem]"
      />
      <Strategies
        filters={{
          search: { value: '', placeholder: 'Name / Address / ID' },
          token: { items: SELECT_TOKENS, value: SELECT_TOKENS[0] },
          chain: { items: SELECT_CHAINS, value: SELECT_CHAINS[0] },
          protocol: { items: SELECT_PROTOCOLS, value: SELECT_PROTOCOLS[0] },
        }}
        className="mt-[6.25rem]"
      />
      <TransactionHistory
        className="mt-[6.25rem]"
        maatFilters={{
          search: { value: '', placeholder: 'Tx Hash' },
          action: { items: SELECT_MAAT_ACTIONS, value: SELECT_MAAT_ACTIONS[0] },
          status: { items: SELECT_STATUSES, value: SELECT_STATUSES[0] },
          token: { items: SELECT_TOKENS, value: SELECT_TOKENS[0] },
          chain: { items: SELECT_CHAINS, value: SELECT_CHAINS[0] },
        }}
        incentivesFilters={{
          search: { value: '', placeholder: 'Tx Hash' },
          action: { items: SELECT_ACTIONS, value: SELECT_ACTIONS[0] },
          status: { items: SELECT_STATUSES, value: SELECT_STATUSES[0] },
        }}
      />
      <Footer className="mt-[7.5rem] max-lg:mb-[4.55rem] max-lg:mt-[4.5rem]" />
    </div>
  )
}
