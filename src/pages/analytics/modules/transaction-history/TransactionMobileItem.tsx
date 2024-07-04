import Arrow from '@assets/icons/arrow-filled.svg'
import { ActionType } from '@codegen/graphql'
import { TokenIconComponent } from '@components/token-icon'
import { ActionChip } from '@components/transaction-type-badge'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion'
import { Skeleton } from '@components/ui/skeleton'
import { AccordionHeader } from '@radix-ui/react-accordion'
import { formatAmountValue } from '@utils/formatValue'
import { getFromNow } from '@utils/get-day-difference'
import { shortenString } from '@utils/transform'
import type { ComponentProps } from 'react'
import type { ITransaction } from 'src/lib/types/transaction'

interface TransactionMobileItemProperties extends ComponentProps<'div'> {
  tx: ITransaction
  isLast?: boolean
  txIndex: number
}

export const TransactionMobileItem = (props: TransactionMobileItemProperties) => {
  const { tx, isLast, txIndex } = props
  return (
    <AccordionItem value={`${tx.txHash}_${txIndex}`}>
      <AccordionTrigger>
        <ActionChip type={tx.action} />
      </AccordionTrigger>
      <AccordionHeader className="mt-4 text-base text-gray-100">
        #{txIndex} | {getFromNow(tx.timestamp)}
      </AccordionHeader>
      <AccordionContent className="mt-4 grid grid-cols-2 gap-y-[0.82rem] text-base even:[&>*]:justify-self-end">
        {tx.action === ActionType.Bridge ? (
          <>
            <h6>Amount</h6>
            <div>${formatAmountValue(tx.amount)}</div>
            <h6 className="flex items-center gap-2">
              from
              <Arrow className="[&_path]:fill-text" />
              To
            </h6>
            <div className="flex items-center gap-2">
              <TokenIconComponent symbol={tx.from} className="size-6 overflow-visible" />
              <Arrow className="[&_path]:fill-text" />
              <TokenIconComponent symbol={tx.to} className="size-6 overflow-visible" />
            </div>
            <h6>Tx Hash</h6>
            <div>{shortenString(tx.txHash)}</div>
          </>
        ) : (
          <>
            <h6>Amount</h6>
            <div>${formatAmountValue(tx.amount)}</div>
            <h6>Strategy</h6>
            <div className="flex items-center space-x-[-0.44rem]">
              <TokenIconComponent symbol={tx.from} className="size-6 overflow-visible" />
              <TokenIconComponent
                symbol={tx.protocol}
                className="size-6 overflow-visible"
              />
            </div>
            <h6>Weekly APY</h6>
            <div>{tx.apy}%</div>
            <h6>TVL</h6>
            <div>${formatAmountValue(tx.tvl)}</div>
            <h6>Tx Hash</h6>
            <div>{shortenString(tx.txHash)}</div>
          </>
        )}
      </AccordionContent>
      {!isLast && <Divider />}
    </AccordionItem>
  )
}

const Divider = () => <div className="my-[1.31rem] h-px bg-gray-50" />

export const SkeletonTransactionMobileItem = (
  props: Omit<TransactionMobileItemProperties, 'tx' | 'txIndex'>,
) => {
  const { isLast } = props
  return (
    <AccordionItem value="">
      <AccordionTrigger>
        <Skeleton className="h-9 w-[7.5rem]" />
      </AccordionTrigger>
      <AccordionHeader className="mt-4 flex items-center gap-1 text-base text-gray-100">
        #<Skeleton className="h-6 w-10 rounded-md" /> |{' '}
        <Skeleton className="h-6 w-20 rounded-md" />
      </AccordionHeader>
      {!isLast && <Divider />}
    </AccordionItem>
  )
}
