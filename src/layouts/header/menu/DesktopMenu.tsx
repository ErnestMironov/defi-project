import { Socials } from '@components/socials/Socials'
import { useClickOutside } from '@hooks/useClickOutside'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronsLeft } from 'lucide-react'
import { useState } from 'react'

import { LinkMenuItem } from './components/LinkMenuItem'
import { MenuTrigger } from './components/MenuTrigger'
import { NavLinkMenuItem } from './components/NavLinkMenuItem'
import { useDesktopMenuArray } from './hooks/useMenu'

const menuVariants = {
  closed: {
    width: '6.5rem',
    height: '3.1rem',
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
    padding: '0.25rem',
    top: '0',
    left: '0',
  },
  open: {
    width: '15rem',
    height: '15rem',
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
    padding: '0.25rem',
    left: '0',
    top: '0',
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

export const DesktopMenu = () => {
  const menu = useDesktopMenuArray()
  const [isOpen, setIsOpen] = useState(false)
  const menuReference = useClickOutside(() => setIsOpen(false))
  return (
    <motion.nav
      ref={menuReference}
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
            <ul className="flex flex-col items-stretch gap-1">
              {menu.map((menuItem) => {
                if (menuItem.linkType === 'external') {
                  return (
                    <LinkMenuItem
                      key={menuItem.href}
                      {...menuItem}
                      callback={() => setIsOpen(false)}
                    />
                  )
                }
                return (
                  <NavLinkMenuItem
                    key={menuItem.href}
                    {...menuItem}
                    callback={() => setIsOpen(false)}
                  />
                )
              })}
            </ul>
            <Socials />
          </motion.div>
        )}
      </AnimatePresence>
      {isOpen && (
        <button
          type="button"
          className="absolute left-full top-0 -z-10 flex h-full w-[2.8rem] -translate-x-4 justify-end rounded-r-2xl bg-input-active pr-2 pt-3 text-right"
          onClick={() => setIsOpen(false)}
        >
          <ChevronsLeft className="size-4 text-[#30303066]  hover:translate-x-1 dark:text-[#8585A9]" />
        </button>
      )}
    </motion.nav>
  )
}
