import { SectionTitle } from '@components/section/SectionTitle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { cn } from '@utils/cn'
import { type ComponentProps } from 'react'

import { IncentivesHistory } from './IncentivesHistory'
import { MaatTransactionsHistory } from './MaatTransactionsHistory'

interface TransactionHistoryProperties extends ComponentProps<'div'> {}

export const Transactions = (props: TransactionHistoryProperties) => {
  const { className, ...rest } = props

  return (
    <div {...rest} className={cn('', className)}>
      <SectionTitle>Transactions</SectionTitle>
      <Tabs className="mt-12" defaultValue="maat">
        <TabsList className="flex w-full justify-start">
          <TabsTrigger className="w-[12.5rem] max-lg:w-full" value="maat">
            MAAT
          </TabsTrigger>
          <TabsTrigger className="w-[12.5rem] max-lg:w-full" value="incentives">
            INCENTIVES
          </TabsTrigger>
        </TabsList>
        <TabsContent value="maat">
          <MaatTransactionsHistory eventParameters={{ transaction_type: 'maat' }} />
        </TabsContent>
        <TabsContent value="incentives">
          <IncentivesHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
