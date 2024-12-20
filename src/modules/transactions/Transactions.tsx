import type { EventsParameters } from '@api/maat-finance/useEvents'
import ActionIcon from '@assets/icons/action.svg'
import ChainIcon from '@assets/icons/chain.svg'
import StatusIcon from '@assets/icons/status.svg'
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
  parameters?: EventsParameters
}

export const Transactions = (props: EventsProperties) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <TransactionsHistoryMobile {...props} />
  }
  return (
    <TransactionsHistoryDesktop
      filters={{
        search: { value: '', placeholder: 'Tx hash  / Address' },
        chain: {
          items: SELECT_CHAINS,
          value: [],
          placeholder: 'All Chains',
          icon: <ChainIcon />,
        },
        status: {
          items: SELECT_STATUSES,
          value: [],
          placeholder: 'Every Status',
          icon: <StatusIcon />,
        },
        actions_type: {
          items: SELECT_LAST_EVENT_ACTIONS,
          value: [],
          placeholder: 'All Actions',
          icon: <ActionIcon />,
        },
      }}
      {...props}
    />
  )
}
