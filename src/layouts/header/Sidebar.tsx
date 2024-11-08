import { useUserShares } from '@api/contracts/useGetUserShares'
import BackMenuIcon from '@assets/icons/menu-bar-back.svg'
import CloseMenuIcon from '@assets/icons/menu-bar-close.svg'
import OpenMenuIcon from '@assets/icons/menu-bar-open.svg'
import Metamask from '@assets/icons/metamask.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { SocialsSidebar } from '@components/socials/Socials'
import { Logo } from '@components/ui/logo'
import { useClickOutside } from '@hooks/useClickOutside'
import { usePortfolioData } from '@hooks/usePortfolioStore'
import { useWindowSize } from '@hooks/useWindowSize'
import { ActionButtons } from '@modules/portfolio/ActionButtons'
import { SeparatedUsdValue } from '@modules/portfolio/components/SeparatedUsdValue'
import { UserActivityTabs } from '@modules/portfolio/maat-activity/UserActivityTabs'
import { PortfolioValueTooltip } from '@modules/portfolio/PortfolioValueTooltip'
import { useTheme } from '@modules/theme/ThemeProvider'
import { ThemeToggler } from '@modules/theme/ThemeToggler'
import { useAppKit } from '@reown/appkit/react'
import { cn } from '@utils/cn'
import { shortenAddress } from '@utils/transform'
import { AnimatePresence, motion } from 'framer-motion'
import { type FC, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { formatUnits } from 'viem'
import { useAccount } from 'wagmi'

import { DesktopSidebarMenu } from './HeaderMenu'
import { useSidebarState } from './hooks/useSidebarState'

const contentVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const Sidebar: FC = () => {
  const {
    isOpen,
    currentContent,
    currentBarButton,
    handlePortfolioOpen,
    handlePortfolioClose,
    handleOpen,
    handleClose,
  } = useSidebarState()
  const { address } = useAccount()

  const theme = useTheme()

  const { open: openConnectModal } = useAppKit()

  const { height } = useWindowSize()

  const { yield: yieldData, isLoadingYield } = usePortfolioData()

  const { data: userShares, isLoading: isUserSharesLoading } = useUserShares(address)

  const portfolioValue = useMemo(() => {
    if (!userShares?.shares) return 0

    return userShares?.shares?.reduce<number>(
      (accumulator, value) =>
        accumulator + Number(formatUnits(value.balance, value.decimals)),
      0,
    )
  }, [userShares?.shares])

  const totalYield = useMemo(() => {
    const yieldSum = Object.values(yieldData ?? {}).reduce<number>(
      (accumulator, value) => accumulator + (typeof value === 'number' ? value : 0),
      0,
    )

    return yieldSum > 0 ? yieldSum : 0
  }, [yieldData])

  const sidebarVariants = {
    closed: {
      width: '10rem',
      maxHeight: '4rem',
      borderRadius: '2rem',
      padding: '.5rem 1.25rem ',
      left: '6.25rem',
      overflow: 'hidden',
      backgroundColor:
        theme.theme === 'dark' ? 'rgba(48, 46, 69, 0.40)' : 'rgba(255, 255, 255, 0.50)',
    },
    open: {
      width: '24.1875rem',
      maxHeight: '62.25rem',
      borderRadius: '2rem',
      padding: '1.5rem 2rem',
      left: '2.5rem',
      overflow: 'hidden auto',
      backgroundColor: 'var(--cards)',
    },
    openPortfolio: {
      width: '28.1875rem',
      maxHeight: '90vh',
      borderRadius: '2rem',
      padding: '1.5rem 2rem',
      left: '2.5rem',
      overflow: 'hidden auto',
      backgroundColor: 'var(--cards)',
    },
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
        <DesktopSidebarMenu
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
      <div className="hide-scrollbar pointer-events-auto h-full overflow-y-auto overflow-x-hidden bg-cards">
        <div className="flex items-start justify-between">
          <div>
            <h6 className="flex items-center gap-[0.38rem] text-lg text-gray-100">
              <span>Portfolio Value</span>
              <PortfolioValueTooltip />
            </h6>
            <SeparatedUsdValue
              loading={isUserSharesLoading}
              value={portfolioValue}
              className="mt-2"
            />
          </div>
          <div>
            <h6 className="truncate text-lg text-gray-100">Total yield generated</h6>
            <SeparatedUsdValue
              loading={isLoadingYield}
              value={totalYield}
              className={cn('mt-2', totalYield > 0 ? 'text-green-100' : 'text-text')}
            />
          </div>
        </div>
        {/* deposit/withdraw/buy */}
        <ActionButtons className="mt-6" />
        {/* tokens/activity */}
        <UserActivityTabs
          className={cn(
            'mt-8 [&_.all-assets]:max-h-[12vh] [&_.all-assets]:overflow-y-auto [&_.all-assets]:overflow-x-hidden [&_.user-activity]:max-h-[15vh]  [&_.user-activity]:overflow-y-auto [&_.user-activity]:overflow-x-hidden ',
            {
              '[&_.user-activity]:max-h-[25vh]': height > 768,
              '[&_.all-assets]:max-h-[20vh]': height > 768,
            },
          )}
        />
      </div>
    ),
  }

  const handleClickOutside = () => {
    if (isOpen) {
      handleClose()
    }
  }

  const sidebarReference = useClickOutside(handleClickOutside, ['#all-assets-chains'])

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={sidebarReference}
        className="absolute left-10 top-10 z-50 flex max-h-[90vh] flex-col gap-6"
        initial="closed"
        animate={
          isOpen ? (currentContent === 'portfolio' ? 'openPortfolio' : 'open') : 'closed'
        }
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

        {isOpen && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentContent}
              className="flex flex-1 flex-col justify-between"
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {sidebarContentVariants[currentContent]}
            </motion.div>
          </AnimatePresence>
        )}

        {isOpen && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                type="button"
                className="flex items-center"
                onClick={() => openConnectModal()}
              >
                <Metamask className="size-5" />
                <p className="ml-3 text-text">{shortenAddress(address ?? '')}</p>
              </button>
              <CopyButton text={address as string} className="ml-2 size-5" />
            </div>
            <ThemeToggler />
          </div>
        )}
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}
