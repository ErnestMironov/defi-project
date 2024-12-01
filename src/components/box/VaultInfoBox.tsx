import PointIcon from '@assets/icons/point-icon.svg'
import type { ComponentProps, ReactNode } from 'react'

import { ShadowBox } from './ShadowBox'

interface VaultInfoBoxProperties extends ComponentProps<'div'> {
  vaultName: string
  apy: string | ReactNode
}

export const VaultInfoBox = (props: VaultInfoBoxProperties) => {
  const { vaultName, apy, children } = props
  return (
    <ShadowBox className="relative flex flex-col gap-1 overflow-hidden rounded-3xl bg-cards px-6 py-8 shadow-shadow dark:shadow-dark-shadow max-lg:gap-[0.12rem] max-lg:rounded-2xl max-lg:px-4 max-lg:py-[1.44rem]">
      <div className="text-lg/[120%] text-gray-100 max-lg:text-base">{vaultName}</div>
      <div className="text-text flex items-center gap-2 text-[1.875rem]/[1] max-lg:text-[1em]">
        {apy} + <PointIcon className="size-[1.875rem]" />
      </div>
      {children}
    </ShadowBox>
  )
}
