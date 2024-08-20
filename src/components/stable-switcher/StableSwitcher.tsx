import { BaseTabs } from '@components/tab/BaseTabs'
import type { ComponentProps } from 'react'

export const STABLE_TYPE = {
  USDT: 'USDT',
  USDC: 'USDC',
} as const
const TABS = [STABLE_TYPE.USDT, STABLE_TYPE.USDC]
export type StableType = (typeof STABLE_TYPE)[keyof typeof STABLE_TYPE]

interface TxTypeSwitcherProperties extends ComponentProps<'div'> {
  activeTab: string
  onTabChange: (tab: string) => void
  classNames?: {
    tab?: string
    activeTab?: string
    container?: string
  }
}

export const StableSwitcher = ({
  activeTab,
  onTabChange,
  classNames,
  className,
}: TxTypeSwitcherProperties) => {
  return (
    <BaseTabs
      classNames={classNames}
      className={className}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={(tab) => onTabChange(tab as StableType)}
    />
  )
}
