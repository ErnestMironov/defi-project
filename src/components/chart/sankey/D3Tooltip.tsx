/* eslint-disable @typescript-eslint/no-explicit-any */
import Arrow from '@assets/icons/arrow.svg'
import { TokenIconComponent } from '@components/token-icon'
import { getFromNow } from '@utils/get-day-difference'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { forwardRef } from 'react'

type TooltipComponentProperties = {
  isOpen: boolean
  tooltipContent: any
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export const D3TooltipComponent = forwardRef(
  (props: TooltipComponentProperties, reference: any) => {
    const { isOpen, tooltipContent, ...rest } = props

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
          <TokenIconComponent
            symbol={tooltipContent?.symbol}
            className="size-6 overflow-visible"
          />
          <p className="text-[1.375rem]">{tooltipContent?.value.toFixed(2)}</p>
        </div>
        <div className="text-base text-text-80">
          <div className="flex items-center">
            <span>800.98%</span>
            <Arrow className="mx-2 [&_path]:fill-text" />
            <span>834.71%</span>
            <span className="ml-1">APY</span>
          </div>
          <div className="mt-2">
            <span>{getFromNow(tooltipContent?.timestamp)}</span>
            <span className="ml-2">
              ({dayjs(tooltipContent?.timestamp).format('DD.MM.YY')}{' '}
              {dayjs(tooltipContent?.timestamp).format('HH:MM')})
            </span>
          </div>
        </div>
        {/* <div className="text-blue1">View in Explorer</div> */}
      </div>
    )
  },
)
