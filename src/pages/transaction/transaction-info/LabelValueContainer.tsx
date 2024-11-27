import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

export const LabelValueContainer = (props: ComponentProps<'div'>) => {
  const { className, children, ...rest } = props
  return (
    <div
      className={cn(
        'flex w-full items-center justify-between py-4 px-6 [&>div:first-child]:text-sm [&>div:first-child]:text-text-2100',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
