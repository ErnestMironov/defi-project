import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

export const Status = {
  success: { label: 'Success', color: '#79DEC2' },
  fail: { label: 'Failed', color: '#FF4057' },
  'in-progress': { label: 'In Progress', color: '#6A97FF' },
} as const

export type StatusType = keyof typeof Status

interface StatusLabelProperties extends ComponentProps<'span'> {
  status: StatusType
}

export const StatusLabel = (props: StatusLabelProperties) => {
  const { className, status, ...rest } = props
  const { label, color } = Status[status]
  return (
    <span className={cn('', className)} style={{ color }} {...rest}>
      {label}
    </span>
  )
}
