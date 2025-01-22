import CalendarIcon from '@assets/icons/calendar.svg'
import { TokenIconComponent } from '@components/token-icon'
import { cn } from '@utils/cn'
import dayjs from 'dayjs'
import type { ComponentProps } from 'react'

type TooltipDataType = {
  color: string
  value?: any
  apy?: string
  timestamp: string
  dataType: 'TVL' | 'APY' | 'USDC' | 'USDT'
  icon?: string
}

interface TooltipComponentProperties extends ComponentProps<'div'> {
  data: TooltipDataType[]
  formatter: (value: string) => string
}

export const TooltipComponent = ({ data, formatter }: TooltipComponentProperties) => {
  const formatColorAttribute = (
    item: TooltipDataType,
    symbolColor: string = '#8585A999',
  ): JSX.Element => {
    const value = formatter(item.value)

    if (value.startsWith('$')) {
      return (
        <span>
          <span className={cn(`text-[${symbolColor}]`)}>$</span>
          <span>{value.slice(1)}</span>
        </span>
      )
    }

    if (value.endsWith('%')) {
      return (
        <span>
          <span>{value.slice(0, -1)}</span>
          <span className={cn(`text-[${symbolColor}]`)}>%</span>
        </span>
      )
    }

    return <span>{value}</span>
  }
  const renderTvlOrApyBody = (values: TooltipDataType[]) => {
    return (
      <div className="flex flex-row items-center justify-center gap-[0.38rem] rounded-lg border border-stroke-40100 bg-cards-widget p-1 text-[0.6876rem] leading-4 shadow-test">
        <div className="flex items-center gap-1 p-[0.38rem] ">
          <CalendarIcon className="size-3 " />
          <p>
            {dayjs(data[0].timestamp).format('DD MMM')},{' '}
            <span className="text-text-260">
              {dayjs(data[0].timestamp).format('YYYY')}
            </span>
          </p>
        </div>

        {values.map((item, i) => {
          if (!item.value) return null
          return (
            <div
              key={i}
              className="flex items-center justify-center gap-1 rounded bg-main-100 px-2 py-[0.38rem] text-white"
            >
              <p>{item.dataType}</p>
              <div>{formatColorAttribute(item, '#FFFFFF99')}</div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderUsdcBody = (values: TooltipDataType[]) => {
    return (
      <div className="flex flex-row items-center justify-center rounded-lg border border-stroke-40100 bg-cards-widget  text-[0.75rem] leading-4 shadow-test">
        <div className="border-r border-stroke-100">
          <div className="flex items-center gap-1 p-2 text-text-100">
            <CalendarIcon className="size-3" />
            <p>
              {dayjs(data[0].timestamp).format('DD MMM')},{' '}
              <span className="text-text-260">
                {dayjs(data[0].timestamp).format('YYYY')}
              </span>
            </p>
          </div>
        </div>
        {values.map((item, i: number) => {
          return (
            <div className="border-r border-stroke-100">
              <div
                key={i}
                className="flex items-center justify-center gap-1 rounded  p-2  text-text-100"
              >
                <TokenIconComponent symbol={item.icon} className="size-4" />
                <p className="">{formatColorAttribute(item)}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return data[0].dataType === 'USDC' || data[0].dataType === 'USDT'
    ? renderUsdcBody(data)
    : renderTvlOrApyBody(data)
}
