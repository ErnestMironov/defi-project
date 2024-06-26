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
      layoutId="tx-type-switcher"
      tabs={TABS}
      activeTab={txType}
      onTabChange={(value) => setTxType(value as TxType)}
      classNames={{
        tab: 'w-[9.125rem] max-lg:w-1/2 max-lg:py-[0.62rem] max-lg:text-base',
        container: 'max-lg:w-full max-lg:p-1',
      }}
    />
  )
}
