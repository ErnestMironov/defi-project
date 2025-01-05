import { TokenIconComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import { formatAmount, formatPercentValue } from '@utils/formatValue'
import type { ComponentProps } from 'react'

import type { TokenData } from '../types'

interface VaultTokenItemProperties extends ComponentProps<'div'>, TokenData {
  rate: number
}

export const VaultTokenItem = (props: VaultTokenItemProperties) => {
  const { balance, symbol, apy, className, rate, ...rest } = props
  return (
    <div className={cn('flex items-center gap-2', className)} {...rest}>
      <TokenIconComponent symbol={symbol} className="size-12 max-md:size-10" />
      <div className="flex flex-col text-base max-md:text-sm">
        <p className=" font-medium text-text-1100">
          {formatAmount(balance, { maximumFractionDigits: 2 })} {symbol}
        </p>
        <p className="flex gap-[.38rem] text-text-2100">
          ${formatAmount(rate * Number(balance), { maximumFractionDigits: 2 })}
        </p>
      </div>
      <div className="ml-auto text-base font-medium  text-text-1100 max-md:text-sm">
        <p className=" font-medium leading-6">{formatPercentValue(apy)}</p>
        <p className="text-right text-text-2100">APY</p>
      </div>
    </div>
  )
}

export const VaultTokenItemSkeleton = () => {
  return (
    <div className="flex w-full items-center gap-3">
      <Skeleton className="size-[2.125rem] shrink-0 rounded-full" />
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="ml-auto h-6 w-16" />
    </div>
  )
}
