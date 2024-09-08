/* eslint-disable react/jsx-no-useless-fragment */
import type { ReportType } from '@api/maat-finance/types'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import {
  ReportActionMobileItem,
  SkeletonReportActionMobileItem,
} from './ReportActionMobileItem'

interface ReportActionMobileListProperties extends ComponentProps<'div'> {
  reportActions?: ReportType[]
  loading?: boolean
  error?: any
}

export const ReportActionMobileList = (props: ReportActionMobileListProperties) => {
  const { className, reportActions, loading, error, ...rest } = props

  const renderBody = () => {
    switch (true) {
      case loading:
      case !!error: {
        return (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonReportActionMobileItem key={i} />
            ))}
          </>
        )
      }
      default: {
        if (!reportActions || !reportActions?.length) {
          return <div className="text-center text-gray-500">No transactions found</div>
        }
        return (
          <>
            {reportActions?.map((reportAction, index) => (
              <ReportActionMobileItem key={index} report={reportAction} />
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
