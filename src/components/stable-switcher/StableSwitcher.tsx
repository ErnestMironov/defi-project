import { AnimatedTabs } from '@components/tab/AnimatedTabs'
import type { ComponentProps } from 'react'

export const STABLE_TYPE = {
  USDT: 'USDT',
  USDC: 'USDC',
} as const
export type StableType = (typeof STABLE_TYPE)[keyof typeof STABLE_TYPE]

interface TxTypeSwitcherProperties extends ComponentProps<'div'> {
  activeTab: StableType
  setActiveTab: (tab: StableType) => void
}

const TABS = [
  { id: STABLE_TYPE.USDT, label: 'USDT' },
  { id: STABLE_TYPE.USDC, label: 'USDC' },
]

export const StableSwitcher = ({
  activeTab,
  setActiveTab,
  ...props
}: TxTypeSwitcherProperties) => {
  return (
    <AnimatedTabs
      {...props}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={(value) => setActiveTab(value as StableType)}
      classNames={{
        activeTab: 'bg-gray-100',
        tab: 'w-[9.21rem]',
      }}
    />
  )
}
