/* eslint-disable react/jsx-no-useless-fragment */
import type { Event } from '@api/maat-finance/types'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import { TransactionMobileItem } from './TransactionMobileItem'

interface TransactionsMobileListProperties extends ComponentProps<'div'> {
  events?: Event[]
  loading?: boolean
  error?: any
}

export const TransactionsMobileList = (props: TransactionsMobileListProperties) => {
  const { className, events, loading, error, ...rest } = props

  const renderBody = () => {
    switch (true) {
      case loading:
      case !!error: {
        return (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonStrategyMobileCard key={i} />
            ))}
          </>
        )
      }
      default: {
        if (!events || !events?.length) {
          return <div className="text-center text-gray-500">No transactions found</div>
        }
        return (
          <>
            {events?.map((event, index) => (
              <TransactionMobileItem key={index} event={event} />
            ))}
          </>
        )
      }
    }
  }

  return (
    <div
      className={cn(
        'rounded-3xl bg-cards px-5 py-6 [&>*:not(:first-child)]:pt-6 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-gray-50 [&>*:not(:last-child)]:pb-6',
        className,
      )}
      {...rest}
    >
      {renderBody()}
    </div>
  )
}

const SkeletonStrategyMobileCard = (props: ComponentProps<'div'>) => {
  const { ...rest } = props

  return (
    <div {...rest}>
      <div className="flex items-center gap-3">
        <Skeleton className="size-6 rounded-full" />
        <Skeleton className="h-6 w-20 text-lg" />
      </div>
      <div className="mt-4 grid w-full grid-cols-[1fr_0fr] justify-between gap-y-[0.82rem] even:[&>*]:justify-self-end [&_h6]:text-base [&_h6]:leading-normal">
        <h6>Chain | Protocol</h6>
        <div className="flex items-center space-x-[-0.44rem]">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="size-6 rounded-full" />
        </div>
        <h6>Projected APY</h6>
        <Skeleton className="h-6 w-20 text-lg" />
        <h6>TVL</h6>
        <Skeleton className="h-6 w-20 text-lg" />
      </div>
    </div>
  )
}
