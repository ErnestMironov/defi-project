import type { RechartDataType } from '@components/chart/line-chart/AreaChart'
import { AreaChart } from '@components/chart/line-chart/AreaChart'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import { MultiSelect } from '@components/select/MultiSelect'
import type { OptionType } from '@components/select/Select'
import { SELECT_CHAINS, SELECT_PROTOCOLS } from '@constants/select-constant'
import { cn } from '@utils/cn'
import { type ComponentProps, useState } from 'react'

interface TokenTvlChartProperties extends ComponentProps<'div'> {
  data: RechartDataType[]
}

export const TokenTvlChart = (props: TokenTvlChartProperties) => {
  const { className, data, ...rest } = props
  const { currentFrame, frames, onFrameChange } = useFrameSelect()
  const [currentChain, setCurrentChain] = useState<OptionType[]>([])
  const [currentProtocol, setCurrentProtocol] = useState<OptionType[]>([])
  return (
    <div className={cn('flex flex-col gap-8', className)} {...rest}>
      <div className="flex items-center justify-between">
        <h3 className="text-[2rem]/[2.4rem]">TVL</h3>
        <div className="flex items-center gap-3 *:h-[2.6875rem]">
          <MultiSelect
            options={SELECT_CHAINS}
            value={currentChain}
            onChange={setCurrentChain}
            className="w-40"
            classNames={{ content: 'w-full' }}
            placeholder="All Chains"
          />
          <MultiSelect
            options={SELECT_PROTOCOLS}
            value={currentProtocol}
            onChange={setCurrentProtocol}
            className="w-40"
            classNames={{ content: 'w-full' }}
            placeholder="All Protocols"
          />
          <FramesSelect
            frame={currentFrame}
            frames={frames}
            onFrameChange={onFrameChange}
          />
        </div>
      </div>
      <AreaChart data={data} color="#A6C1FF" yAxisType="usd" />
    </div>
  )
}
