import {
  SELECT_ACTIONS,
  SELECT_CHAINS,
  SELECT_INCENTIVES_ACTIONS,
  SELECT_INCENTIVES_FROM,
  SELECT_STATUSES,
} from '@constants/select-constant'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { Footer } from '@layouts/footer/Footer'
import { TransactionHistory } from '@modules/transaction-history/TransactionHistory'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import { Breadcrumbs } from './Breadcrumbs'
import { StrategyApyChart } from './StrategyApyChart'
import { StrategyHeader } from './StrategyHeader'
import { StrategyInfoDesktop } from './StrategyInfoDesktop'
import { StrategyInfoMobile } from './StrategyInfoMobile'
import { StrategyTransactions } from './StrategyTransactions'
import { StrategyTvlChart } from './StrategyTvlChart'
import { TokenChartMobile } from './TokenChartMobile'

interface StrategyProperties extends ComponentProps<'div'> {}

export const Strategy = (props: StrategyProperties) => {
  const { className, ...rest } = props
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <StrategyMobile {...props} />
  }
  return (
    <div className={cn('mt-[4.5rem]', className)} {...rest}>
      <Breadcrumbs />
      <StrategyHeader />
      <StrategyInfoDesktop />
      <div className="mt-[4.62rem] grid grid-cols-2 gap-10 *:h-[18.25rem]">
        <StrategyApyChart />
        <StrategyTvlChart />
      </div>
      <TransactionHistory
        className="mt-[6.25rem]"
        maatFilters={{
          search: { value: '', placeholder: 'Tx Hash' },
          action: { items: SELECT_ACTIONS, value: [], placeholder: 'All Actions' },
          status: { items: SELECT_STATUSES, value: [], placeholder: 'All Statuses' },
        }}
        incentivesFilters={{
          search: { value: '', placeholder: 'Tx Hash' },
          action: {
            items: SELECT_INCENTIVES_ACTIONS,
            value: [],
          },
          from: { items: SELECT_INCENTIVES_FROM, value: [] },
          chain: { items: SELECT_CHAINS, value: [], placeholder: 'All Chains' },
        }}
      />
      <Footer className="mt-[7.5rem]" />
    </div>
  )
}

const StrategyMobile = (props: StrategyProperties) => {
  const { className, ...rest } = props
  return (
    <div className={cn('mt-6', className)} {...rest}>
      <StrategyHeader />
      <StrategyInfoMobile />
      <TokenChartMobile />
      <StrategyTransactions />
      <Footer className="mt-[5.5rem]" />
    </div>
  )
}
