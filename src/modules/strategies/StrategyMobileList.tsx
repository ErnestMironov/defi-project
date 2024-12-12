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
    <div {...rest}>
      <div className="flex items-center gap-3">
        <Skeleton className="size-6 rounded-full" />
        <Skeleton className="h-6 w-20 text-lg" />
      </div>
      <div className="mt-4 grid w-full grid-cols-[1fr_0fr] justify-between gap-y-[0.82rem] even:[&>*]:justify-self-end [&_h6]:text-base [&_h6]:leading-normal">
        <h6>Chain | Protocol</h6>
        <div className="flex items-center space-x-[-0.44rem]">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="size-6 rounded-full" />
        </div>
        <h6>Projected APY</h6>
        <Skeleton className="h-6 w-20 text-lg" />
        <h6>TVL</h6>
        <Skeleton className="h-6 w-20 text-lg" />
      </div>
    </div>
  )
}
