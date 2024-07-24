import ArrowDown from '@assets/icons/arrow-down.svg'
import { ShadowBox } from '@components/box/ShadowBox'
import { TokenIconComponent } from '@components/token-icon'
import { cn } from '@utils/cn'
import type { ComponentProps, ReactNode } from 'react'

interface SelectProperties extends ComponentProps<'div'> {
  symbol?: string
  value: string
  opened?: boolean
  icon?: ReactNode
}

export const Select = ({ symbol, value, opened, icon }: SelectProperties) => {
  return (
    <ShadowBox className="flex cursor-pointer items-center justify-center gap-3 rounded-full px-7 text-md transition-shadow hover:shadow-shadow--hover dark:hover:shadow-dark-shadow--hover max-lg:gap-2 max-lg:px-4 max-lg:py-3 max-lg:text-base lg:min-h-14">
      {icon ||
        (symbol && (
          <TokenIconComponent symbol={symbol} className="size-8 max-lg:size-5" />
        ))}
      <div>{value}</div>
      <ArrowDown
        className={cn(
          'size-4 max-lg:size-3 transition group-data-[state="open"]:rotate-180',
          opened && 'rotate-180',
        )}
      />
    </ShadowBox>
  )
}
