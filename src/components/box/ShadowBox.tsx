import clsx from 'clsx'
import type { ComponentProps } from 'react'

interface ShadowBoxProperties extends ComponentProps<'div'> {}

export const ShadowBox = (props: ShadowBoxProperties) => {
  const { children, className } = props
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-3xl bg-white shadow-shadow dark:shadow-dark-shadow',
        className,
      )}
    >
      {children}
    </div>
  )
}
