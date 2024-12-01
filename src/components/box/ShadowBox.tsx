import clsx from 'clsx'
import type { ComponentProps } from 'react'

interface ShadowBoxProperties extends ComponentProps<'div'> {}

export const ShadowBox = (props: ShadowBoxProperties) => {
  const { children, className } = props
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-3xl border border-[#E6E8F0] bg-cards shadow-test ',
        className,
      )}
    >
      {children}
    </div>
  )
}
