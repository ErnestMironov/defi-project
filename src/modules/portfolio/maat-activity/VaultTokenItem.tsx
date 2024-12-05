import { TokenIconComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import { formatAmount, formatPercentValue, formatUsdValue } from '@utils/formatValue'
import type { ComponentProps } from 'react'

import type { TokenData } from '../types'

interface VaultTokenItemProperties extends ComponentProps<'div'>, TokenData {}

export const VaultTokenItem = (props: VaultTokenItemProperties) => {
  const { balance, symbol, apy, className, ...rest } = props
  return (
    <div className={cn('flex items-center gap-2', className)} {...rest}>
      <TokenIconComponent symbol={symbol} className="size-12" />
      <div className="flex flex-col">
        <p className="text-base font-medium text-text-1100">
          {formatAmount(balance, {
            notation: 'compact',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
          {symbol}
        </p>
        <p className="flex gap-[.38rem] text-base text-text-2100">
          {formatUsdValue(balance, {
            notation: 'compact',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
      <div className="ml-auto font-medium text-text-1100">
        <p className="text-base font-medium leading-6">{formatPercentValue(apy)}</p>
        <p className="text-right text-base text-text-2100">APY</p>
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
