import { AnimatedTabs } from '@components/tab/AnimatedTabs'
import type { TxType } from '@constants/txTypes'
import { TX_TYPE } from '@constants/txTypes'
import type { ComponentProps } from 'react'

import { useDepositStore } from './store/useDepositStore'

interface TxTypeSwitcherProperties extends ComponentProps<'div'> {}

const TABS = [
  { id: TX_TYPE.DEPOSIT, label: 'Deposit' },
  { id: TX_TYPE.WITHDRAW, label: 'Withdraw' },
]

export const TxTypeSwitcher = (props: TxTypeSwitcherProperties) => {
  const { txType, setTxType } = useDepositStore()
  return (
    <AnimatedTabs
      {...props}
      tabs={TABS}
      activeTab={txType}
      onTabChange={(value) => setTxType(value as TxType)}
    />
  )
}
