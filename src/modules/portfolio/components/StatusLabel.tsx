import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

interface StatusLabelProperties extends ComponentProps<'span'> {
  status: 'success' | 'in progress' | 'failed'
}

const STATUS_CLASSES = {
  success: 'text-main-100 bg-main-15',
  failed: 'text-red-100',
  inProgress: 'text-text-4100',
}

export const StatusLabel = ({ status, className, ...rest }: StatusLabelProperties) => {
  return (
    <span
      className={cn(
        'ml-2 p-1 px-2 rounded-xl',
        STATUS_CLASSES[status.replace(' ', '') as keyof typeof STATUS_CLASSES],
        className,
      )}
      {...rest}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
