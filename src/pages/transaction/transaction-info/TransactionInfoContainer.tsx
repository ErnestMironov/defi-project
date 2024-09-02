import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

export const TransactionInfoContainer = (props: ComponentProps<'div'>) => {
  const { className, children, ...rest } = props
  return (
    <div
      className={cn(
        'w-[62.5vw] rounded-[1.75rem] bg-cards [box-shadow:0px_3px_1px_0px_rgba(135,_99,_243,_0.12)] p-6',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
