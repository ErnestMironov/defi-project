import useDeviceWidth from '@hooks/useDeviceWidth'

import { TransactionsHistoryDesktop } from './TransactionsHistoryDesktop'
import { TransactionsHistoryMobile } from './TransactionsHistoryMobile'

export const TransactionsHistory: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props,
) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <TransactionsHistoryMobile {...props} />
  }
  return <TransactionsHistoryDesktop {...props} />
}
