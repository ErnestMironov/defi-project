import Card from '@assets/icons/card.svg'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

interface EmptyTransactionsTooltipProperties extends ComponentProps<'div'> {}

export const EmptyTransactionsTooltip = (props: EmptyTransactionsTooltipProperties) => {
  const { className, ...rest } = props
  return (
    <div
      className={cn(
        'py-4 px-3 rounded-xl bg-[rgba(97,_96,_255,_0.05)] text-text-80 flex items-start gap-[0.38rem]',
        className,
      )}
      {...rest}
    >
      <Card className="size-6" />
      <p className="text-semi-base/[1.3125rem]">
        Looks like you haven’t made any transactions yet
      </p>
    </div>
  )
}
