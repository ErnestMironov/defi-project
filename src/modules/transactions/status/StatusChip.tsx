import type { Event } from '@api/maat-finance/types'
import { STATUS_COLOR } from '@constants/status-color'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

interface StatusChipProperties extends ComponentProps<'div'> {
  tx: Event
}

export const StatusChip = (props: StatusChipProperties) => {
  const { className, tx, ...rest } = props

  const isFailedRebalance =
    tx.action_type === 'REBALANCE_REQUEST' && tx.status === 'failed'

  const color = isFailedRebalance
    ? STATUS_COLOR.skip
    : STATUS_COLOR[tx.status as keyof typeof STATUS_COLOR]

  const text = isFailedRebalance ? 'skip' : tx.status

  return (
    <div
      className={cn('text-sm/[1rem] relative w-fit py-1 px-2 capitalize', className)}
      style={{ color }}
      {...rest}
    >
      <div
        className="absolute inset-0 size-full rounded-md opacity-15"
        style={{ backgroundColor: color }}
      />
      {text}
    </div>
  )
}
