import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

export const TransactionInfoContainer = (props: ComponentProps<'div'>) => {
  const { className, children, ...rest } = props
  return (
    <BaseContainer
      className={cn(
        'divide-y divide-stroke-100 rounded-[1.75rem] max-lg:rounded-[1rem] overflow-hidden',
        className,
      )}
      {...rest}
    >
      {children}
    </BaseContainer>
  )
}
