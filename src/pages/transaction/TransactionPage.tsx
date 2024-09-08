import { SectionTitle } from '@components/section/SectionTitle'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { Footer } from '@layouts/footer/Footer'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import { Breadcrumbs } from './Breadcrumbs'
import type { TransactionType } from './transaction-info/TransactionInfo'
import { TransactionInfo } from './transaction-info/TransactionInfo'
import { TransactionHeader } from './TransactionHeader'

const triggeredTransactions: TransactionType[] = [
  'Bridge',
  'Deposit to Strategy',
  'Swap',
  'Withdraw from Strategy',
]

export const TransactionPage = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  const { isBelowDesktop } = useDeviceWidth()
  // const { intention_id } = useParams()
  // const { data } = useRelatedActions(intention_id)
  // console.log(data)

  if (isBelowDesktop) {
    return <TransactionPageMobile {...props} />
  }
  return (
    <div className={cn('mt-[4.5rem]', className)} {...rest}>
      <Breadcrumbs />
      <TransactionHeader className="mt-10" />
      <TransactionInfo className="mt-10" type="Deposit" />
      <SectionTitle className="mt-[4.44rem]">Triggered transactions</SectionTitle>
      <div className="mt-8 space-y-4">
        {triggeredTransactions.map((type, i) => (
          <TransactionInfo key={i} type={type} />
        ))}
      </div>
      <Footer className="mt-[7.5rem]" />
    </div>
  )
}

export const TransactionPageMobile = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  return (
    <div className={cn('mt-8', className)} {...rest}>
      <TransactionHeader />
      <TransactionInfo className="mt-6" type="Deposit" />
      <SectionTitle className="mt-10">Triggered transactions</SectionTitle>
      <div className="mt-6 space-y-3">
        {triggeredTransactions.map((type, i) => (
          <TransactionInfo key={i} type={type} />
        ))}
      </div>
      <Footer className="mt-[5.5rem]" />
    </div>
  )
}
