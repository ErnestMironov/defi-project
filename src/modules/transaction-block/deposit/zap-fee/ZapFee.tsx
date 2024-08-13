import type { HTMLAttributes } from 'react'
import React from 'react'

import Details from './Details'
import ShortInfo from './ShortInfo'

interface ZapFeeProperties extends HTMLAttributes<HTMLDivElement> {}

const ZapFee: React.FC<ZapFeeProperties> = ({ className }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <div className={className}>
      <ShortInfo openHandler={() => setOpen(true)} />
      <Details open={open} closeHandler={() => setOpen(false)} />
    </div>
  )
}

export default ZapFee
