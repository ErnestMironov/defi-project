import { useGetTransactionInfo } from '@api/maat-finance/useGetTransactionInfo'
import { SectionTitle } from '@components/section/SectionTitle'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { Footer } from '@layouts/footer/Footer'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { useParams } from 'react-router-dom'
import type { Address } from 'viem'

import { Breadcrumbs } from './Breadcrumbs'
import { TransactionInfo } from './transaction-info/TransactionInfo'
import { TransactionHeader } from './TransactionHeader'

export const TransactionPage = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  const { isBelowDesktop } = useDeviceWidth()
  const { tx_hash } = useParams()
  const { data } = useGetTransactionInfo(tx_hash as Address)

  if (isBelowDesktop) {
    return <TransactionPageMobile {...props} />
  }
  return (
    <div className={cn('mt-[4.5rem]', className)} {...rest}>
      <Breadcrumbs />
      <TransactionHeader className="mt-10" />
      <TransactionInfo
        className="mt-10"
        type={data?.action?.action_type}
        data={data?.action}
      />
      <SectionTitle className="mt-[4.44rem]">Triggered transactions</SectionTitle>
      <div className="mt-8 space-y-4">
        {data?.related_actions.map((action, i) => (
          <TransactionInfo key={i} type={action.action_type} data={action} />
        ))}
      </div>
      <Footer className="mt-[7.5rem]" />
    </div>
  )
}

export const TransactionPageMobile = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  const { tx_hash } = useParams()
  const { data } = useGetTransactionInfo(tx_hash as Address)

  return (
    <div className={cn('mt-8', className)} {...rest}>
      <TransactionHeader />
      <TransactionInfo
        className="mt-6"
        type={data?.action?.action_type}
        data={data?.action}
      />
      <SectionTitle className="mt-10">Triggered transactions</SectionTitle>
      <div className="mt-6 space-y-3">
        {data?.related_actions.map((action, i) => (
          <TransactionInfo key={i} type={action.action_type} data={action} />
        ))}
      </div>
      <Footer className="mt-[5.5rem]" />
    </div>
  )
}
