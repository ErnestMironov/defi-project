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
        <TabsList className="*:w-[12.5rem]">
          <TabsTrigger value="maat">MAAT</TabsTrigger>
          <TabsTrigger value="incentives">INCENTIVES</TabsTrigger>
        </TabsList>
        <TabsContent value="maat">
          <MaatTransactionsHistory />
        </TabsContent>
        <TabsContent value="incentives">
          <IncentivesHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
