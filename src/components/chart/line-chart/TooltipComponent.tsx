/* eslint-disable react/no-array-index-key */
import Dot from '@assets/icons/dot.svg'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import type { LineChartColor } from './LineChart'
import { getDotStyles } from './utils/chart-helpers'

type TooltipDataType = {
  color: LineChartColor
  value: string
  apy: string
}

interface TooltipComponentProperties extends ComponentProps<'div'> {
  data: TooltipDataType[]
}

export const TooltipComponent = ({ data }: TooltipComponentProperties) => {
  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-cards px-[0.94rem] py-3 shadow-md lg:px-4">
      <div className="text-[0.75rem] text-gray-100 lg:text-[0.79863rem]">
        29 May 00:00
      </div>
      <div className="flex flex-col gap-[0.38rem]">
        {data.map((item, i) => {
          return (
            <div key={i} className="flex items-center gap-3">
              <Dot
                className={cn(
                  getDotStyles(item.color),
                  'max-lg:size-[0.375rem] overflow-visible',
                )}
              />
              <div className="text-base lg:text-[1.125rem]">{item.value}</div>
              <div className="relative flex items-center justify-center overflow-hidden rounded-[0.31944rem] px-[0.32rem] py-[0.16rem] text-[0.75rem] lg:text-[0.95831rem]">
                <div
                  className="absolute inset-0 size-full opacity-15"
                  style={{ backgroundColor: item.color }}
                />
                <div style={{ color: item.color }} className="z-2 opacity-1 relative">
                  +{item.apy}%
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
