import { cn } from '@utils/cn'
import { motion } from 'framer-motion'
import { type ComponentProps } from 'react'

interface SpringTabsProperties extends ComponentProps<'div'> {
  tabs: { id: string; label: string }[]
  activeTab: string
  onTabChange: (tab: string) => void
}

export const AnimatedTabs = (props: SpringTabsProperties) => {
  const { tabs, activeTab, onTabChange } = props

  return (
    <div className="flex w-fit space-x-1 rounded-full border border-gray-50 p-[0.38rem]">
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="relative rounded-full px-[2.06rem] py-4 text-md font-medium transition"
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10 bg-main"
              style={{ borderRadius: 9999 }}
              transition={{
                type: 'spring',
                bounce: 0.2,
                duration: 0.4,
              }}
            />
          )}
          <div
            className={cn(
              'relative z-[100] text-text-80 transition-all duration-300',
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
