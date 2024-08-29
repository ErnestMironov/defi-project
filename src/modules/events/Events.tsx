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

export const Events = (props: EventsProperties) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <TransactionsHistoryMobile withLink {...props} />
  }
  return (
    <TransactionsHistoryDesktop
      filters={{
        search: { value: '', placeholder: 'Tx hash  / Address' },
        action: { items: SELECT_ACTIONS, value: SELECT_ACTIONS[0] },
        status: { items: SELECT_STATUSES, value: SELECT_STATUSES[0] },
        chain: { items: SELECT_CHAINS, value: SELECT_CHAINS[0] },
      }}
      {...props}
    />
  )
}
