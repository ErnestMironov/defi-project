import { Socials } from '@components/socials/Socials'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronsLeft } from 'lucide-react'
import { useState } from 'react'

import { MenuTrigger } from './components/MenuTrigger'
import { DesktopMenu } from './DesktopMenu'
import { MobileMenu } from './MobileMenu'

const menuVariants = {
  closed: {
    width: '6.5rem',
    height: '3rem',
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  open: {
    width: '15rem',
    height: '15rem',
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const contentVariants = {
  closed: {
    opacity: 0,
    scale: 0.97,
    transition: {
      duration: 0.2,
    },
  },
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      delay: 0.2,
    },
  },
}

export const Menu = () => {
  const { isBelowDesktop } = useDeviceWidth()
  const [isOpen, setIsOpen] = useState(false)

  const menuArray = isBelowDesktop ? <MobileMenu /> : <DesktopMenu />
  return (
    <div className="relative z-50 size-12">
      <motion.nav
        className="dark:shadow-button absolute left-0 top-0 flex flex-col rounded-2xl border border-stroke-100 bg-white p-1 shadow-test-2 dark:bg-cards-widget"
        variants={menuVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
      >
        <motion.div layout="position">
          <MenuTrigger isOpen={isOpen} setIsOpen={setIsOpen} />
        </motion.div>
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              className="mt-2 flex flex-1 origin-top flex-col justify-between"
              variants={contentVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {menuArray}
              <Socials />
            </motion.div>
          )}
        </AnimatePresence>
        {isOpen && !isBelowDesktop && (
          <button
            type="button"
            className="absolute left-full top-0 -z-10 flex h-full w-[2.8rem] -translate-x-4 justify-end rounded-r-2xl bg-input-active pr-2 pt-3 text-right"
            onClick={() => setIsOpen(false)}
          >
            <ChevronsLeft className="size-4 text-[#30303066] dark:text-[#8585A9]" />
          </button>
        )}
      </motion.nav>
    </div>
  )
}
