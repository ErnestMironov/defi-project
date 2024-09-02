import Scan from '@assets/icons/scan.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { IconWithLabelComponent } from '@components/token-icon'
import { AccordionItem, AccordionTrigger } from '@components/ui/accordion'
import { Skeleton } from '@components/ui/skeleton'
import { AccordionHeader } from '@radix-ui/react-accordion'
import { getFromNow } from '@utils/get-day-difference'
import { shortenString } from '@utils/transform'
import type { ComponentProps } from 'react'
import type { ITransaction } from 'src/lib/types/transaction'

export type ReportAction = ITransaction
interface ReportActionMobileItemProperties extends ComponentProps<'div'> {
  reportAction: ReportAction
}

export const ReportActionMobileItem = (props: ReportActionMobileItemProperties) => {
  const { reportAction } = props
  return (
    <div>
      <div className="flex items-center gap-3 text-gray-100">
        <span>Oracle Admin</span>
        <div className="h-[1.0625rem] w-px bg-gray-50" />
        <span>{getFromNow(reportAction.timestamp)}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-y-[0.82rem] text-base even:[&>*]:justify-self-end">
        <h6>Token</h6>
        <IconWithLabelComponent symbol="usdt" className="size-6" />
        <h6>PPS</h6>
        <p>1.0001</p>
        <h6>Chain</h6>
        <IconWithLabelComponent symbol="base" className="size-6" />
        <h6>Tx Hash</h6>
        <div className="flex w-full items-center justify-end gap-2">
          <p>{shortenString(reportAction.txHash)}</p>
          <Scan className="size-5 shrink-0" />
          <CopyButton text={reportAction.txHash} className="size-6 shrink-0" />
        </div>
      </div>
    </div>
  )
}

export const SkeletonReportActionMobileItem = (
  _props: Omit<ReportActionMobileItemProperties, 'reportAction'>,
) => {
  return (
    <AccordionItem value="">
      <AccordionTrigger>
        <Skeleton className="h-9 w-[7.5rem]" />
      </AccordionTrigger>
      <AccordionHeader className="mt-4 flex items-center gap-1 text-base text-gray-100">
        #<Skeleton className="h-6 w-10 rounded-md" /> |{' '}
        <Skeleton className="h-6 w-20 rounded-md" />
      </AccordionHeader>
    </AccordionItem>
  )
}
