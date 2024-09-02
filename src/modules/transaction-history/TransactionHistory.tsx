import type { TableFiltersType } from '@components/filters/TableFilters'
import { SectionTitle } from '@components/section/SectionTitle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { cn } from '@utils/cn'
import { type ComponentProps } from 'react'

import { IncentivesHistory } from './incentives/IncentivesHistory'
import { MaatTransactionsHistory } from './maat/MaatTransactionsHistory'

interface TransactionHistoryProperties extends ComponentProps<'div'> {
  maatFilters: TableFiltersType
  incentivesFilters: TableFiltersType
}

export const TransactionHistory = (props: TransactionHistoryProperties) => {
  const { maatFilters, incentivesFilters, className, ...rest } = props

  return (
    <div {...rest} className={cn('', className)}>
      <SectionTitle>Transactions</SectionTitle>
      <Tabs className="mt-12" defaultValue="maat">
        <TabsList className="*:w-[12.5rem]">
          <TabsTrigger value="maat">MAAT</TabsTrigger>
          <TabsTrigger value="incentives">INCENTIVES</TabsTrigger>
        </TabsList>
        <TabsContent value="maat">
          <MaatTransactionsHistory filters={maatFilters} />
        </TabsContent>
        <TabsContent value="incentives">
          <IncentivesHistory filters={incentivesFilters} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
