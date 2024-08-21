import ArrowDown from '@assets/icons/arrow-down.svg'
import Lightning from '@assets/icons/blue-lightning.svg'
import type { HTMLAttributes } from 'react'
import React from 'react'

type ShortInfoProperties = HTMLAttributes<HTMLDivElement> & {
  openHandler?: () => void
}

const ShortInfo: React.FC<ShortInfoProperties> = ({ openHandler, ...props }) => {
  return (
    <div
      {...props}
      onClick={openHandler}
      className="flex cursor-pointer items-center justify-between gap-3 self-stretch rounded-xl border border-main-15 px-6
      py-4 dark:border-stroke-100"
    >
      <div className="flex flex-col gap-1 text-gray-100">
        <b>$0.05</b>
        <span>ZAP Fee (1%)</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center gap-2 rounded-xl bg-light-blue-15 px-3 py-2.5">
          <Lightning className="size-4" />
          <span className="text-[1.125rem] leading-[120%] text-dark-blue-100">
            Est.time - 20sec
          </span>
        </div>
        <ArrowDown className="size-4" />
      </div>
    </div>
  )
}

export default ShortInfo
