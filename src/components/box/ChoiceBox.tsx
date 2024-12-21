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
        'inline-flex cursor-pointer items-center justify-between gap-2 max-lg:gap-1 rounded-[62.4375rem] py-[0.62rem] px-[0.75rem] max-lg:py-[1rem] max-lg:px-[1.25rem] transition-shadow',
        className,
        disabled && 'cursor-default',
      )}
    >
      {icon ||
        (symbol && (
          <TokenIconComponent symbol={symbol} className="size-8 max-lg:size-5" />
        ))}
      <div className="whitespace-nowrap leading-none max-lg:text-[0.8125rem] max-lg:leading-4">
        {value}
      </div>
      {!disabled && (
        <ArrowUp
          className={cn(
            'size-4 transition group-data-[state="closed"]:rotate-180',
            !opened && 'rotate-180',
          )}
        />
      )}
    </ShadowBox>
  )
}
