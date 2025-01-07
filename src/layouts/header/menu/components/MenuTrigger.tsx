import Logo from '@assets/icons/menu/logo.svg'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { cn } from '@utils/cn'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronsLeft, ChevronsUpDown } from 'lucide-react'

export const MenuTrigger = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) => {
  const { isBelowDesktop } = useDeviceWidth()

  return (
    <button
      type="button"
      className={cn('flex items-center gap-2 max-lg:gap-1 max-lg:pr-1', {
        'max-lg:gap-2': isOpen,
      })}
      onClick={() => setIsOpen(!isOpen)}
    >
      <Logo className="w-16 max-md:h-[1.9375rem] max-md:w-12" />
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.div
            key="chevrons-updown"
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 180 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronsUpDown className="size-4 text-[#30303066] dark:text-[#8585A9]" />
          </motion.div>
        )}
        {isBelowDesktop && isOpen && (
          <motion.div
            key="chevrons-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronsLeft className="size-4 text-[#30303066] dark:text-[#8585A9]" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
