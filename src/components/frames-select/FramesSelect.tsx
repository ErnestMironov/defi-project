import { AnimatedTabs } from '@components/tab/AnimatedTabs'
import { type ComponentProps, forwardRef } from 'react'

interface FramesSelectProperties extends ComponentProps<'div'> {
  frame: string
  frames: string[]
  onFrameChange: (frame: string) => void
}

// export const FramesSelect = forwardRef<HTMLDivElement, FramesSelectProperties>(
//   (
//     { className, frame, frames, onFrameChange, ...rest }: FramesSelectProperties,
//     reference,
//   ) => {
//     return (
//       <div
//         ref={reference}
//         className={cn('flex overflow-hidden rounded-[0.75rem] bg-cards', className)}
//         {...rest}
//       >
//         {frames.map((item, i, array) => (
//           <div
//             key={item}
//             className={cn(
//               'flex items-center justify-center px-4 py-[0.66rem] text-[0.75rem] lg:text-[0.9375rem]/[1.3125rem] text-text-80 cursor-pointer relative after:right-0 after:w-[1px] after:absolute after:h-full',
//               frame === item
//                 ? 'bg-dark-blue-15'
//                 : 'hover:bg-[#DEDDEC4D] dark:hover:bg-black/20',
//               i === 0 && 'pl-4',
//               i === array.length - 1 ? 'pr-4' : 'after:bg-stroke-100',
//             )}
//             onClick={() => onFrameChange(item)}
//           >
//             <div>{item}</div>
//           </div>
//         ))}
//       </div>
//     )
//   },
// )
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
