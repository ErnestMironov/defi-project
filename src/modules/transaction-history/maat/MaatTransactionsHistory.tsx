import type { EventsParameters } from '@api/queries/useEvents'
import type { TableFiltersType } from '@components/filters/TableFilters'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { TransactionsMobileWithFilters } from '@modules/transactions/TransactionsMobileWithFilters'
import type { ComponentProps } from 'react'

import { MaatTransactionsHistoryTable } from './MaatTransactionsHistoryTable'

interface TransactionsHistoryProperties extends ComponentProps<'div'> {
  filters: TableFiltersType
  eventParameters?: EventsParameters
}

export const MaatTransactionsHistory: React.FC<TransactionsHistoryProperties> = (
  props,
) => {
  const { filters, ...rest } = props
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <TransactionsMobileWithFilters {...rest} />
  }
  return <MaatTransactionsHistoryTable {...rest} filters={filters} />
}
