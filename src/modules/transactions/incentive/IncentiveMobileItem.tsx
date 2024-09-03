import Scan from '@assets/icons/scan.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import { AccordionItem, AccordionTrigger } from '@components/ui/accordion'
import { Skeleton } from '@components/ui/skeleton'
import { AccordionHeader } from '@radix-ui/react-accordion'
import { formatAmount } from '@utils/formatValue'
import { getFromNow } from '@utils/get-day-difference'
import { shortenString } from '@utils/transform'
import type { ComponentProps } from 'react'
import type { ITransaction } from 'src/lib/types/transaction'

export type Incentive = ITransaction
interface IncentiveMobileItemProperties extends ComponentProps<'div'> {
  incentive: Incentive
}

export const IncentiveMobileItem = (props: IncentiveMobileItemProperties) => {
  const { incentive } = props
  return (
    <div>
      <div className="w-fit rounded-lg bg-light-blue-15 px-4 py-2">Harvest</div>
      <div className="mt-4 flex items-center gap-3 text-gray-100">
        <span>Vault</span>
        <div className="h-[1.0625rem] w-px bg-gray-50" />
        <span>{getFromNow(incentive.timestamp)}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-y-[0.82rem] text-base even:[&>*]:justify-self-end">
        <h6>Amount</h6>
        <div className="flex items-center">
          <span>{formatAmount(1_123_321, { notation: 'compact' })}</span>
          <TokenIconComponent symbol="usdc" className="ml-2 size-6" />
          <span className="ml-[0.38rem]">USDC</span>
        </div>
        <h6>Chain</h6>
        <IconWithLabelComponent symbol="base" className="size-6" />
        <h6>Tx Hash</h6>
        <div className="flex w-full items-center justify-end gap-2">
          <p>{shortenString(incentive.txHash)}</p>
          <Scan className="size-5 shrink-0" />
          <CopyButton text={incentive.txHash} className="size-6 shrink-0" />
        </div>
      </div>
    </div>
  )
}

export const SkeletonTransactionMobileItem = (
  _props: Omit<IncentiveMobileItemProperties, 'incentive'>,
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
