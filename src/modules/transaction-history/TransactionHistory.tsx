import { SectionTitle } from '@components/section/SectionTitle'
import { BaseTabs } from '@components/tab/BaseTabs'
import { cn } from '@utils/cn'
import { type ComponentProps, useState } from 'react'

import { type IncentiveFilters, IncentivesHistory } from './incentives/IncentivesHistory'
import {
  type MaatTransactionFilters,
  MaatTransactionsHistory,
} from './maat/MaatTransactionsHistory'

interface TransactionHistoryProperties extends ComponentProps<'div'> {
  maatFilters: MaatTransactionFilters
  incentivesFilters: IncentiveFilters
}

const TABS = ['MAAT', 'INCENTIVES']

export const TransactionHistory = (props: TransactionHistoryProperties) => {
  const { maatFilters, incentivesFilters, className, ...rest } = props
  const [activeTab, setActiveTab] = useState(TABS[0])

  return (
    <div {...rest} className={cn('', className)}>
      <SectionTitle>Transactions</SectionTitle>
      <BaseTabs
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        className="mt-12"
        classNames={{ tab: 'w-[12.5rem]' }}
      />
      {activeTab === TABS[0] && <MaatTransactionsHistory filters={maatFilters} />}
      {activeTab === TABS[1] && <IncentivesHistory filters={incentivesFilters} />}
    </div>
  )
}
