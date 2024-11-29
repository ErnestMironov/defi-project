/* eslint-disable react/jsx-no-useless-fragment */
import type { Event } from '@api/maat-finance/types'
import { usePortfolioTransactions } from '@api/maat-finance/usePortfolioTransactions'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import type { Address } from 'viem'
import { useAccount } from 'wagmi'

import { EmptyTransactionsState } from './EmptyTransactionsState'
import { UserTransactionItem, UserTransactionItemSkeleton } from './UserTransactionItem'

interface UserActivityProperties extends ComponentProps<'div'> {}

export const UserActivity = (props: UserActivityProperties) => {
  const { className, ...rest } = props
  const { address } = useAccount()
  const { data, isLoading, error } = usePortfolioTransactions(address as Address, {})

  const filteredByStatusData = data?.reduce(
    (accumulator, event) => {
      if (event.status === 'in progress') {
        accumulator.pending.push(event)
      } else {
        accumulator.completed.push(event)
      }
      return accumulator
    },
    { completed: [], pending: [] } as { [key: string]: Event[] },
  )

  if (isLoading || error)
    return (
      <div className={cn('space-y-6', className)} {...rest}>
        {Array.from({ length: 6 }).map((_, i) => (
          <UserTransactionItemSkeleton key={i} />
        ))}
      </div>
    )

  if (data?.length === 0) {
    return <EmptyTransactionsState />
  }

  return (
    <div {...rest} className={cn(className)}>
      {!!filteredByStatusData?.pending.length && (
        <>
          <h6 className="text-base text-gray-100">In Progress</h6>
          <div className={cn('space-y-6 mt-5 overflow-y-auto -mr-2 pr-2')}>
            {filteredByStatusData?.pending.map((event, i) => (
              <UserTransactionItem key={i} event={event} />
            ))}
          </div>
        </>
      )}
      {!!filteredByStatusData?.completed.length && (
        <>
          <div className={cn('space-y-6 mt-5 overflow-y-auto -mr-2 pr-2 user-activity')}>
            {filteredByStatusData?.completed.map((event, i) => (
              <UserTransactionItem key={i} event={event} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
