import type { ComponentProps } from 'react'

import { ShadowBox } from './ShadowBox'

interface ShadowBoxProperties extends ComponentProps<'div'> {
  label: string
  value: string
}

export const ShadowBoxWithValue = (props: ShadowBoxProperties) => {
  const { label, value, children } = props
  return (
    <ShadowBox className="relative flex flex-col gap-1 overflow-hidden rounded-3xl bg-white px-6 py-8 shadow-shadow dark:shadow-dark-shadow">
      <div className="text-lg uppercase text-gray">{label}</div>
      <div className="text-3xl text-text-100">{value}</div>
      {children}
    </ShadowBox>
  )
}
