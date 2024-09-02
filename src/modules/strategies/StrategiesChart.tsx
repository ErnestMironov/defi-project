import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import type { OptionType } from '@components/select/Select'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { cn } from '@utils/cn'
import { type ComponentProps, useState } from 'react'

import { COLORS, MultiColoredLineChart } from './components/MultiColoredLineChart'
import { SelectPopover } from './components/SelectMenu'
import { StrategyRow } from './components/StrategyRow'

type ChartDataType = {
  name: string
  timestamp: number
  values: (number | null)[]
}

type StrategyType = {
  symbol: string
  chain: string
  protocol: string
}

interface StrategiesChartProperties extends ComponentProps<'div'> {
  selectStrategies: OptionType[]
  strategies: StrategyType[]
  chartData: ChartDataType[]
  title: string
  yAxisType?: 'percent' | 'usd'
}

export const StrategiesChart = (props: StrategiesChartProperties) => {
  const {
    className,
    selectStrategies,
    strategies: strategiesData,
    chartData: apyData,
    title,
    yAxisType = 'usd',
    ...rest
  } = props
  const [strategies, setStrategies] = useState(selectStrategies[0])

  const {
    currentFrame,
    currentTimestamp: _currentTimestamp,
    frames,
    onFrameChange,
  } = useFrameSelect()
  return (
    <div className={cn('flex w-full gap-5', className)} {...rest}>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h2 className="text-[2rem]/[2.4rem]">{title}</h2>
          <FramesSelect
            frame={currentFrame}
            frames={frames}
            onFrameChange={onFrameChange}
          />
        </div>
        <MultiColoredLineChart
          className="mt-6 h-[26.5625rem]"
          data={apyData}
          frame="MAX"
          yAxisType={yAxisType}
        />
      </div>
      <div className="w-[27.0625rem] rounded-3xl bg-cards px-5 py-6">
        <SelectPopover
          options={selectStrategies}
          value={strategies}
          onChange={(option) => setStrategies(option)}
        />
        <ScrollArea className="-mx-4 mt-8 px-4">
          <div className="max-h-[22.75rem] space-y-3 ">
            {strategiesData.map((strategy, index) => (
              <StrategyRow color={COLORS[index]} {...strategy} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
