/* eslint-disable react/jsx-no-useless-fragment */
import type { Event } from '@api/maat-finance/types'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import {
  SkeletonTransactionMobileItem,
  TransactionMobileItem,
} from './TransactionMobileItem'

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
              <SkeletonTransactionMobileItem key={i} />
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
