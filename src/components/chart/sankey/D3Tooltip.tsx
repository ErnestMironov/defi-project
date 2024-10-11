/* eslint-disable @typescript-eslint/no-explicit-any */
import Arrow from '@assets/icons/arrow.svg'
import { ScanLink } from '@components/scan-link/ScanLink'
import { TokenIconComponent } from '@components/token-icon'
import { formatAmount, formatPercentValue } from '@utils/formatValue'
import { getFromNow } from '@utils/get-day-difference'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { forwardRef } from 'react'

import type { GeneratedSankeyLink } from './SankeyD3'

export type SankeyTooltipContentType = GeneratedSankeyLink & {
  x: number
  y: number
}

type TooltipComponentProperties = {
  isOpen: boolean
  tooltipContent: SankeyTooltipContentType
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export const D3TooltipComponent = forwardRef(
  (props: TooltipComponentProperties, reference: any) => {
    const { isOpen, tooltipContent, ...rest } = props
    const { source, target } = tooltipContent
    const apySource = source?.strategy?.apy
    const apyTarget = target?.strategy?.apy
    const timestamp = source?.creation_time
    const symbol = source?.vault.token.symbol
    const hash = source?.hash
    const chainId = source?.vault.chain_id

    const value = tooltipContent?.value
    const isValidValue =
      value === 0 || (typeof value === 'number' && !Number.isNaN(value))

    return (
      <div
        {...rest}
        ref={reference}
        className={clsx(
          'absolute z-10 flex flex-col flex-nowrap gap-5 rounded-2xl bg-cards px-5 py-4 text-text shadow-md transition-all duration-300 ease-in-out [box-shadow:0px_2.556px_5.111px_0px_rgba(0,_0,_0,_0.04)]',
          isOpen ? 'opacity-1' : 'opacity-0',
        )}
      >
        <div className="flex items-center gap-2">
          <TokenIconComponent symbol={symbol} className="size-6 overflow-visible" />
          <p className="text-[1.375rem]">
            {formatAmount(value, {
              notation: 'compact',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="text-base text-text-80">
          <div className="flex items-center">
            {isValidValue && (
              <>
                <span>{formatPercentValue(apySource)}</span>
                <span className="ml-1">APY</span>
                <Arrow className="mx-2 size-4" />
              </>
            )}
            <span>{formatPercentValue(apyTarget)}</span>
            <span className="ml-1">APY</span>
          </div>
          <div className="mt-2">
            <span>{getFromNow(timestamp)}</span>
            <span className="ml-2">
              ({dayjs(timestamp).format('DD.MM.YY')} {dayjs(timestamp).format('HH:MM')})
            </span>
          </div>
        </div>
        <ScanLink className="text-blue1" txHash={hash} chainId={chainId}>
          View in Explorer
        </ScanLink>
      </div>
    )
  },
)
