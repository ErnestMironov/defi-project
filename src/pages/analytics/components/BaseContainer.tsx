import { cn } from '@utils/cn'
import { type ComponentProps, forwardRef } from 'react'

interface BaseContainerProperties extends ComponentProps<'div'> {}

export const BaseContainer = forwardRef<HTMLDivElement, BaseContainerProperties>(
  (props, reference) => {
    const { className, children, ...rest } = props
    return (
      <div
        ref={reference}
        className={cn(
          'relative border border-stroke-100 bg-cards-widget shadow-test-2 rounded-[1.5rem]',
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    )
  },
)
