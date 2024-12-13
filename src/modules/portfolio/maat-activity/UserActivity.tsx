/* eslint-disable react/jsx-no-useless-fragment */
import type { Event } from '@api/maat-finance/types'
import { usePortfolioTransactions } from '@api/maat-finance/usePortfolioTransactions'
import { useTransactionStore } from '@modules/transaction-block/store/usePendingTransactionsStore'
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
  const { transactions } = useTransactionStore()

  const pendingTransactions = transactions.map(
    (tx) =>
      ({
        status:
          tx.status === 'pending'
            ? 'in progress'
            : tx.status === 'error'
            ? 'failed'
            : tx.status,
        hash: tx.transactionHash,
        action_type: tx.txType?.toUpperCase(),
        amount: Number(tx.inputValue),
        vault: {
          token: {
            symbol: tx.vault,
            decimals: tx.mtToken?.decimals || 6,
          },
        },
        creation_time: tx.timestamp?.toString(),
        src_chain_id: tx.mtToken?.chainData?.chainId,
        intention_id: tx.transactionHash,
        dst_chain_id: tx.mtToken?.chainData?.chainId,
        volume: Number(tx.inputValue),
      }) as Event,
  )

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

  const allPendingTransactions = [
    ...pendingTransactions,
    ...(filteredByStatusData?.pending || []),
  ].sort((a, b) => Number(b.creation_time) - Number(a.creation_time))

  if (isLoading || error)
    return (
      <div className={cn('space-y-6 px-6 py-4', className)} {...rest}>
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
      {(!!filteredByStatusData?.pending.length || pendingTransactions.length > 0) && (
        <>
          <div className={cn('space-y-6 mt-5 overflow-y-auto -mr-2 pr-2 px-6')}>
            {allPendingTransactions.map((event, i) => (
              <UserTransactionItem key={i} event={event} />
            ))}
          </div>
        </>
      )}
      {!!filteredByStatusData?.completed.length && (
        <>
          <div
            className={cn(
              'space-y-6 mt-5 mb-5 overflow-y-auto -mr-2 pr-2 user-activity  px-6 max-md:px-3 max-md:-mr-0',
            )}
          >
            {filteredByStatusData?.completed.map((event, i) => (
              <UserTransactionItem key={i} event={event} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
