import { useStrategy } from '@api/maat-finance/useStrategy'
import { IconWithLabelComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue'
import type { ComponentProps } from 'react'
import { useParams } from 'react-router-dom'

export const StrategyInfo = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  const { id } = useParams()
  const { data: strategy, isLoading, error } = useStrategy(id)

  const formattedApy = formatAmount(strategy?.apy ?? 0, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
  const formattedTvl = formatAmount(strategy?.tvl ?? 0, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    notation: 'compact',
  })
  if (isLoading || error) {
    return <StrategyInfoSkeleton className={className} {...rest} />
  }
  return (
    <div
      className={cn(
        'border-stroke-100 grid grid-cols-2 *:border-b [&>*:nth-child(odd)]:border-r text-sm/[1.5rem] *:flex *:items-center *:justify-between',
        className,
      )}
      {...rest}
    >
      <div className="px-8 py-3">
        <span className="text-text-2100">Chain</span>
        <IconWithLabelComponent symbol={strategy?.chain_id} />
      </div>
      <div className="px-8 py-3">
        <span className="text-text-2100">Token</span>
        <IconWithLabelComponent symbol={strategy?.token?.symbol} />
      </div>
      <div className="px-8 py-3">
        <span className="text-text-2100">TVL</span>
        <p>
          {formattedTvl}
          <span className="text-text-2100">$</span>
        </p>
      </div>
      <div className="px-8 py-3">
        <span className="text-text-2100">APY</span>
        <p>
          {formattedApy}
          <span className="text-text-2100">%</span>
        </p>
      </div>
    </div>
  )
}

export const StrategyInfoSkeleton = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  return (
    <div
      className={cn(
        'border-stroke-100 grid grid-cols-2 *:border-b [&>*:nth-child(odd)]:border-r text-sm/[1.5rem] *:flex *:items-center *:justify-between',
        className,
      )}
      {...rest}
    >
      <div className="px-8 py-3">
        <span className="text-text-2100">Chain</span>
        <Skeleton className="h-6 w-20" />
      </div>
      <div className="px-8 py-3">
        <span className="text-text-2100">Token</span>
        <Skeleton className="h-6 w-20" />
      </div>
      <div className="px-8 py-3">
        <span className="text-text-2100">TVL</span>
        <Skeleton className="h-6 w-20" />
      </div>
      <div className="px-8 py-3">
        <span className="text-text-2100">APY</span>
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  )
}
