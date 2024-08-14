import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

interface BaseContainerProperties extends ComponentProps<'div'> {}

export const BaseContainer = (props: BaseContainerProperties) => {
  const { className, children, ...rest } = props
  return (
    <div
      className={cn(
        'relative overflow-hidden [&>*:first-child]:text-gray-100 flex-col [&>*:first-child]:text-lg uppercase justify-center flex items-start gap-2 bg-cards px-8 py-12 [box-shadow:0px_3px_1px_0px_rgba(56,_118,_203,_0.20)] rounded-lg',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
