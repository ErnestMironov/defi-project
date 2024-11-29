import { AnimatedTabs } from '@components/tab/AnimatedTabs'
import { type ComponentProps, forwardRef } from 'react'

interface FramesSelectProperties extends ComponentProps<'div'> {
  frame: string
  frames: string[]
  onFrameChange: (frame: string) => void
}

export const FramesSelect = forwardRef<HTMLDivElement, FramesSelectProperties>(
  (
    { className, frame, frames, onFrameChange, ...rest }: FramesSelectProperties,
    reference,
  ) => {
    return (
      <AnimatedTabs
        {...rest}
        ref={reference}
        tabs={frames.map((item) => ({ id: item, label: item }))}
        activeTab={frame}
        onTabChange={(value) => onFrameChange(value)}
        className={className}
        classNames={{
          tab: 'py-[0.63rem] px-4 text-sm font-medium',
          container: 'p-1 rounded-[0.75rem] text-sm shadow-test',
          activeTab: 'rounded-[0.5rem] text-sm',
        }}
      />
    )
  },
)
