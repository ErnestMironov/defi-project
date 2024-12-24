import Lightning from '@assets/icons/green-lightning.svg'
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
      className="flex cursor-pointer items-center justify-center gap-5 rounded-b-3xl border-t border-t-stroke-100 bg-[rgba(133,_133,_169,_0.03)] px-6 py-3  max-lg:gap-3 max-lg:text-[0.8125rem]"
    >
      <div className="flex items-center gap-1 text-gray-100">
        <Lightning className="size-4" />
        <span>Fees</span>
      </div>
      <div className="flex items-center gap-3 text-text-2100/70">(?)</div>
    </div>
  )
}

export default ShortInfo
