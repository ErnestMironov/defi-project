import { EmptyTransactionsTooltip } from '@components/tooltip/EmptyTransactionsTooltip'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

interface EmptyTransactionsStateProperties extends ComponentProps<'div'> {}

export const EmptyTransactionsState = (props: EmptyTransactionsStateProperties) => {
  const { className, ...rest } = props
  return (
    <div className={cn('', className)} {...rest}>
      <EmptyTransactionsTooltip className="mt-6" />
    </div>
  )
}
