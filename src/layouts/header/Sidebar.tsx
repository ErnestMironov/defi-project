import BackMenuIcon from '@assets/icons/menu-bar-back.svg'
import CloseMenuIcon from '@assets/icons/menu-bar-close.svg'
import OpenMenuIcon from '@assets/icons/menu-bar-open.svg'
import Metamask from '@assets/icons/metamask.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { SocialsSidebar } from '@components/socials/Socials'
import { Logo } from '@components/ui/logo'
import { useClickOutside } from '@hooks/useClickOutside'
import { ActionButtons } from '@modules/portfolio/ActionButtons'
import { SeparatedUsdValue } from '@modules/portfolio/components/SeparatedUsdValue'
import { UserActivityTabs } from '@modules/portfolio/maat-activity/UserActivityTabs'
import { PortfolioValueTooltip } from '@modules/portfolio/PortfolioValueTooltip'
import { ThemeToggler } from '@modules/theme/ThemeToggler'
import { shortenAddress } from '@utils/transform'
import { AnimatePresence, motion } from 'framer-motion'
import { type FC, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi'

import { HeaderMenu } from './HeaderMenu'

export const Sidebar: FC = ({ ...rest }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { address } = useAccount()
  const [currentContent, setCurrentContent] = useState<'menu' | 'portfolio'>('menu')
  const [currentBarButton, setCurrentBarButton] = useState<'open' | 'close' | 'back'>(
    'open',
  )

  const sidebarVariants = {
    closed: {
      width: '10rem',
      height: '4rem',
      borderRadius: '2rem',
      padding: '.5rem 1.25rem ',
      left: '6.25rem',
      overflow: 'hidden',
    },
    open: {
      width: '24.1875rem',
      height: '62.25rem',
      borderRadius: '2rem',
      padding: '1.5rem 2rem',
      left: '2.5rem',
      overflow: 'auto',
    },
  }

  const contentVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  }

  const barButtonVariants = {
    open: <OpenMenuIcon onClick={handleOpen} className="size-12 cursor-pointer" />,
    close: <CloseMenuIcon onClick={handleClose} className="size-12 cursor-pointer" />,
    back: (
      <BackMenuIcon onClick={handlePortfolioClose} className="size-12 cursor-pointer" />
    ),
  }

  const sidebarContentVariants = {
    menu: (
      <div className="mt-8">
        <div className="mb-6 text-[1.125rem] leading-[120%] text-gray-100">Products</div>
        <HeaderMenu
          className="flex-col items-start"
          openPortfolio={handlePortfolioOpen}
          callback={handleClose}
        />
        <div className="mb-6 mt-10 text-[1.125rem] leading-[120%] text-gray-100">
          Social
        </div>
        <SocialsSidebar
          classNames={{
            icon: 'size-8 [&_path]:fill-text-90',
          }}
        />
      </div>
    ),
    portfolio: (
      <div className="hide-scrollbar pointer-events-auto h-full overflow-auto rounded-[2rem] bg-cards">
        <div className="mt-[1.56rem] flex items-start justify-between">
          <div>
            <h6 className="flex items-center gap-[0.38rem] text-lg text-gray-100">
              <span>Portfolio Value</span>
              <PortfolioValueTooltip />
            </h6>
            <SeparatedUsdValue loading={false} value={0} className="mt-2" />
          </div>
          <div>
            <h6 className="truncate text-lg text-gray-100">Total yield generated</h6>
            <SeparatedUsdValue loading={false} value={0} className="mt-2" />
          </div>
        </div>
        {/* deposit/withdraw/buy */}
        <ActionButtons className="mt-6" />
        {/* tokens/activity */}
        <div className="max-h-[35rem] overflow-y-auto overflow-x-hidden">
          <UserActivityTabs className="mt-8" />
        </div>
      </div>
    ),
  }

  function handlePortfolioOpen() {
    setCurrentContent('portfolio')
    setCurrentBarButton('back')
  }

  function handlePortfolioClose() {
    setCurrentContent('menu')
    setCurrentBarButton('close')
  }

  function handleOpen() {
    setIsOpen(true)
    setCurrentBarButton('close')
  }

  function handleClose() {
    setIsOpen(false)
    setCurrentBarButton('open')
    setCurrentContent('menu')
  }

  const handleClickOutside = () => {
    if (isOpen) {
      handleClose()
    }
  }

  const sidebarReference = useClickOutside(handleClickOutside)

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={sidebarReference}
        className="fixed left-10 top-10 z-50 flex max-h-[90vh] flex-col bg-cards"
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
          opacity: { duration: 0.2 },
        }}
      >
        <div className="flex items-center justify-between">
          <Link to="/">
            <Logo className="h-[1.36063rem] w-[3.655rem] shrink-0 fill-text" />
          </Link>
          <motion.div
            animate={{ rotate: isOpen ? 360 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {barButtonVariants[currentBarButton]}
          </motion.div>
        </div>

        <motion.div
          className="flex flex-1 flex-col justify-between"
          variants={contentVariants}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {sidebarContentVariants[currentContent]}
        </motion.div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Metamask className="size-5" />
            <p className="ml-3 text-text">{shortenAddress(address ?? '')}</p>
            <CopyButton text={address as string} className="ml-2 size-5" />
          </div>
          <ThemeToggler />
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}
