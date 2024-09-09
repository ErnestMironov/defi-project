import { ArrowLink } from '@components/link/ArrowLink'
import { SectionTitle } from '@components/section/SectionTitle'
import { cn } from '@utils/cn'

import type { EventsProperties } from './Transactions'
import { TransactionsMobileWithFilters } from './TransactionsMobileWithFilters'

export const TransactionsHistoryMobile = (props: EventsProperties) => {
  const { withLink, className, parameters } = props

  return (
    <div {...props} className={cn('flex flex-col', className)}>
      <div className="flex items-center justify-between">
        <SectionTitle>Events</SectionTitle>
        {withLink && <ArrowLink to="/transactions" />}
      </div>
      <TransactionsMobileWithFilters className="mt-4" parameters={parameters} />
    </div>
  )
}
