import { formatUsdValue } from '@utils/formatValue'
import type { ComponentProps } from 'react'

interface YieldPotentialProperties extends ComponentProps<'div'> {
  potentialUsdProfit: string
}

export function YieldPotential({ potentialUsdProfit }: YieldPotentialProperties) {
  return (
    <div className="mt-4 px-6">
      <div className="h-auto w-full rounded-lg bg-light-blue-15 px-6 py-3 text-center text-white">
        <span className="text-main-100 opacity-70">Yield Potential</span>{' '}
        <span className="text-main-100">{formatUsdValue(potentialUsdProfit)}/year</span>
      </div>
    </div>
  )
}
