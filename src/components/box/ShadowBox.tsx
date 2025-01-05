import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

interface ShadowBoxProperties extends ComponentProps<'div'> {}

export const ShadowBox = (props: ShadowBoxProperties) => {
  const { children, className } = props
  return (
    <div
      {...props}
      className={cn(
        'relative overflow-hidden rounded-3xl border border-stroke-100 bg-cards-widget shadow-test',
        className,
      )}
    >
      {children}
    </div>
  )
}
