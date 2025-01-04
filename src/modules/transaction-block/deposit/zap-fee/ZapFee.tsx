import { useGetSwapRoute } from '@api/lifi/hooks/useGetSwapRoute'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { useHideHeaderStore } from '@store/useHideHeaderStore'
import type { HTMLAttributes } from 'react'
import React from 'react'

import Details from './Details'
import ShortInfo from './ShortInfo'
import { getSummaryAndFees } from './summaryAndFees'

interface ZapFeeProperties extends HTMLAttributes<HTMLDivElement> {}

const ZapFee: React.FC<ZapFeeProperties> = ({ className }) => {
  const [open, setOpen] = React.useState(false)
  const { setHidden: setIsHeaderHidden } = useHideHeaderStore()
  const { swapRoute } = useTxStore()
  const { isPending: isRouteLoading } = useGetSwapRoute()

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    setIsHeaderHidden(isOpen)
  }

  const summaryAndFees = getSummaryAndFees(swapRoute)

  return (
    <div className={className}>
      <ShortInfo openHandler={() => handleOpenChange(true)} />
      <Details
        open={open}
        onOpenChange={handleOpenChange}
        summaryAndFees={summaryAndFees}
        isLoading={isRouteLoading}
      />
    </div>
  )
}

export default ZapFee
