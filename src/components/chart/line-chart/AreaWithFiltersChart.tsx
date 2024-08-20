import { FramesSelect } from '@components/frames-select/FramesSelect'
import type { FrameType } from '@components/frames-select/useFrameSelect'
import { cn } from '@utils/cn'

import {
  AreaChart,
  type AreaChartComponentProperties,
  type RechartDataType,
} from './AreaChart'

interface AreaWithFiltersChartProperties extends AreaChartComponentProperties {
  data: RechartDataType[]
  yAxisType: 'percent' | 'usd'
  currentFrame: FrameType
  frames: FrameType[]
  onFrameChange: (frame: FrameType) => void
  title: string
}

export const AreaWithFiltersChart = (props: AreaWithFiltersChartProperties) => {
  const {
    className,
    data,
    currentFrame,
    frames,
    onFrameChange,
    color,
    yAxisType,
    title,
  } = props
  return (
    <div className={cn('flex flex-col gap-8', className)}>
      <div className="flex items-center">
        <h3 className="text-[2rem]/[2.4rem]">{title}</h3>
        <FramesSelect
          className="ml-auto"
          frame={currentFrame}
          frames={frames}
          onFrameChange={onFrameChange}
        />
      </div>
      <AreaChart data={data} color={color} yAxisType={yAxisType} />
    </div>
  )
}
