import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

export const STABLE_TYPE = {
  USDT: 'USDT',
  USDC: 'USDC',
} as const
export type StableType = (typeof STABLE_TYPE)[keyof typeof STABLE_TYPE]

interface TxTypeSwitcherProperties extends ComponentProps<'div'> {
  activeTab: StableType
  onTabChange: (tab: StableType) => void
  classNames?: {
    tab?: string
    activeTab?: string
    container?: string
  }
}

const TABS = [
  { id: STABLE_TYPE.USDT, label: 'USDT' },
  { id: STABLE_TYPE.USDC, label: 'USDC' },
]

export const StableSwitcher = ({
  activeTab,
  onTabChange,
  classNames,
  className,
}: TxTypeSwitcherProperties) => {
  return (
    <div
      className={cn(
        'flex items-center gap-4 text-[1.25rem] font-bold',
        classNames?.container,
        className,
      )}
    >
      {TABS.map((tab) => (
        <button
          type="button"
          key={tab.id}
          className={cn(
            activeTab === tab.id
              ? cn('bg-main-15 text-main-100', classNames?.activeTab)
              : 'bg-[#9998B81A] text-gray-80',
            'rounded-[1.25rem] p-6 transition-colors duration-200',
            classNames?.tab,
          )}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
    // <AnimatedTabs
    //   {...props}
    //   tabs={TABS}
    //   activeTab={activeTab}
    //   onTabChange={(value) => onTabChange(value as StableType)}
    //   classNames={{
    //     activeTab: 'bg-gray-100',
    //     tab: 'w-[9.21rem] max-lg:text-base max-lg:py-[0.62rem] max-lg:w-[6.375rem]',
    //     container: 'max-lg:p-[0.25rem]',
    //   }}
    // />
  )
}
