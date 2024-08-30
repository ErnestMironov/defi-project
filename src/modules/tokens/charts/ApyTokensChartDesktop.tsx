/* eslint-disable sonarjs/no-identical-functions */
import { useMaatTokensApy } from '@api/queries/useMaatTokensApy'
import Dot from '@assets/icons/dot.svg'
import { LineChartComponent } from '@components/chart/line-chart/LineChart'
import { getDotStyles } from '@components/chart/line-chart/utils/chart-helpers'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import { MultiSelect } from '@components/select/MultiSelect'
import { type OptionType } from '@components/select/Select'
import { Skeleton } from '@components/ui/skeleton'
import { CHART_TOKENS } from '@constants/chart-tokens'
import { SELECT_CHAINS, SELECT_PROTOCOLS } from '@constants/select-constant'
import { cn } from '@utils/cn'
import { type ComponentProps, useState } from 'react'

interface ApyTokensChartDesktopProperties extends ComponentProps<'div'> {}

export const ApyTokensChartDesktop = (_props: ApyTokensChartDesktopProperties) => {
  const { currentFrame, frames, onFrameChange, currentTimestamp } = useFrameSelect()
  const { data, loading, error } = useMaatTokensApy({ from: currentTimestamp })
  const [selectedChain, setSelectedChain] = useState<OptionType[]>([])
  const [selectedProtocol, setSelectedProtocol] = useState<OptionType[]>([])
  const renderBody = () => {
    switch (true) {
      case loading:
      case !!error: {
        return <Skeleton className="size-full rounded-3xl" />
      }
      default: {
        return <LineChartComponent data={data} yPostfix="%" frame={currentFrame} />
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between px-4">
        <h2 className="flex-1 text-[2rem]/[2.4rem] uppercase">APY</h2>
        <div className="flex h-[2.6875rem] items-center gap-3">
          <MultiSelect
            options={SELECT_CHAINS}
            value={selectedChain}
            onChange={setSelectedChain}
            placeholder="All Chains"
            className="w-40"
            classNames={{ content: 'w-full' }}
          />
          <MultiSelect
            options={SELECT_PROTOCOLS}
            value={selectedProtocol}
            onChange={setSelectedProtocol}
            placeholder="All Protocols"
            className="w-40"
            classNames={{ content: 'w-full' }}
          />
          <FramesSelect
            frame={currentFrame}
            frames={frames}
            onFrameChange={onFrameChange}
          />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4 px-4">
        {CHART_TOKENS.map((item) => {
          return (
            <div key={item.title} className="flex items-center gap-[0.56rem]">
              <Dot
                className={cn(
                  getDotStyles(item.color),
                  'w-2.5 h-[0.625rem] overflow-visible',
                )}
              />
              <span className="text-[0.875rem]/[1.05rem]">{item.title}</span>
            </div>
          )
        })}
      </div>
      <div className="mt-4 h-72">{renderBody()}</div>
    </div>
  )
}
