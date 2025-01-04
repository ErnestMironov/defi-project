import type { EventsParameters } from '@api/maat-finance/useEvents'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { IncentiveMobileWithFilters } from '@modules/transactions/incentive/IncentiveMobileWithFilters'
import { TransactionsMobileWithFilters } from '@modules/transactions/TransactionsMobileWithFilters'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

interface StrategyTransactionsProperties extends ComponentProps<'div'> {
  params: EventsParameters
  className?: string
}

export const StrategyTransactions = (props: StrategyTransactionsProperties) => {
  const { params, className } = props
  return (
    <div className={cn('rounded-t-3xl', className)}>
      <Tabs defaultValue="maat" className="mt-4">
        <TabsList className="w-full justify-start rounded-t-2xl border-y border-stroke-100 bg-cards-widget px-4 *:py-3 max-lg:gap-5">
          <TabsTrigger value="maat" variant="underline">
            Maat Finance
          </TabsTrigger>
          <TabsTrigger value="incentives" variant="underline">
            Incentivies
          </TabsTrigger>
        </TabsList>
        <TabsContent value="maat">
          <TransactionsMobileWithFilters
            parameters={{
              transaction_type: 'maat',
              ...params,
            }}
            className="rounded-b-2xl"
            filters={['actions', 'statuses']}
          />
        </TabsContent>
        <TabsContent value="incentives" className="">
          <IncentiveMobileWithFilters />
        </TabsContent>
      </Tabs>
    </div>
  )
}
