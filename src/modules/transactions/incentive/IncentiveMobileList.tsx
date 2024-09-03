/* eslint-disable react/jsx-no-useless-fragment */
import type { IncentiveEvent } from '@api/maat-finance/types'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import { IncentiveMobileItem, SkeletonIncentiveMobileItem } from './IncentiveMobileItem'

interface IncentiveMobileListProperties extends ComponentProps<'div'> {
  incentives?: IncentiveEvent[]
  loading?: boolean
  error?: any
}

export const IncentiveMobileList = (props: IncentiveMobileListProperties) => {
  const { className, incentives, loading, error, ...rest } = props

  const renderBody = () => {
    switch (true) {
      case loading:
      case !!error: {
        return (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonIncentiveMobileItem key={i} />
            ))}
          </>
        )
      }
      default: {
        if (!incentives || !incentives?.length) {
          return <div className="text-center text-gray-500">No transactions found</div>
        }
        return (
          <>
            {incentives?.map((incentive, index) => (
              <IncentiveMobileItem key={index} incentive={incentive} />
            ))}
          </>
        )
      }
    }
  }

  return (
    <div
      className={cn(
        'rounded-3xl bg-cards px-5 py-6 [&>*:not(:first-child)]:pt-6 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-gray-50 [&>*:not(:last-child)]:pb-6',
        className,
      )}
      {...rest}
    >
      {renderBody()}
    </div>
  )
}
