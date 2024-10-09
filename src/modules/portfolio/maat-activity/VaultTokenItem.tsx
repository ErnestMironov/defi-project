import { TokenIconComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import { formatAmount, formatPercentValue, formatUsdValue } from '@utils/formatValue'
import type { ComponentProps } from 'react'

interface VaultTokenItemProperties extends ComponentProps<'div'> {
  symbol: string
  value: number
  apy: number
}

export const VaultTokenItem = (props: VaultTokenItemProperties) => {
  const { symbol, value, apy, className, ...rest } = props
  return (
    <div className={cn('flex items-center gap-3', className)} {...rest}>
      <TokenIconComponent symbol={symbol} className="size-[2.125rem]" />
      <div className="flex flex-col">
        <p className="text-[1.25rem] font-medium">
          {formatAmount(value, {
            notation: 'compact',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
          {symbol}
        </p>
        <p className="text-base text-gray-100">
          {formatUsdValue(value, {
            notation: 'compact',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
      <div className="ml-auto text-lg font-medium text-text-80">
        APY {formatPercentValue(apy)}
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
