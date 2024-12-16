import type { ReportType } from '@api/maat-finance/types'
import Rocket from '@assets/icons/rocket.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { ScanLink } from '@components/scan-link/ScanLink'
import { SYSTEM_ADDRESSES } from '@constants/system-addresses'
import { cn } from '@utils/cn'
import { shortenAddress } from '@utils/transform'
import type { ComponentProps } from 'react'

interface ReportActionTypeProperties extends ComponentProps<'div'> {
  report: ReportType
}

export const ReportActionType = (props: ReportActionTypeProperties) => {
  const { className, report, ...rest } = props
  return (
    <div className={cn('flex items-center gap-4 max-lg:gap-2', className)} {...rest}>
      <Rocket className="size-8 shrink-0" />
      <div>
        <div className="flex items-center gap-[0.38rem]">
          <p className="text-base/[1.5rem] max-lg:text-sm">
            {SYSTEM_ADDRESSES[report.txFrom as keyof typeof SYSTEM_ADDRESSES]}
          </p>
          <ScanLink
            chainId={report.vault.chain_id}
            txHash={report.hash}
            className="size-4 shrink-0 max-lg:hidden"
          />
        </div>
        <div className="flex items-center gap-[0.38rem]">
          <p className="text-sm text-text-260">{shortenAddress(report.hash)}</p>
          <CopyButton text={report.hash} />
        </div>
      </div>
    </div>
  )
}
