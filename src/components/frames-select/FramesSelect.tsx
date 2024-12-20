import { AnimatedTabs } from '@components/tab/AnimatedTabs'
import { type ComponentProps, forwardRef } from 'react'

interface FramesSelectProperties extends ComponentProps<'div'> {
  frame: string
  frames: { id: string; label: string }[]
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
        tabs={frames}
        activeTab={frame}
        onTabChange={(value) => onFrameChange(value)}
        className={className}
        classNames={{
          tab: 'py-[0.63rem] px-4 shrink-0 text-sm max-lg:text-[0.75rem]/[1.25rem] font-medium max-lg:py-[0.38rem] max-lg:px-2',
          container: 'p-1 max-lg:p-[0.38rem] rounded-[0.75rem] text-sm shadow-test',
          activeTab: 'rounded-[0.5rem] text-sm shrink-0',
        }}
      />
    )
  },
)
