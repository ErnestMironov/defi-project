import type { EventsParameters } from '@api/queries/useEvents'
import {
  SELECT_CHAINS,
  SELECT_LAST_EVENT_ACTIONS,
  SELECT_STATUSES,
  SELECT_TOKENS,
} from '@constants/select-constant'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { MaatTransactionsHistoryTable } from '@modules/transaction-history/maat/MaatTransactionsHistoryTable'
import { TransactionsMobileWithFilters } from '@modules/transactions/TransactionsMobileWithFilters'
import type { ComponentProps } from 'react'

interface TransactionsHistoryProperties extends ComponentProps<'div'> {
  eventParameters?: EventsParameters
}

export const MaatTransactionsHistory: React.FC<TransactionsHistoryProperties> = (
  props,
) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <TransactionsMobileWithFilters {...props} />
  }
  return (
    <MaatTransactionsHistoryTable
      {...props}
      filters={{
        search: { value: '', placeholder: 'Tx Hash' },
        actions_type: {
          items: SELECT_LAST_EVENT_ACTIONS,
          value: [],
          placeholder: 'All Actions',
        },
        status: { items: SELECT_STATUSES, value: [], placeholder: 'All Status' },
        token: { items: SELECT_TOKENS, value: [], placeholder: 'All Tokens' },
        chain: { items: SELECT_CHAINS, value: [], placeholder: 'All Chains' },
      }}
    />
  )
}
