import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import React from 'react'

interface TVLDisplayProperties extends ComponentProps<'div'> {}

export const TVLDisplay: React.FC<TVLDisplayProperties> = ({ className }) => {
  return (
    <div
      className={cn(
        'flex items-center gap-3 text-[1.125rem] lg:text-[1.25rem] leading-[120%]',
        className,
      )}
    >
      <span className="text-[#9998B8]">TVL</span>
      <span>$ 330 345.23</span>
    </div>
  )
}
