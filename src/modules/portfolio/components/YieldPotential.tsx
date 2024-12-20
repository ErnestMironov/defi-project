import { cn } from '@utils/cn'
import { formatUsdValue } from '@utils/formatValue'
import type { ComponentProps } from 'react'

interface YieldPotentialProperties extends ComponentProps<'div'> {
  potentialUsdProfit: string
  className?: string
}

export function YieldPotential({
  potentialUsdProfit,
  className,
}: YieldPotentialProperties) {
  return (
    <div className={cn('mt-4 px-6 max-md:px-4', className)}>
      <div className="h-auto w-full rounded-lg bg-light-blue-15 px-6 py-3 text-center text-white">
        <span className="text-main-100 opacity-70">Yield Potential</span>{' '}
        <span className="text-main-100">
          {formatUsdValue(potentialUsdProfit, { notation: 'compact' })}/year
        </span>
      </div>
    </div>
  )
}
