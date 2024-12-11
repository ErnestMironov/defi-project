import type { EventsParameters } from '@api/maat-finance/useEvents'
import type { TableFiltersType } from '@components/filters/TableFilters'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { cn } from '@utils/cn'
import { type ComponentProps } from 'react'

import { IncentivesHistory } from './incentives/IncentivesHistory'
import { MaatTransactionsHistory } from './maat/MaatTransactionsHistory'

interface TransactionHistoryProperties extends ComponentProps<'div'> {
  maatFilters: TableFiltersType
  incentivesFilters: TableFiltersType
  eventParameters?: EventsParameters
}

export const TransactionHistory = (props: TransactionHistoryProperties) => {
  const { maatFilters, incentivesFilters, className, eventParameters, ...rest } = props

  return (
    <div {...rest} className={cn('', className)}>
      <Tabs defaultValue="maat">
        <TabsList className="w-full justify-start rounded-none border-b border-stroke-100 px-8 *:py-3">
          <TabsTrigger variant="underline" value="maat">
            Maat Finance
          </TabsTrigger>
          <TabsTrigger variant="underline" value="incentives">
            Incentives
          </TabsTrigger>
        </TabsList>
        <TabsContent value="maat" className="mt-0">
          <MaatTransactionsHistory
            filters={maatFilters}
            eventParameters={eventParameters}
          />
        </TabsContent>
        <TabsContent value="incentives" className="mt-0">
          <IncentivesHistory filters={incentivesFilters} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
