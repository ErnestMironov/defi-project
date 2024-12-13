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
  isLoading?: boolean
}

export const TransactionInfo = (props: TransactionInfoProperties) => {
  const { className, type, data, withoutRelated, isLoading, ...rest } = props

  if (isLoading) {
    return <TransactionInfoSkeleton />
  }

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

const TransactionInfoSkeleton = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  return (
    <TransactionInfoContainer className={className} {...rest}>
      <TransactionInfoHeaderSkeleton />
      <div
        className={cn(
          'grid grid-cols-6 max-lg:grid-cols-1 max-lg:gap-[0.38rem]',
          '*:col-span-3 border-t border-stroke-100 [&>*:nth-child(odd)]:border-r [&>*:nth-child(odd)]:border-stroke-100 [&>*]:border-b',
        )}
      >
        <LabelValueContainer>
          <Skeleton className="h-[1.8rem] w-40" />
          <Skeleton className="h-[1.8rem] w-40" />
        </LabelValueContainer>
        <LabelValueContainer>
          <Skeleton className="h-[1.8rem] w-40" />
          <Skeleton className="h-[1.8rem] w-40" />
        </LabelValueContainer>
        <LabelValueContainer>
          <Skeleton className="h-[1.8rem] w-40" />
          <Skeleton className="h-[1.8rem] w-40" />
        </LabelValueContainer>
        <LabelValueContainer>
          <Skeleton className="h-[1.8rem] w-40" />
          <Skeleton className="h-[1.8rem] w-40" />
        </LabelValueContainer>
        <LabelValueContainer>
          <Skeleton className="h-[1.8rem] w-40" />
          <Skeleton className="h-[1.8rem] w-40" />
        </LabelValueContainer>
        <LabelValueContainer>
          <Skeleton className="h-[1.8rem] w-40" />
          <Skeleton className="h-[1.8rem] w-40" />
        </LabelValueContainer>
      </div>
    </TransactionInfoContainer>
  )
}
