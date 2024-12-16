import type { Action } from '@api/maat-finance/types'
import { Skeleton } from '@components/ui/skeleton'
import type { LAST_EVENT_ACTION } from '@constants/action-type'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import { LabelValueContainer } from './LabelValueContainer'
import { TransactionInfoHeaderSkeleton } from './transaction-info-header/TransactionInfoHeader'
import { Bridge } from './transaction-type/Bridge'
import { Deposit } from './transaction-type/Deposit'
import { DepositToStrategy } from './transaction-type/DepositToStrategy'
import { RebalanceRequest } from './transaction-type/RebalanceRequest'
import { Swap } from './transaction-type/Swap'
import { WithdrawFromStrategy } from './transaction-type/WithdrawFromStrategy'
import { WithdrawFulfillment } from './transaction-type/WithdrawFulfillment'
import { WithdrawRequest } from './transaction-type/WithdrawRequest'
import { TransactionInfoContainer } from './TransactionInfoContainer'

interface TransactionInfoProperties extends ComponentProps<'div'> {
  type?: LAST_EVENT_ACTION
  data?: Action
  withoutRelated?: boolean
}

export const TransactionInfo = (props: TransactionInfoProperties) => {
  const { className, type, data, withoutRelated, ...rest } = props

  if (type === 'DEPOSIT') {
    return (
      <Deposit
        className={className}
        data={data}
        withoutRelated={withoutRelated}
        {...rest}
      />
    )
  }
  if (type === 'INC_SWAP') {
    return (
      <Swap className={className} data={data} withoutRelated={withoutRelated} {...rest} />
    )
  }
  if (type === 'BRIDGE') {
    return (
      <Bridge
        className={className}
        data={data}
        withoutRelated={withoutRelated}
        {...rest}
      />
    )
  }
  if (type === 'WITHDRAW_REQUEST') {
    return (
      <WithdrawRequest
        className={className}
        data={data}
        withoutRelated={withoutRelated}
        {...rest}
      />
    )
  }
  if (type === 'WITHDRAW_FROM_STRATEGY') {
    return (
      <WithdrawFromStrategy
        className={className}
        data={data}
        withoutRelated={withoutRelated}
        {...rest}
      />
    )
  }
  if (type === 'WITHDRAW_FULFILLMENT') {
    return (
      <WithdrawFulfillment
        className={className}
        data={data}
        withoutRelated={withoutRelated}
        {...rest}
      />
    )
  }
  if (type === 'REBALANCE_REQUEST') {
    return (
      <RebalanceRequest
        className={className}
        data={data}
        withoutRelated={withoutRelated}
        {...rest}
      />
    )
  }
  if (type === 'DEPOSIT_IN_STRATEGY') {
    return (
      <DepositToStrategy
        className={className}
        data={data}
        withoutRelated={withoutRelated}
        {...rest}
      />
    )
  }
  return <></>
}

export const TransactionInfoSkeletonDesktop = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  return (
    <TransactionInfoContainer className={className} {...rest}>
      <TransactionInfoHeaderSkeleton variant="desktop" />
      <div
        className={cn(
          'grid grid-cols-6',
          '*:col-span-3 border-t border-stroke-100 [&>*:nth-child(odd)]:border-r [&>*:nth-child(odd)]:border-stroke-100 [&>*]:border-b',
        )}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <LabelValueContainer key={index}>
            <Skeleton className="h-[1.8rem] w-40" />
            <Skeleton className="h-[1.8rem] w-40" />
          </LabelValueContainer>
        ))}
      </div>
    </TransactionInfoContainer>
  )
}
export const TransactionInfoSkeletonMobile = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  return (
    <TransactionInfoContainer className={className} {...rest}>
      <TransactionInfoHeaderSkeleton variant="mobile" />
      <div
        className={cn(
          'grid grid-cols-2',
          'border-t border-stroke-100 [&>*:nth-child(odd)]:border-r [&>*:nth-child(odd)]:border-stroke-100 [&>*]:border-b',
        )}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <LabelValueContainer key={index} className="[&>div]:last-of-type:w-40">
            <Skeleton className="h-[1.4rem] w-24" />
            <Skeleton className="h-[1.4rem] w-24" />
          </LabelValueContainer>
        ))}
      </div>
    </TransactionInfoContainer>
  )
}
