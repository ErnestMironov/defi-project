import type { RechartDataType } from '@components/chart/line-chart/AreaChart'
import { AreaChart } from '@components/chart/line-chart/AreaChart'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import type { OptionType } from '@components/select/Select'
import { Select } from '@components/select/Select'
import {
  SELECT_CHAINS,
  SELECT_PROTOCOLS,
} from '@constants/select-constant'
import { cn } from '@utils/cn'
import { type ComponentProps, useState } from 'react'

interface TokenApyChartProperties extends ComponentProps<'div'> {}

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

export const TokenApyChart = (props: TokenApyChartProperties) => {
  const { className, ...rest } = props
  const { currentFrame, frames, onFrameChange } = useFrameSelect()
  const [currentChain, setCurrentChain] = useState<OptionType>(SELECT_CHAINS[0])
  const [currentProtocol, setCurrentProtocol] = useState<OptionType>(SELECT_PROTOCOLS[0])
  return (
    <div className={cn('flex flex-col gap-8', className)} {...rest}>
      <div className="flex items-center justify-between">
        <h3 className="text-[2rem]/[2.4rem]">APY</h3>
        <div className="flex items-center gap-3">
          <Select
            className="h-[2.6875rem] w-[12.5rem] border-none px-4 py-3 text-base"
            options={SELECT_CHAINS}
            value={currentChain}
            onChange={setCurrentChain}
          />
          <Select
            className="h-[2.6875rem] w-[12.5rem] border-none px-4 py-3 text-base"
            options={SELECT_PROTOCOLS}
            value={currentProtocol}
            onChange={setCurrentProtocol}
          />
          <FramesSelect
            frame={currentFrame}
            frames={frames}
            onFrameChange={onFrameChange}
          />
        </div>
      </div>
      <AreaChart data={MOCK_APY_DATA} color="#6160FF" yAxisType="percent" />
    </div>
  )
}
