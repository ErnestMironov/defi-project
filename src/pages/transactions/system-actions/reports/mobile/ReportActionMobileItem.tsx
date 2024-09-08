import type { ReportType } from '@api/maat-finance/types'
import Scan from '@assets/icons/scan.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { IconWithLabelComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { SYSTEM_ADDRESSES } from '@constants/system-addresses'
import { formatAmount } from '@utils/formatValue'
import { getFromNow } from '@utils/get-day-difference'
import { shortenString } from '@utils/transform'
import type { ComponentProps } from 'react'
import { formatUnits } from 'viem'

interface ReportActionMobileItemProperties extends ComponentProps<'div'> {
  report: ReportType
}

export const ReportActionMobileItem = (props: ReportActionMobileItemProperties) => {
  const { report } = props
  return (
    <div>
      <div className="flex items-center gap-3 text-gray-100">
        <span>{SYSTEM_ADDRESSES[report.txFrom as keyof typeof SYSTEM_ADDRESSES]}</span>
        <div className="h-[1.0625rem] w-px bg-gray-50" />
        <span>{getFromNow(report.creation_time)}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-y-[0.82rem] text-base even:[&>*]:justify-self-end">
        <h6>Token</h6>
        <IconWithLabelComponent symbol={report.vault.token.symbol} className="size-6" />
        <h6>PPS</h6>
        <p>
          {formatAmount(formatUnits(BigInt(report.price_per_share), 8), {
            minimumFractionDigits: 2,
            maximumFractionDigits: 3,
          })}
        </p>
        <h6>Chain</h6>
        <IconWithLabelComponent className="size-6" symbol={report.vault.chain_id} />
        <h6>Tx Hash</h6>
        <div className="flex w-full items-center justify-end gap-2">
          <p>{shortenString(report.hash)}</p>
          <Scan className="size-5 shrink-0" />
          <CopyButton text={report.hash} className="size-6 shrink-0" />
        </div>
      </div>
    </div>
  )
}

export const SkeletonReportActionMobileItem = (
  _props: Omit<ReportActionMobileItemProperties, 'report'>,
) => {
  return (
    <div>
      <div className="flex items-center gap-3 text-gray-100">
        <Skeleton className="h-6 w-20 text-lg" />
        <div className="h-[1.0625rem] w-px bg-gray-50" />
        <Skeleton className="h-6 w-20 text-lg" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-y-[0.82rem] text-base even:[&>*]:justify-self-end">
        <h6>Token</h6>
        <div className="flex items-center gap-3">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-6 w-10" />
        </div>
        <h6>PPS</h6>
        <Skeleton className="h-6 w-20 text-lg" />
        <h6>Chain</h6>
        <div className="flex items-center gap-3">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-6 w-10" />
        </div>
        <h6>Tx Hash</h6>
        <div className="flex w-full items-center justify-end gap-2">
          <Skeleton className="h-6 w-20 text-lg" />
          <Skeleton className="size-6 shrink-0 rounded-full" />
          <Skeleton className="size-6 shrink-0" />
        </div>
      </div>
    </div>
  )
}
