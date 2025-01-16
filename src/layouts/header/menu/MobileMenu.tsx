import { Socials } from '@components/socials/Socials'
import { ThemeToggler } from '@modules/theme/ThemeToggler'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { LinkMenuItem } from './components/LinkMenuItem'
import { MenuTrigger } from './components/MenuTrigger'
import { NavLinkMenuItem } from './components/NavLinkMenuItem'
import { useMobileMenuArray } from './hooks/useMenu'

const menuVariants = {
  closed: {
    width: 0,
    height: 0,
    top: '1.25rem',
    left: '1.25rem',
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
      when: 'afterChildren',
    },
  },
  open: {
    width: '19rem',
    height: '100vh',
    top: 0,
    left: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
      when: 'beforeChildren',
    },
  },
}

const overlayVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.2,
      when: 'afterChildren',
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.2,
      when: 'beforeChildren',
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
      duration: 0.2,
    },
  },
}

export const MobileMenu = () => {
  const menu = useMobileMenuArray()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="max-md:py-[0.38rem]">
      {/* Trigger button layer */}
      <div className="relative z-20 rounded-xl border border-stroke-100 bg-cards-widget p-1 shadow-test-2 max-md:h-10 max-md:w-auto">
        <MenuTrigger isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {/* Menu content layer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed left-0 top-0 z-10 h-screen w-screen bg-[rgba(35,35,41,0.50)] bg-blend-overlay backdrop-blur-[25px]"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              className="fixed left-0 top-0 z-10 flex origin-center flex-col rounded-r-[2.5rem] border-r border-stroke-100 bg-white shadow-block dark:bg-cards-widget"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.div
                className="mt-32 flex h-[calc(100vh-5rem)] flex-col justify-between p-6"
                variants={contentVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <ul className="flex flex-col items-stretch gap-6 text-[1.25rem]">
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
                <div className="flex flex-col items-stretch gap-12">
                  <ThemeToggler className="self-start" />
                  <Socials />
                </div>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
