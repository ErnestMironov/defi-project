import { AreaChart } from '@components/chart/line-chart/AreaChart'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'

export type RechartDataType = {
  name: string
  timestamp: number
  value: number | null
}

interface AreaChartComponentProperties {}
const MOCK_APY_DATA: RechartDataType[] = [
  {
    timestamp: 1_700_000_000,
    value: 10,
    name: 'Strategy 1',
  },
  {
    timestamp: 170_000_100,
    value: 2,
    name: 'Strategy 2',
  },
  {
    timestamp: 170_000_200,
    value: 10,
    name: 'Strategy 3',
  },
]
export const StrategyApyChart = (_props: AreaChartComponentProperties) => {
  const { currentFrame, frames, onFrameChange } = useFrameSelect()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h3 className="text-[2rem]/[2.4rem]">APY</h3>
        <FramesSelect
          frame={currentFrame}
          frames={frames}
          onFrameChange={onFrameChange}
        />
      </div>
      <AreaChart data={MOCK_APY_DATA} color="#6160FF" yAxisType="percent" />
    </div>
  )
}
