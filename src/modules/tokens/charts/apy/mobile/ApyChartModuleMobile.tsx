import { useMaatTokensApy } from '@api/queries/useMaatTokensApy'
import Dot from '@assets/icons/dot.svg'
import Filter from '@assets/icons/filter.svg'
import { LineChartComponent } from '@components/chart/line-chart/LineChart'
import { getDotStyles } from '@components/chart/line-chart/utils/chart-helpers'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import { useState } from 'react'

import { MobileFiltersDrawer } from './MobileFiltersDrawer'

const chartData: { title: string; color: '#6160FF' | '#A6C1FF' }[] = [
  { title: 'USDC', color: '#6160FF' },
  { title: 'USDT', color: '#A6C1FF' },
]

export const ApyChartModuleMobile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { currentFrame, currentTimestamp, frames, onFrameChange } = useFrameSelect()
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
  return (
    <div>
      <div className="flex items-start">
        <div className="flex flex-col justify-center gap-2">
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
        <FramesSelect
          className="ml-auto h-10"
          frame={currentFrame}
          frames={frames}
          onFrameChange={onFrameChange}
        />
        <MobileFiltersDrawer isOpen={isOpen} onOpenChange={setIsOpen}>
          <button
            type="button"
            onClick={() => {
              setIsOpen(true)
            }}
            className="ml-3 flex size-10 items-center justify-center rounded-lg bg-cards"
          >
            <Filter className="size-6" />
          </button>
        </MobileFiltersDrawer>
      </div>
      <div className="-ml-4 mt-6 h-[10.125rem]">{renderBody()}</div>
    </div>
  )
}
