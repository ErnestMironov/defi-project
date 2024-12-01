import ArrowUp from '@assets/icons/arrow-up.svg'
import { ShadowBox } from '@components/box/ShadowBox'
import { TokenIconComponent } from '@components/token-icon'
import { cn } from '@utils/cn'
import type { ComponentProps, ReactNode } from 'react'

interface SelectProperties extends ComponentProps<'div'> {
  symbol?: string
  value: string
  opened?: boolean
  icon?: ReactNode
  className?: string
  disabled?: boolean
}

export const ChoiceBox = ({
  symbol,
  value,
  opened,
  icon,
  className,
  disabled,
}: SelectProperties) => {
  return (
    <ShadowBox
      className={cn(
        'inline-flex cursor-pointer items-center justify-between gap-2 rounded-[62.4375rem] px-4 transition-shadow py-[1.25rem]',
        className,
        disabled && 'cursor-default',
      )}
    >
      {icon ||
        (symbol && (
          <TokenIconComponent symbol={symbol} className="size-8 max-lg:size-5" />
        ))}
      <div className="whitespace-nowrap leading-none">{value}</div>
      {!disabled && (
        <ArrowUp
          className={cn(
            'size-4 max-lg:size-3 transition group-data-[state="closed"]:rotate-180',
            !opened && 'rotate-180',
          )}
        />
      )}
    </ShadowBox>
  )
}
