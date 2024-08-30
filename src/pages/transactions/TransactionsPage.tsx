import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { Footer } from '@layouts/footer/Footer'
import { Transactions } from '@modules/transactions/Transactions'
import { TransactionsHistoryMobile } from '@modules/transactions/TransactionsHistoryMobile'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import { Breadcrumbs } from './Breadcrumbs'
import { SystemActions, SystemActionsMobile } from './system-actions/SystemActions'

interface TransactionsPageProperties extends ComponentProps<'div'> {}

export const TransactionsPage = (props: TransactionsPageProperties) => {
  const { className, ...rest } = props
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <TransactionsPageMobile {...props} />
  }
  return (
    <div className={cn('mt-[4.5rem]', className)} {...rest}>
      <Breadcrumbs />
      <Transactions className="mt-10 max-lg:mt-14" />
      <SystemActions className="mt-[6.25rem]" />
      <Footer className="mt-[7.5rem]" />
    </div>
  )
}

const TransactionsPageMobile = (props: TransactionsPageProperties) => {
  const { className, ...rest } = props
  return (
    <div className={cn('mt-8', className)} {...rest}>
      <TransactionsHistoryMobile />
      <SystemActionsMobile className="mt-16" />
      <Footer className="mt-[7.5rem]" />
    </div>
  )
}
