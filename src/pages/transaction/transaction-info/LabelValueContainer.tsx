import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

export const LabelValueContainer = (props: ComponentProps<'div'>) => {
  const { className, children, ...rest } = props
  return (
    <div
      className={cn(
        'flex w-full items-center justify-between rounded-xl border border-stroke-100 p-4 [&>div:first-child]:text-base [&>div:first-child]:text-gray-100',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
