import type { StatusType } from '@api/maat-finance/types'
import { STATUS_COLOR } from '@constants/status-color'
import { cn } from '@utils/cn'
import dayjs from 'dayjs'
import type { ComponentProps } from 'react'

import { TransactionInfoTitle } from './TransactionInfoTitle'
import type { Tag } from './TransactionTags'
import { TransactionTags } from './TransactionTags'

interface TransactionInfoHeaderProperties extends ComponentProps<'div'> {
  title: string
  tags: Tag[]
  status: StatusType
  date: string
}

export const TransactionInfoHeader = (props: TransactionInfoHeaderProperties) => {
  const { className, title, tags, status, date, ...rest } = props
  return (
    <div className={cn('', className)} {...rest}>
      <div className="flex w-full items-center justify-between">
        <TransactionInfoTitle title={title} />
        <TransactionTags tags={tags} />
      </div>
      <div className="mt-4 hidden items-center gap-3 text-base max-lg:flex">
        <span
          className="text-semi-base uppercase"
          style={{ color: STATUS_COLOR[status as keyof typeof STATUS_COLOR] }}
        >
          {status}
        </span>
        <span className="text-gray-50">|</span>
        <span className="text-gray-100">{dayjs(date).format('DD.MM.YYYY HH:mm:ss')}</span>
      </div>
      {/* {status === 'fail' && isBelowDesktop && (
        <div className={cn('mt-1 text-base', '')} style={{ color: '#FF4057' }}>
          Reason: Internal error
        </div>
      )} */}
    </div>
  )
}
