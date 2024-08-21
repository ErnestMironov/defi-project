import type { TableFiltersType } from '@components/filters/TableFilters'
import useDeviceWidth from '@hooks/useDeviceWidth'
import type { ComponentProps } from 'react'

import { TransactionsHistoryDesktop } from './TransactionsHistoryDesktop'
import { TransactionsHistoryMobile } from './TransactionsHistoryMobile'

export interface EventsProperties extends ComponentProps<'div'> {
  filters: TableFiltersType
}

export const Events = (props: EventsProperties) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <TransactionsHistoryMobile {...props} />
  }
  return <TransactionsHistoryDesktop {...props} />
}
