import { TokenIconComponent } from '@components/token-icon'
import { cn } from '@utils/cn'
import dayjs from 'dayjs'
import type { ComponentProps } from 'react'

export type StrategyDataType = {
  symbol: string
  chain: string
  protocol: string
  value: string
  color: string
}

interface StrategyTooltipComponentProperties extends ComponentProps<'div'> {
  timestamp: number
  data: StrategyDataType[]
  dataKey: string
}

export const StrategyTooltipComponent = (props: StrategyTooltipComponentProperties) => {
  const { className, data, timestamp, dataKey, ...rest } = props
  return (
    <div
      className={cn(
        'p-4 bg-cards rounded-[1.25rem] min-w-[13rem] shadow-md text-base text-text-80',
        className,
      )}
      {...rest}
    >
      <div className="flex items-center justify-between">
        <p className="text-gray-100">{dayjs(timestamp).format('DD MMM YYYY')}</p>
        <p className="uppercase">{dataKey}</p>
      </div>
      <div className="mt-6 space-y-4 text-semi-base">
        {data.map((item, i) => {
          return (
            <div key={i} className="flex items-center gap-3">
              <div
                className="size-[10px] rounded-full border-[3px] border-solid"
                style={{ borderColor: item.color }}
              />
              <div className="flex flex-1 items-center -space-x-1.5 [&_path]:opacity-100">
                {[item.symbol, item.chain, item.protocol].map((symbol, index) => {
                  return (
                    <TokenIconComponent
                      key={index}
                      symbol={symbol}
                      className="size-[1.375rem]"
                    />
                  )
                })}
              </div>
              <div>{item.value}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
