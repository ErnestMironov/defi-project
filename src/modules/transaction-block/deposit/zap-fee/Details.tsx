import type { RouteResponse } from '@0xsquid/squid-types'
import ArrowDown from '@assets/icons/arrow-down.svg'
import Gas from '@assets/icons/gas-station.svg'
import Lightning from '@assets/icons/lightning.svg'
import { Dialog, DialogContent, DialogTitle } from '@components/ui/dialog'
import { Switch } from '@components/ui/switch'
import Grey3DBox from '@modules/transaction-block/components/Grey3DBox'
import { cn } from '@utils/cn'
import type { HTMLAttributes } from 'react'
import React from 'react'

import { NetworkSelector } from './NetworkSelector'

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
  route?: RouteResponse['route']
  closeHandler: () => void
}

const Details: React.FC<DetailsProperties> = ({ open, route, closeHandler }) => {
  return (
    <Dialog open={open} onOpenChange={() => closeHandler()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[38.75rem] gap-8 rounded-[2rem]"
      >
        <DialogTitle className="flex justify-between text-center">
          <div className="h-full w-8" />
          Details
          <button
            type="button"
            className="flex h-full w-8 items-center justify-end"
            onClick={closeHandler}
          >
            <ArrowDown className="size-6" />
          </button>
        </DialogTitle>
        <div>
          <Grey3DBox>
            <div className="flex items-center gap-2 text-[1.1875rem] font-bold leading-[120%] text-text-80">
              <Lightning className="size-6" />
              Boost
            </div>
            <Switch />
          </Grey3DBox>
          <Text className="mt-3">
            Boost is a special feature of Axelar and Squid that reduces transaction time
            across chains to 5-30 seconds. It is currently available for swaps below a
            value of $20,000 USD.
          </Text>
        </div>
        <div>
          <Grey3DBox>
            <div className="flex items-center gap-2 text-[1.1875rem] font-bold leading-[120%] text-text-80">
              <Gas className="size-6" />
              Arrival gas
            </div>
            <Switch />
          </Grey3DBox>
          <Text className="mt-3">
            Swap some of your tokens for gas on the destination chain.
          </Text>
        </div>
        <div>
          <NetworkSelector />
          <Text className="mt-3">
            Representation tokens can be given only on supported chains. <br /> You can
            change network.
          </Text>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-[1.125rem] font-bold">Summary</h3>
          <div className="flex flex-col gap-3">
            <Line title="Convert from" value="0.0 USDC" usd="0.00" />
            <Line title="Min receive" value="0.0 USDC" usd="0.00" />
            <Line title="Exchange rate" value="0.00 USDC = 0.00 USDT" />
            <Line title="Gas to receive" value="0.00425 OP" usd="1.84" />
          </div>
        </div>
        <div className="block h-px w-full bg-stroke-100" />
        <div className="flex flex-col gap-4">
          <h3 className="text-[1.125rem] font-bold">Fee breakdown</h3>
          <div className="flex flex-col gap-3">
            <Line title="Cross-chain gas fees" value="0.0 USDC" usd="0.00" />
            <Line title="Expected gas refund" value="- 0.00 OP" usd="0.00" />
            <Line title="Boost fee" value="+ 0.00 OP" usd="0.00" />
            <Line title="Total" value="0.00 OP" usd="0.00" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Details
