import PointIcon from '@assets/icons/point-icon.svg'
import { cn } from '@utils/cn'
import type { ComponentProps, ReactNode } from 'react'

import { ShadowBox } from '../../../../components/box/ShadowBox'

interface VaultInfoBoxProperties extends ComponentProps<'div'> {
  vaultName: string
  icon: ReactNode
  apy: string | ReactNode
  active?: boolean
  onClick?: () => void
}

export const VaultInfoBox = (props: VaultInfoBoxProperties) => {
  const { vaultName, apy, icon, children, active, onClick } = props
  return (
    <ShadowBox
      className={cn(
        'flex flex-[1_0_0] cursor-pointer items-center gap-2.5 rounded-2xl px-6 py-4 transition-all max-lg:px-3 max-lg:py-[0.62rem]',
        !active && 'border-transparent !shadow-none',
      )}
      onClick={onClick}
    >
      {icon}
      <div className="flex flex-col">
        <div className="font-medium leading-6">{vaultName} Vault</div>
        <div className="flex items-center gap-[0.2rem] text-[0.875rem] leading-4 text-text-2100 max-lg:text-[0.75rem]">
          Up to {apy} APY + <PointIcon className="size-4" />
        </div>
      </div>
      {children}
    </ShadowBox>
  )
}
