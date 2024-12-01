import ArrowDown from '@assets/icons/arrow-up.svg'
import { Dialog, DialogContent, DialogTitle } from '@components/ui/dialog'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { cn } from '@utils/cn'
import type { HTMLAttributes } from 'react'
import React from 'react'

import { NetworkSelector } from './NetworkSelector'
import type { SummaryAndFees } from './summaryAndFees'

const Text: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({ children, ...props }) => {
  return (
    <p
      {...props}
      className={cn(
        'font-[Arial] text-[1rem] font-normal not-italic leading-[120%] text-[#9998B8] text-balance',
        props.className,
      )}
    >
      {children}
    </p>
  )
}

const Line: React.FC<
  HTMLAttributes<HTMLDivElement> & {
    title: string
    value: string
    usd?: string
  }
> = ({ title, value, usd, ...props }) => {
  return (
    <div
      {...props}
      className="flex items-baseline justify-between text-[1.125rem] text-text-80"
    >
      <p className="text-[1rem] text-text-80 ">{title}</p>
      <p className="text-[1rem] text-text-80 ">
        {value} {usd && <span className="text-gray-100">(${usd})</span>}
      </p>
    </div>
  )
}

interface DetailsProperties {
  open: boolean
  summaryAndFees: SummaryAndFees
  onOpenChange: (open: boolean) => void
}

const Details: React.FC<DetailsProperties> = ({ open, summaryAndFees, onOpenChange }) => {
  const { txDifficulty } = useTxStore()
  return (
    <Dialog open={open} onOpenChange={() => onOpenChange(false)}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[38.75rem] gap-8 overflow-y-auto rounded-[2rem]"
      >
        <DialogTitle className="flex justify-between text-center">
          <div className="h-full w-8" />
          Details
          <button
            type="button"
            className="flex h-full w-8 items-center justify-end"
            onClick={() => onOpenChange(false)}
          >
            <ArrowDown className="size-6" />
          </button>
        </DialogTitle>

        <div
          style={{
            opacity: txDifficulty === 'cross_chain' ? 1 : 0.4,
          }}
        >
          <NetworkSelector disabled={false} />
          <Text className="mt-3">
            Representation tokens can be given only on supported chains. <br /> You can
            change network.
          </Text>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-[1.125rem] font-bold">Summary</h3>
          <div className="flex flex-col gap-3">
            <Line
              title="Convert from"
              value={summaryAndFees.convertFrom.value}
              usd={summaryAndFees.convertFrom.usd}
            />
            <Line
              title="Min receive"
              value={summaryAndFees.minReceive.value}
              usd={summaryAndFees.minReceive.usd}
            />
            <Line title="Exchange rate" value={summaryAndFees.exchangeRate} />
          </div>
        </div>
        <div className="block h-px w-full bg-stroke-100" />
        <div className="flex flex-col gap-4">
          <h3 className="text-[1.125rem] font-bold">Fee breakdown</h3>
          <div className="flex flex-col gap-3">
            <Line
              title="Cross-chain gas fees"
              value={summaryAndFees.crossChainFee.value}
              usd={summaryAndFees.crossChainFee.usd}
            />
            <Line
              title="Expected gas refund"
              value={`- ${summaryAndFees.expectedGasRefund.value}`}
              usd={summaryAndFees.expectedGasRefund.usd}
            />
            <Line
              title="Total"
              value={summaryAndFees.total.value}
              usd={summaryAndFees.total.usd}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Details
