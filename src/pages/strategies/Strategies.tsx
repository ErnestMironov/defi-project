import type { OptionType } from '@components/select/Select'
import { Footer } from '@layouts/footer/Footer'
import { Strategies } from '@modules/strategies/Strategies'
import { StrategiesChart } from '@modules/strategies/StrategiesChart'
import { cn } from '@utils/cn'
import { type ComponentProps } from 'react'

import { Breadcrumbs } from './Breadcrumbs'
import { Transactions } from './transactions/Transactions'

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
      <Breadcrumbs className="mb-[2.63rem]" />
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
      <Strategies className="mt-[6.25rem]" />
      <Transactions className="mt-[6.25rem]" />
      <Footer className="mt-[7.5rem] max-lg:mb-[4.55rem] max-lg:mt-[4.5rem]" />
    </div>
  )
}
