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

interface TransactionMobileItemProperties extends ComponentProps<'div'> {
  tx: ITransaction
}

export const TransactionMobileItem = (props: TransactionMobileItemProperties) => {
  const { tx } = props
  return (
    <div>
      <div className="w-fit rounded-lg bg-light-blue-15 px-4 py-2">Withdraw Request</div>
      <div className="mt-4 text-gray-50">
        <span className="text-dark-blue-100">In Progress</span>
        <span className="before:content-['_|_']">{getFromNow(tx.timestamp)}</span>
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
          <p>{shortenString(tx.txHash)}</p>
          <Scan className="size-5 shrink-0" />
          <CopyButton text={tx.txHash} className="size-6 shrink-0" />
        </div>
      </div>
    </div>
  )
}

export const SkeletonTransactionMobileItem = (
  _props: Omit<TransactionMobileItemProperties, 'tx'>,
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
