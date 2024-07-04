import { useMaatTokensApy } from '@api/queries/useMaatTokensApy'
import Dot from '@assets/icons/dot.svg'
import { LineChartComponent } from '@components/chart/line-chart/LineChart'
import { getDotStyles } from '@components/chart/line-chart/utils/chart-helpers'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { Skeleton } from '@components/ui/skeleton'
import useDeviceWidth from '@hooks/useDeviceWidth'
import { cn } from '@utils/cn'
import dayjs from 'dayjs'
import { type ComponentProps, useState } from 'react'

interface LineChartModuleProperties extends ComponentProps<'div'> {}

const chartData: { title: string; color: '#6160FF' | '#A6C1FF' }[] = [
  { title: 'USDC', color: '#6160FF' },
  { title: 'USDT', color: '#A6C1FF' },
]
export const FRAMES = ['1D', '1W', '1M', '3M', 'MAX']
export type FrameType = (typeof FRAMES)[number]

export const ApyChartModule = (_props: LineChartModuleProperties) => {
  const { isBelowDesktop } = useDeviceWidth()
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(1)
  const [currentFrame, setCurrentFrame] = useState<FrameType>('MAX')
  const onFrameChange = (frame: FrameType) => {
    setCurrentFrame(frame)
    switch (frame) {
      case '1D': {
        setCurrentTimestamp(dayjs().subtract(1, 'day').valueOf())
        break
      }
      case '1W': {
        setCurrentTimestamp(dayjs().subtract(1, 'week').valueOf())
        break
      }
      case '1M': {
        setCurrentTimestamp(dayjs().subtract(1, 'month').valueOf())
        break
      }
      case '3M': {
        setCurrentTimestamp(dayjs().subtract(3, 'month').valueOf())
        break
      }
      case 'MAX': {
        setCurrentTimestamp(1)
        break
      }
      default: {
        break
      }
    }
  }
  const { data, loading, error } = useMaatTokensApy({ from: currentTimestamp })

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

  if (isBelowDesktop) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <h2 className="flex-1 text-2xl uppercase lg:text-[1.5625rem]">APY</h2>
          <FramesSelect
            frame={currentFrame}
            frames={FRAMES}
            onFrameChange={(frame) => onFrameChange(frame as FrameType)}
          />
        </div>
        <div className="mt-[0.81rem] flex flex-col justify-center gap-2">
          {chartData.map((item) => {
            return (
              <button
                type="button"
                key={item.title}
                className="flex items-center gap-[0.56rem]"
              >
                <Dot
                  className={cn(
                    getDotStyles(item.color),
                    'max-lg:size-2 overflow-visible',
                  )}
                />
                <span className="text-[0.75rem]/[0.9rem]">{item.title}</span>
              </button>
            )
          })}
        </div>
        <div className="-ml-2 mt-[3.13rem] h-[10.5625rem]">{renderBody()}</div>
      </div>
    )
  }
  return (
    <div>
      <div className="flex items-center justify-between px-3">
        <h2 className="flex-1 text-[1.5625rem] uppercase">APY</h2>
        <div className="flex flex-[2] items-center justify-center gap-[3.56rem]">
          {chartData.map((item) => {
            return (
              <div key={item.title} className="flex items-center gap-[0.56rem]">
                <Dot className={getDotStyles(item.color)} />
                <span className="text-[0.75rem]">{item.title}</span>
              </div>
            )
          })}
        </div>
        <FramesSelect
          frame={currentFrame}
          frames={FRAMES}
          onFrameChange={(frame) => onFrameChange(frame as FrameType)}
        />
      </div>
      <div className="mt-6 h-72">{renderBody()}</div>
    </div>
  )
}
