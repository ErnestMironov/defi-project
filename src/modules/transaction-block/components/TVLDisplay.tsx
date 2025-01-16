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
        'flex items-center gap-[0.37rem] font-medium text-base text-text-2100 leading-[120%] max-lg:text-[0.9375rem]',
        className,
      )}
    >
      <span className="text-text-50">TVL</span>
      {isProtocolMetricsLoading ? (
        <Skeleton className="h-6 w-20" />
      ) : (
        <span>
          $
          {formatAmount(totalTvl, {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          })}
        </span>
      )}
    </div>
  )
}
