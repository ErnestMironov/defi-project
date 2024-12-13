import type { Action } from '@api/maat-finance/types'
import { Skeleton } from '@components/ui/skeleton'
import { STATUS_COLOR } from '@constants/status-color'
import { ActionType, ActionTypeSkeleton } from '@modules/transactions/actions/ActionType'
import { StatusChip } from '@modules/transactions/status/StatusChip'
import { cn } from '@utils/cn'
import dayjs from 'dayjs'
import type { ComponentProps } from 'react'

import type { Tag } from './TransactionTags'
import { TransactionTags } from './TransactionTags'

interface TransactionInfoHeaderProperties extends ComponentProps<'div'> {
  tags: Tag[]
  action: Action
}

export const TransactionInfoHeader = (props: TransactionInfoHeaderProperties) => {
  const { className, action, tags, ...rest } = props
  const status = action?.status
  const date = action?.creation_time
  return (
    <>
      <div className="px-6 py-4 text-[2rem]/[3rem] text-text-260">
        {tags.includes('Trigger') ? 'Trigger' : 'Reaction'}
      </div>
      <div className={cn('px-[1.75rem] py-4', className)} {...rest}>
        <div className="flex w-full items-center justify-between">
          <ActionType tx={action} />
          <div className="flex items-center gap-2">
            <TransactionTags tags={tags} />
            <StatusChip tx={action} />
          </div>
        </div>
        <div className="mt-4 hidden items-center gap-3 text-base max-lg:flex">
          <span
            className="text-semi-base uppercase"
            style={{ color: STATUS_COLOR[status as keyof typeof STATUS_COLOR] }}
          >
            {status}
          </span>
          <span className="text-gray-50">|</span>
          <span className="text-text-2100">
            {dayjs(date).format('DD.MM.YYYY HH:mm:ss')}
          </span>
        </div>
        {/* {status === 'fail' && isBelowDesktop && (
        <div className={cn('mt-1 text-base', '')} style={{ color: '#FF4057' }}>
          Reason: Internal error
        </div>
      )} */}
      </div>
    </>
  )
}

export const TransactionInfoHeaderSkeleton = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
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
