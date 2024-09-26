import { cn } from '@utils/cn'
import { motion } from 'framer-motion'
import { type ComponentProps } from 'react'

interface SpringTabsProperties extends ComponentProps<'div'> {
  tabs: { id: string; label: string }[]
  activeTab: string
  classNames?: {
    container?: string
    tab?: string
    activeTab?: string
  }
  layoutId: string
  onTabChange: (tab: string) => void
}

export const AnimatedTabs = (props: SpringTabsProperties) => {
  const { tabs, activeTab, onTabChange, className, classNames, layoutId } = props

  return (
    <div
      className={cn(
        'flex w-fit space-x-1 rounded-full border border-gray-50 p-[0.38rem]',
        className,
        classNames?.container,
      )}
    >
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'relative rounded-full py-4 text-md font-medium transition',
            classNames?.tab,
          )}
        >
          {activeTab === tab.id && (
            <motion.span
              // layoutId="bubble"
              layoutId={layoutId}
              className={cn(
                'absolute inset-0 bg-main-100 rounded-full',
                classNames?.activeTab,
              )}
              transition={{
                type: 'spring',
                bounce: 0.2,
                duration: 0.4,
              }}
            />
          )}
          <div
            className={cn(
              'relative text-text-80 transition-all duration-300',
              activeTab === tab.id && 'text-white',
            )}
          >
            {tab.label}
          </div>
        </button>
      ))}
    </div>
  )
}
