import CurveArrow from '@assets/icons/curve-arrow-down.svg'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

interface ArrowButtonProperties extends ComponentProps<'button'> {}

export const ArrowButton = (props: ArrowButtonProperties) => {
  const { className, ...rest } = props
  return (
    <button
      type="button"
      className={cn(
        'size-[2.625rem] rounded-[0.5rem] bg-main-15 flex items-center justify-center',
        className,
      )}
      {...rest}
    >
      <CurveArrow className="size-8 -rotate-90 [&_path]:stroke-main-100" />
    </button>
  )
}
