import CalendarIcon from '@assets/icons/calendar.svg'
import { TokenIconComponent } from '@components/token-icon'
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
  console.log(data)
  const formatColorAttribute = (item: TooltipDataType): JSX.Element => {
    switch (item.dataType) {
      case 'TVL': {
        const value = formatter(item.value).split(',')[0]
        return (
          <span>
            <span className="text-[#FFFFFF99]">{value.charAt(0)}</span>
            <span>{value.slice(1)}</span>
          </span>
        )
      }
      case 'APY': {
        const value = formatter(item.value).split(',')[0]
        return (
          <span>
            <span className="text-[#FFFFFF99]">{value.at(-1)}</span>{' '}
            <span>{value.slice(0, -1)}</span>
          </span>
        )
      }
      default: {
        return <></>
      }
    }
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
              <div className="">{formatColorAttribute(item)}</div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderUsdcBody = (values: TooltipDataType[]) => {
    return (
      <div className="flex flex-row items-center justify-center gap-[0.38rem] rounded-lg border border-stroke-40100 bg-cards-widget  text-[0.75rem] leading-4 shadow-test">
        <div className="border-r border-stroke-100">
          <div className="flex items-center gap-1 p-[0.38rem]">
            <CalendarIcon className="size-3 " />
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
                className="flex items-center justify-center gap-1 rounded  p-2 py-[0.38rem] text-text-100"
              >
                <TokenIconComponent symbol={item.icon} className="size-4" />
                <p>{formatter(item.value)}</p>
                <div className="">{formatColorAttribute(item)}</div>
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
