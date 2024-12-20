import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

interface StatusLabelProperties extends ComponentProps<'div'> {
  status: 'success' | 'in progress' | 'failed'
}

const STATUS_CLASSES = {
  success: 'text-main-100 bg-main-15',
  failed: 'text-red-100 bg-red-15',
  inProgress: 'text-text-4100 bg-text-15',
}

export const StatusLabel = ({ status, className, ...rest }: StatusLabelProperties) => {
  return (
    <div
      className={cn(
        'ml-2 p-1 w-[4.875rem] px-2 text-center rounded-xl flex items-center justify-center gap-2 max-lg:text-sm',
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
    </div>
  )
}
