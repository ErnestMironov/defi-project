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
    return <Skeleton className="h-6 w-full" />
  }
  return (
    <div>
      <div
        className={cn(
          'divide-x-stroke-100 grid grid-cols-2 divide-x border-b border-stroke-100 text-sm/[1.5rem] *:flex *:items-center *:justify-between',
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
      </div>
      <div className="flex items-center justify-center gap-10 border-b border-stroke-100 *:space-y-[0.38rem] *:p-8 [&_h6]:text-text-2100 [&_p]:text-2.5xl">
        <div>
          <p>
            {formattedApy}
            <span className="text-text-2100">%</span>
          </p>
          <h6 className="text-text-2100">
            APY <span className="text-text-260">Last 7 days</span>
          </h6>
        </div>
        <div>
          <p>
            {formattedApy}
            <span className="text-text-2100">%</span>
          </p>
          <h6 className="text-text-2100">
            APY <span className="text-text-260">Last 30 days</span>
          </h6>
        </div>
        <div>
          <p>
            <span className="text-text-2100">$</span>
            {formattedTvl}
          </p>
          <h6 className="text-text-2100">TVL</h6>
        </div>
      </div>
    </div>
  )
}
