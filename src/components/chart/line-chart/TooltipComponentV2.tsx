import CalendarIcon from '@assets/icons/calendar.svg'
import { cn } from '@utils/cn'
import dayjs from 'dayjs'
import type { ComponentProps } from 'react'

type TooltipDataType = {
  color: string
  value?: any
  apy?: string
  timestamp: string
}

interface TooltipComponentProperties extends ComponentProps<'div'> {
  data: TooltipDataType[]
  formatter: (value: string) => string
}

export const TooltipComponent = ({ data, formatter }: TooltipComponentProperties) => {
  return (
    <div className="flex items-center gap-1 rounded-xl border border-stroke-100 bg-cards-widget p-1 shadow-test">
      <div className="flex items-center gap-1 self-start p-[0.38rem]">
        <CalendarIcon className="size-4" />
        <p>
          {dayjs(data[0].timestamp).format('MMM DD')}
          <span className="text-text-2100">
            , {dayjs(data[0].timestamp).format('YYYY')}
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-[0.38rem]">
        {data.map((item, i) => {
          if (!item.value) return null
          return (
            <div
              key={i}
              className={cn(
                'flex items-center gap-3 rounded-[0.25rem] px-2 py-[0.38rem]',
              )}
              style={{ backgroundColor: item.color }}
            >
              <div className="text-white">{formatter(item.value)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
