import type { EventsParameters } from '@api/queries/useEvents'
import { SectionTitle } from '@components/section/SectionTitle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { IncentiveMobileWithFilters } from '@modules/transactions/incentive/IncentiveMobileWithFilters'
import { TransactionsMobileWithFilters } from '@modules/transactions/TransactionsMobileWithFilters'
import type { ComponentProps } from 'react'

interface StrategyTransactionsProperties extends ComponentProps<'div'> {
  params: EventsParameters
}

export const StrategyTransactions = (props: StrategyTransactionsProperties) => {
  const { params } = props
  return (
    <div className="mt-16">
      <SectionTitle>Transactions</SectionTitle>
      <Tabs defaultValue="maat" className="mt-4">
        <TabsList>
          <TabsTrigger value="maat">MAAT</TabsTrigger>
          <TabsTrigger value="incentives">Incentives</TabsTrigger>
        </TabsList>
        <TabsContent value="maat">
          <TransactionsMobileWithFilters
            parameters={{
              transaction_type: 'maat',
              ...params,
            }}
            filters={['actions', 'statuses']}
          />
        </TabsContent>
        <TabsContent value="incentives">
          <IncentiveMobileWithFilters />
        </TabsContent>
      </Tabs>
    </div>
  )
}
