import { Footer } from '@layouts/footer/Footer'
import { TransactionHistory } from '@modules/transaction-history/TransactionHistory'
import {
  SELECT_ACTIONS,
  SELECT_CHAINS,
  SELECT_INCENTIVES_ACTIONS,
  SELECT_INCENTIVES_FROM,
  SELECT_STATUSES,
} from '@constants/select-constant'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import { Breadcrumbs } from './Breadcrumbs'
import { StrategyApyChart } from './StrategyApyChart'
import { StrategyHeader } from './StrategyHeader'
import { StrategyInfo } from './StrategyInfo'
import { StrategyTvlChart } from './StrategyTvlChart'

interface StrategyProperties extends ComponentProps<'div'> {}

export const Strategy = (props: StrategyProperties) => {
  const { className, ...rest } = props
  return (
    <div className={cn('mt-[4.5rem]', className)} {...rest}>
      <Breadcrumbs />
      <StrategyHeader />
      <StrategyInfo />
      <div className="mt-[4.62rem] grid grid-cols-2 gap-10 *:h-[18.25rem]">
        <StrategyApyChart />
        <StrategyTvlChart />
      </div>
      <TransactionHistory
        className="mt-[6.25rem]"
        maatFilters={{
          search: { value: '', placeholder: 'Tx Hash' },
          action: { items: SELECT_ACTIONS, value: SELECT_ACTIONS[0] },
          status: { items: SELECT_STATUSES, value: SELECT_STATUSES[0] },
        }}
        incentivesFilters={{
          search: { value: '', placeholder: 'Tx Hash' },
          action: {
            items: SELECT_INCENTIVES_ACTIONS,
            value: SELECT_INCENTIVES_ACTIONS[0],
          },
          from: { items: SELECT_INCENTIVES_FROM, value: SELECT_INCENTIVES_FROM[0] },
          chain: { items: SELECT_CHAINS, value: SELECT_CHAINS[0] },
        }}
      />
      <Footer className="mt-[7.5rem]" />
    </div>
  )
}
