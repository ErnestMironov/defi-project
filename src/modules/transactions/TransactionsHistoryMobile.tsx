import { cn } from '@utils/cn'

import type { EventsProperties } from './Transactions'
import { TransactionsMobileWithFilters } from './TransactionsMobileWithFilters'

export const TransactionsHistoryMobile = (props: EventsProperties) => {
  const { className, parameters } = props

  return (
    <div {...props} className={cn('flex flex-col', className)}>
      <TransactionsMobileWithFilters
        parameters={parameters}
        filters={['actions', 'statuses', 'chains']}
      />
    </div>
  )
}
