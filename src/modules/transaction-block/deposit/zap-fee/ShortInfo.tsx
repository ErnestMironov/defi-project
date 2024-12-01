import ArrowDown from '@assets/icons/arrow-up.svg'
import Lightning from '@assets/icons/blue-lightning.svg'
import type { HTMLAttributes } from 'react'
import React from 'react'

import type { SummaryAndFees } from './summaryAndFees'

type ShortInfoProperties = HTMLAttributes<HTMLDivElement> & {
  openHandler?: () => void
  summaryAndFees: SummaryAndFees
}

const ShortInfo: React.FC<ShortInfoProperties> = ({
  openHandler,
  summaryAndFees,
  ...props
}) => {
  return (
    <div
      {...props}
      onClick={openHandler}
      className="flex cursor-pointer items-center justify-between gap-3 self-stretch rounded-xl border border-main-15 px-6
      py-4 dark:border-stroke-100"
    >
      <div className="flex flex-col gap-1 text-gray-100 max-lg:text-[0.8125rem]">
        <b>${summaryAndFees.total.usd}</b>
        <span>ZAP Fee</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center gap-2 rounded-xl bg-light-blue-15 px-3 py-2.5">
          <Lightning className="size-4" />
          <span className="text-[0.8125rem] leading-[120%] text-dark-blue-100 lg:text-[1.125rem]">
            ETA - {summaryAndFees.estimatedTime}
          </span>
        </div>
        <ArrowDown className="size-4" />
      </div>
    </div>
  )
}

export default ShortInfo
