import { AnimatePresence, motion } from 'framer-motion'
import { type FC, type ReactNode } from 'react'

interface TabContentProperties {
  icon: (isActive: boolean) => ReactNode
  label: string
  isActive: boolean
}

export const TabContent: FC<TabContentProperties> = ({ icon, label, isActive }) => (
  <>
    <span>{icon(isActive)}</span>
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.span
          key="full"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 'auto', opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative top-[.05rem] ml-2 overflow-hidden whitespace-nowrap"
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  </>
)
