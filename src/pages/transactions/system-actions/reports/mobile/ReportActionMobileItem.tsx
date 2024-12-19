import type { ReportType } from '@api/maat-finance/types'
import Dots from '@assets/icons/options-dots.svg'
import { IconWithLabelComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { ActionTypeSkeleton } from '@modules/transactions/actions/ActionType'
import { formatAmount } from '@utils/formatValue'
import { getFromNow } from '@utils/get-day-difference'
import type { ComponentProps } from 'react'
import { formatUnits } from 'viem'

import { ReportActionType } from '../ReportActionType'

interface ReportActionMobileItemProperties extends ComponentProps<'div'> {
  report: ReportType
}

export const ReportActionMobileItem = (props: ReportActionMobileItemProperties) => {
  const { report } = props
  return (
    <div className="px-4 py-3">
      <div className="flex items-start justify-between">
        <ReportActionType report={report} />
        <span className="text-sm text-text-2100">{getFromNow(report.creation_time)}</span>
      </div>
      <div className="mt-4 grid w-full grid-cols-[1fr_0fr] justify-between gap-y-3 text-sm odd:[&>*]:text-text-2100 even:[&>*]:justify-self-end">
        <h6>Token</h6>
        <IconWithLabelComponent symbol={report.vault.token.symbol} />
        <h6>Chain</h6>
        <IconWithLabelComponent symbol={report.vault.chain_id} />
        <h6>PPS</h6>
        <div className="flex items-center justify-end gap-2">
          <p>
            {formatAmount(formatUnits(BigInt(report.price_per_share), 8), {
              minimumFractionDigits: 2,
              maximumFractionDigits: 3,
            })}
          </p>
          <div className="flex items-center justify-center rounded-lg border border-stroke-100 p-[0.38rem]">
            <Dots className="size-[0.8125rem] shrink-0" />
          </div>
        </div>
      </div>
    </div>
  )
}

export const SkeletonReportActionMobileItem = (
  _props: Omit<ReportActionMobileItemProperties, 'report'>,
) => {
  return (
    <div className="px-4 py-3">
      <div className="flex items-start justify-between">
        <ActionTypeSkeleton />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="mt-4 grid w-full grid-cols-[1fr_0fr] justify-between gap-y-3 text-sm odd:[&>*]:text-text-2100 even:[&>*]:justify-self-end">
        <h6>Token</h6>
        <Skeleton className="h-4 w-16" />
        <h6>Chain</h6>
        <Skeleton className="h-4 w-16" />
        <h6>PPS</h6>
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  )
}
