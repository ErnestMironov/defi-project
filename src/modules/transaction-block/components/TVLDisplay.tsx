import { useProtocolMetrics } from '@api/maat-finance/useProtocolMetrics'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue'
import type { ComponentProps } from 'react'
import React, { useMemo } from 'react'

interface TVLDisplayProperties extends ComponentProps<'div'> {}

export const TVLDisplay: React.FC<TVLDisplayProperties> = ({ className }) => {
  const { isLoading: isProtocolMetricsLoading, data: protocolMetrics } =
    useProtocolMetrics({})

  const totalTvl = useMemo(() => {
    return (
      (protocolMetrics?.history.USDC?.tvl ?? 0) +
      (protocolMetrics?.history.USDT?.tvl ?? 0)
    )
  }, [protocolMetrics])

  return (
    <div
      className={cn(
        'flex items-center gap-3 text-[1.125rem] lg:text-[1.25rem] leading-[120%]',
        className,
      )}
    >
      <span className="text-[#9998B8]">TVL</span>
      {isProtocolMetricsLoading ? (
        <Skeleton className="h-6 w-20" />
      ) : (
        <span>
          ${' '}
          {formatAmount(totalTvl, {
            maximumFractionDigits: 2,
            currency: 'USD',
          })}
        </span>
      )}
    </div>
  )
}
