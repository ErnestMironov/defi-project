import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

export type TabType = {
  id: string
  label: string
}

interface BaseTabsProperties<T> extends ComponentProps<'div'> {
  tabs: T[]
  activeTab: T
  onTabChange: (tab: T) => void
  classNames?: {
    tab?: string
    activeTab?: string
    container?: string
  }
}

export const BaseTabs = <T extends TabType | string>(props: BaseTabsProperties<T>) => {
  const { className, classNames, tabs, activeTab, onTabChange, ...rest } = props
  const updatedTabs: TabType[] = tabs.map(
    (tab): TabType => (typeof tab === 'string' ? { id: tab, label: tab } : tab),
  )

  return (
    <div
      className={cn(
        'flex items-center gap-4 text-[1.25rem] font-bold',
        classNames?.container,
        className,
      )}
      {...rest}
    >
      {updatedTabs.map((tab) => (
        <button
          type="button"
          key={tab.id}
          className={cn(
            (typeof activeTab === 'string' ? activeTab : activeTab.id) === tab.id
              ? cn('bg-main-15 text-main-100', classNames?.activeTab)
              : 'bg-[#9998B81A] text-gray-80',
            'rounded-[1.25rem] p-6 transition-colors duration-200',
            classNames?.tab,
          )}
          onClick={() => onTabChange(typeof tab === 'string' ? tab : (tab.id as T))}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
