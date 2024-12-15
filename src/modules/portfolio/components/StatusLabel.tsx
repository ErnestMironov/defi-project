import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

interface StatusLabelProperties extends ComponentProps<'span'> {
  status: 'success' | 'in progress' | 'failed'
}

const STATUS_CLASSES = {
  success: 'text-main-100 bg-main-15',
  failed: 'text-red-100 bg-red-15',
  inProgress: 'text-text-4100 bg-text-15',
}

export const StatusLabel = ({ status, className, ...rest }: StatusLabelProperties) => {
  return (
    <span
      className={cn(
        'ml-2 p-1 px-2 rounded-xl flex items-center gap-2 max-lg:text-sm',
        STATUS_CLASSES[status.replace(' ', '') as keyof typeof STATUS_CLASSES],
        className,
      )}
      {...rest}
    >
      {status === 'in progress' ? (
        <div className="size-6 animate-spin rounded-full border-2 border-main-100 border-t-transparent" />
      ) : (
        status.charAt(0).toUpperCase() + status.slice(1)
      )}
    </span>
  )
}
