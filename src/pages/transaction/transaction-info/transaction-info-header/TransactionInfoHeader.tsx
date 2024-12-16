import type { Action } from '@api/maat-finance/types'
import { Skeleton } from '@components/ui/skeleton'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import {
  ActionTypeComponent,
  ActionTypeSkeleton,
} from '@modules/transactions/actions/ActionType'
import { StatusChip } from '@modules/transactions/status/StatusChip'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import { ChainChip } from './ChainChip'
import { TransactionOptions } from './TransactionOptions'
import type { Tag } from './TransactionTags'
import { TransactionTags } from './TransactionTags'

interface TransactionInfoHeaderProperties extends ComponentProps<'div'> {
  tags: Tag[]
  action: Action
}

export const TransactionInfoHeader = (props: TransactionInfoHeaderProperties) => {
  const { isBelowDesktop } = useDeviceWidth()
  return isBelowDesktop ? (
    <TransactionInfoHeaderMobile {...props} />
  ) : (
    <TransactionInfoHeaderDesktop {...props} />
  )
}
export const TransactionInfoHeaderDesktop = (props: TransactionInfoHeaderProperties) => {
  const { className, action, tags, ...rest } = props
  return (
    <>
      <div className="px-6 py-4 text-[2rem]/[3rem] text-text-260">
        {tags.includes('Trigger') ? 'Trigger' : 'Reaction'}
      </div>
      <div className={cn('px-[1.75rem] py-4', className)} {...rest}>
        <div className="flex w-full items-center justify-between">
          <ActionTypeComponent tx={action} />
          <div className="flex items-center gap-2">
            <TransactionTags tags={tags} />
            <StatusChip tx={action} />
          </div>
        </div>
      </div>
    </>
  )
}

export const TransactionInfoHeaderMobile = (props: TransactionInfoHeaderProperties) => {
  const { className, action, tags, ...rest } = props
  return (
    <>
      <div className="px-4 py-[0.38rem] text-sm text-text-260">
        {tags.includes('Trigger') ? 'Trigger' : 'Reaction'}
      </div>
      <div className={cn('px-4 py-3', className)} {...rest}>
        <div className="flex w-full items-center justify-between">
          <ActionTypeComponent tx={action} withTxHash={false} />
          <TransactionOptions
            chainId={action?.src_chain_id}
            txHash={action?.hash}
            address={action?.txFrom}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 px-4 py-3">
        <ChainChip chainId={action?.src_chain_id} className="lg:hidden" />
        <TransactionTags tags={tags} />
        <StatusChip tx={action} />
      </div>
    </>
  )
}

export const TransactionInfoHeaderSkeleton = (
  props: ComponentProps<'div'> & { variant: 'mobile' | 'desktop' },
) => {
  const { className, variant, ...rest } = props
  if (variant === 'mobile') {
    return (
      <>
        <div className="px-4 py-3 text-[2rem]/[3rem] text-text-260">
          <Skeleton className="h-4 w-28" />
        </div>
        <div className={cn('px-[1.75rem] py-4', className)} {...rest}>
          <div className="flex w-full items-center justify-between">
            <ActionTypeSkeleton />
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-6 w-20 rounded-md" />
          ))}
        </div>
      </>
    )
  }
  return (
    <>
      <div className="px-6 py-5 text-[2rem]/[3rem] text-text-260">
        <Skeleton className="h-8 w-40" />
      </div>
      <div className={cn('px-[1.75rem] py-4', className)} {...rest}>
        <div className="flex w-full items-center justify-between">
          <ActionTypeSkeleton />
          <div className="flex items-center gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-6 w-20 rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
