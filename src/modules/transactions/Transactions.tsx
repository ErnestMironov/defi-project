import type { EventsParameters } from '@api/queries/useEvents'
import {
  SELECT_CHAINS,
  SELECT_LAST_EVENT_ACTIONS,
  SELECT_STATUSES,
} from '@constants/select-constant'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import type { ComponentProps } from 'react'

import { TransactionsHistoryDesktop } from './TransactionsHistoryDesktop'
import { TransactionsHistoryMobile } from './TransactionsHistoryMobile'

export interface EventsProperties extends ComponentProps<'div'> {
  withLink?: boolean
  parameters?: EventsParameters
}

export const Transactions = (props: EventsProperties) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <TransactionsHistoryMobile withLink {...props} />
  }
  return (
    <TransactionsHistoryDesktop
      filters={{
        search: { value: '', placeholder: 'Tx hash  / Address' },
        actions_type: {
          items: SELECT_LAST_EVENT_ACTIONS,
          value: [],
          placeholder: 'All Actions',
        },
        status: { items: SELECT_STATUSES, value: [], placeholder: 'All Status' },
        chain: { items: SELECT_CHAINS, value: [], placeholder: 'All Chains' },
      }}
      {...props}
    />
  )
}
