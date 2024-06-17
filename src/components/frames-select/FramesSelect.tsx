import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

interface FramesSelectProperties extends ComponentProps<'div'> {
  frame: string
  frames: string[]
  onFrameChange: (frame: string) => void
}

export const FramesSelect = ({
  className,
  frame,
  frames,
  onFrameChange,
  ...rest
}: FramesSelectProperties) => {
  return (
    <div
      className={cn(
        'flex overflow-hidden rounded-full border border-[#DEDDEC]',
        className,
      )}
      {...rest}
    >
      {frames.map((item, i, array) => (
        <div
          key={item}
          className={cn(
            'flex items-center justify-center px-3 py-2 text-sm text-text-80 hover:bg-[#F0EFF5] cursor-pointer relative after:right-0 after:w-[1px] after:absolute after:h-full ' /* dark:hover:bg-[#3A3944] */,
            frame === item && 'bg-[#F0EFF5]',
            i === 0 && 'pl-4',
            i === array.length - 1 ? 'pr-4' : 'after:bg-[#DEDDEC]',
          )}
          onClick={() => onFrameChange(item)}
        >
          <div>{item}</div>
        </div>
      ))}
    </div>
  )
}
