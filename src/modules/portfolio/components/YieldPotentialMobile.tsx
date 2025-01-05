import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue'
import type { ComponentProps } from 'react'

interface YieldPotentialMobileProperties extends ComponentProps<'div'> {
  potentialUsdProfit: string
}

export function YieldPotentialMobile({
  potentialUsdProfit,
  className,
}: YieldPotentialMobileProperties) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2 px-4 py-3 border-b border-stroke-100',
        className,
      )}
    >
      <p className="text-sm text-text-2100">Your potential</p>
      <p className="text-sm text-text-2100">
        <span>$</span>
        <span className="text-text-100">
          {formatAmount(potentialUsdProfit, { notation: 'compact' })}
        </span>{' '}
        / year
      </p>
    </div>
  )
}
