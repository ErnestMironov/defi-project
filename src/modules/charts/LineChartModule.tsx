import Dot from '@assets/icons/dot.svg'
import type { LineChartColor } from '@components/chart/line-chart/LineChart'
import { LineChartComponent } from '@components/chart/line-chart/LineChart'
import { getDotStyles } from '@components/chart/line-chart/utils/chart-helpers'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import type { ComponentProps } from 'react'

interface LineChartModuleProperties extends ComponentProps<'div'> {
  title: string
}

const chartData: { title: string; color: LineChartColor }[] = [
  { title: 'USDC', color: '#6160FF' },
  { title: 'USDT', color: '#A6C1FF' },
]

export const LineChartModule = (props: LineChartModuleProperties) => {
  const { title } = props
  return (
    <div>
      <div className="flex items-center justify-between px-3">
        <h2 className="flex-1 text-[1.5625rem] uppercase">{title}</h2>
        <div className="flex flex-[2] items-center justify-center gap-[3.56rem]">
          {chartData.map((item) => {
            return (
              <div className="flex items-center gap-[0.56rem]">
                <Dot className={getDotStyles(item.color)} />
                <span className="text-[0.75rem]">{item.title}</span>
              </div>
            )
          })}
        </div>
        <FramesSelect
          className=""
          frame="1W"
          frames={['1D', '1W', '1M', '3M', 'MAX']}
          onFrameChange={() => {}}
        />
      </div>
      <div className="mt-6 h-72">
        <LineChartComponent color="#6160FF" />
      </div>
    </div>
  )
}
