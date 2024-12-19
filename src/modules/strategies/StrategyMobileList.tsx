/* eslint-disable react/jsx-no-useless-fragment */
import type { Strategy } from '@api/maat-finance/types'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import { StrategyMobileCard } from './StrategyMobileCard'

interface StrategyMobileListProperties extends ComponentProps<'div'> {
  strategies?: Strategy[]
  loading?: boolean
  error?: any
}

export const StrategyMobileList = (props: StrategyMobileListProperties) => {
  const { className, strategies, loading, error, ...rest } = props

  const renderBody = () => {
    switch (true) {
      case loading:
      case !!error: {
        return (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonStrategyMobileCard key={i} />
            ))}
          </>
        )
      }
      default: {
        if (!strategies || !strategies?.length) {
          return <div className="text-center text-gray-500">No strategies found</div>
        }
        return (
          <>
            {strategies?.map((strategy, index) => (
              <StrategyMobileCard key={index} strategy={strategy} />
            ))}
          </>
        )
      }
    }
  }

  return (
    <div
      className={cn('[&>*:not(:last-child)]:border-b border-stroke-100', className)}
      {...rest}
    >
      {renderBody()}
    </div>
  )
}

const SkeletonStrategyMobileCard = (
  props: Omit<StrategyMobileListProperties, 'strategies'>,
) => {
  const { ...rest } = props

  return (
    <div className="px-4 py-3" {...rest}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="size-8 shrink-0" />
          <div className="space-y-0.5 text-sm/[1rem]">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <Skeleton className="h-4 w-16" />
      </div>

      <div className="mt-4 grid w-full grid-cols-[1fr_0fr] justify-between gap-y-2 text-sm odd:[&>*]:text-text-2100 even:[&>*]:justify-self-end">
        <h6>Token</h6>
        <Skeleton className="h-4 w-16" />
        <h6>Chain</h6>
        <Skeleton className="h-4 w-16" />
        <h6>TVL</h6>
        <Skeleton className="h-4 w-16" />
        <h6>Address</h6>
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  )
}
