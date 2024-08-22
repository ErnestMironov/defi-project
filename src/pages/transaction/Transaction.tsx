import { SectionTitle } from '@components/section/SectionTitle'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import { Breadcrumbs } from './Breadcrumbs'
import type { TransactionType } from './transaction-info/TransactionInfo'
import { TransactionInfo } from './transaction-info/TransactionInfo'
import { TransactionHeader } from './TransactionHeader'

const triggeredTransactions: TransactionType[] = ['Bridge', 'Deposit to Strategy', 'Swap']

export const Transaction = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props

  return (
    <div className={cn('mt-[4.5rem]', className)} {...rest}>
      <Breadcrumbs />
      <TransactionHeader className="mt-10" />
      <TransactionInfo className="mt-10" type="Deposit" />
      <SectionTitle className="mt-[4.44rem]">Triggered transactions</SectionTitle>
      <div className="mt-8 space-y-4">
        {triggeredTransactions.map((type) => (
          <TransactionInfo className="mt-10" type={type} />
        ))}
      </div>
    </div>
  )
}
