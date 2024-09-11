import type { RechartDataType } from '@components/chart/line-chart/AreaChart'
import { AreaChart } from '@components/chart/line-chart/AreaChart'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'

interface AreaChartComponentProperties {
  data: RechartDataType[]
}

export const StrategyTvlChart = (props: AreaChartComponentProperties) => {
  const { data } = props
  const { currentFrame, frames, onFrameChange } = useFrameSelect()
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h3 className="text-[2rem]/[2.4rem]">TVL</h3>
        <FramesSelect
          frame={currentFrame}
          frames={frames}
          onFrameChange={onFrameChange}
        />
      </div>
      <AreaChart data={data} color="#A6C1FF" yAxisType="usd" />
    </div>
  )
}
