import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

export const TransactionInfoContainer = (props: ComponentProps<'div'>) => {
  const { className, children, ...rest } = props
  return (
    <BaseContainer
      className={cn(
        'lg:w-[62.5vw] divide-y divide-stroke-100 rounded-[1.75rem] max-lg:py-5 max-lg:px-4',
        className,
      )}
      {...rest}
    >
      {children}
    </BaseContainer>
  )
}
