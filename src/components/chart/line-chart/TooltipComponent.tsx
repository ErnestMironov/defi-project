import Dot from '@assets/icons/dot.svg'
import { cn } from '@utils/cn'
import dayjs from 'dayjs'
import type { ComponentProps } from 'react'

import { getDotStyles } from './utils/chart-helpers'

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
    <div className="flex flex-col gap-1 rounded-xl border border-stroke-100 bg-cards-widget px-4 py-3 shadow-test">
      <div className="text-sm text-text-2100">
        {dayjs(data[0].timestamp).format('DD MMM HH:mm')}
      </div>
      <div className="flex flex-col gap-[0.38rem]">
        {data.map((item, i) => {
          if (!item.value) return null
          return (
            <div key={i} className="flex items-center gap-3">
              <Dot
                className={cn(
                  getDotStyles(item.color),
                  'max-lg:size-[0.375rem] overflow-visible',
                )}
              />
              <div className="text-base lg:text-[1.125rem]">{formatter(item.value)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
