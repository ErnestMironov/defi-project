import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import type { HTMLAttributes } from 'react'
import React from 'react'

import Details from './Details'
import ShortInfo from './ShortInfo'
import { getSummaryAndFees } from './summaryAndFees'

interface ZapFeeProperties extends HTMLAttributes<HTMLDivElement> {}

const ZapFee: React.FC<ZapFeeProperties> = ({ className }) => {
  const [open, setOpen] = React.useState(false)

  const { squidRoute } = useTxStore()

  const summaryAndFees = getSummaryAndFees(squidRoute)

  return (
    <div className={className}>
      <ShortInfo openHandler={() => setOpen(true)} summaryAndFees={summaryAndFees} />
      <Details
        open={open}
        closeHandler={() => setOpen(false)}
        summaryAndFees={summaryAndFees}
      />
    </div>
  )
}

export default ZapFee
