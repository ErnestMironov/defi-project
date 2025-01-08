import Lightning from '@assets/icons/green-lightning.svg'
import { Skeleton } from '@components/ui/skeleton'
import {
  AdaptiveModal,
  AdaptiveModalContent,
  AdaptiveModalTitle,
} from '@modules/adaptive-modal'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import type { HTMLAttributes } from 'react'
import React from 'react'

import { NetworkSelector } from './NetworkSelector'
import type { SummaryAndFees } from './summaryAndFees'

const Line: React.FC<
  HTMLAttributes<HTMLDivElement> & {
    title: string
    value: string
    usd?: string
  }
> = ({ title, value, usd, ...props }) => {
  return (
    <div {...props} className="flex items-baseline justify-between text-text-80">
      <p className="text-text-3100/70">{title}</p>
      <p className="text-[1rem] text-text-80 ">
        {value} {usd && <span className="text-gray-100">(${usd})</span>}
      </p>
    </div>
  )
}

interface DetailsProperties {
  open: boolean
  summaryAndFees: SummaryAndFees
  isLoading: boolean
  onOpenChange: (open: boolean) => void
}

const Details: React.FC<DetailsProperties> = ({
  open,
  summaryAndFees,
  onOpenChange,
  isLoading,
}) => {
  const { txDifficulty } = useTxStore()

  return (
    <AdaptiveModal open={open} onOpenChange={onOpenChange}>
      <AdaptiveModalContent
        showCloseButton
        className="max-w-[38.75rem] gap-8 rounded-[2rem] max-lg:max-w-full max-lg:rounded-b-none max-lg:rounded-t-3xl"
      >
        {isLoading ? (
          <Skeleton className="h-[200px] w-full" />
        ) : (
          <>
            <AdaptiveModalTitle className="flex justify-between px-8 py-6 text-center text-base normal-case text-text-3100">
              <div className="flex items-center gap-1 text-gray-100 max-lg:text-[0.8125rem] ">
                <Lightning className="h-[0.83356rem] w-[0.75031rem]" />
                <span>Fees</span>
              </div>
              <span>
                {' '}
                (${summaryAndFees.total.usd} / {summaryAndFees.total.value})
              </span>
            </AdaptiveModalTitle>

            <div className="flex flex-col gap-4 bg-input-default px-12 py-6 text-text-3100 dark:bg-[#3E3E4D66] max-md:p-6">
              <h3 className="text-base font-[500]">Summary</h3>
              <div className="flex flex-col gap-1">
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
                <Line
                  title="Total"
                  value={summaryAndFees.total.value}
                  usd={summaryAndFees.total.usd}
                />
              </div>
            </div>

            {txDifficulty === 'cross_chain' && <NetworkSelector disabled={false} />}
          </>
        )}
      </AdaptiveModalContent>
    </AdaptiveModal>
  )
}

export default Details
