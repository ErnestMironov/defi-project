import {
  SELECT_ACTIONS,
  SELECT_CHAINS,
  SELECT_STATUSES,
} from '@constants/select-constant'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import type { ComponentProps } from 'react'

import { TransactionsHistoryDesktop } from './TransactionsHistoryDesktop'
import { TransactionsHistoryMobile } from './TransactionsHistoryMobile'

export interface EventsProperties extends ComponentProps<'div'> {
  withLink?: boolean
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
        action: { items: SELECT_ACTIONS, value: [], placeholder: 'All Actions' },
        status: { items: SELECT_STATUSES, value: [], placeholder: 'All Statuses' },
        chain: { items: SELECT_CHAINS, value: [], placeholder: 'All Chains' },
      }}
      {...props}
    />
  )
}
