import { useUserShares } from '@api/contracts/useGetUserShares'
import ClosePortfolioIcon from '@assets/icons/portfolio-close.svg'
import { useClickOutside } from '@hooks/useClickOutside'
import { usePortfolioData } from '@hooks/usePortfolioStore'
import { ActionButtons } from '@modules/portfolio/ActionButtons'
import { SeparatedUsdValue } from '@modules/portfolio/components/SeparatedUsdValue'
import { UserActivityTabs } from '@modules/portfolio/maat-activity/UserActivityTabs'
import { PortfolioValueTooltip } from '@modules/portfolio/PortfolioValueTooltip'
import { ThemeToggler } from '@modules/theme/ThemeToggler'
import { useAppKit } from '@reown/appkit/react'
import { cn } from '@utils/cn'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { formatUnits } from 'viem'
import { useAccount } from 'wagmi'

import PortfolioButton from './PortfolioButton'

interface PortfolioModalProperties extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
}

export const PortfolioModal = ({ isOpen, onClose }: PortfolioModalProperties) => {
  const { address } = useAccount()
  const { yield: yieldData, isLoadingYield } = usePortfolioData()
  const { data: userShares, isLoading: isUserSharesLoading } = useUserShares(address)
  const { open: openConnectModal } = useAppKit()
  const portfolioValue = useMemo(() => {
    if (!userShares?.shares) return 0
    return userShares.shares.reduce<number>(
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

  const handleClickOutside = () => {
    if (isOpen) {
      onClose()
    }
  }
  const sidebarReference = useClickOutside(handleClickOutside, [
    '#all-assets-chains, #chain-filter',
  ])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={sidebarReference}
          className="fixed right-0 top-0 z-50 mr-8 mt-4 flex"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative mr-3 flex items-start pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex size-12 items-center justify-center rounded-xl bg-cards hover:bg-gray-50"
            >
              <ClosePortfolioIcon />
            </button>
          </div>
          <div className="size-auto max-h-screen w-[30.125rem] overflow-y-auto rounded-3xl bg-cards pt-4 shadow-lg">
            <div className="flex h-auto w-full items-center justify-between px-6 py-4">
              <PortfolioButton
                onClick={onClose}
                isOpen={isOpen}
                openConnectModal={() => openConnectModal()}
                balance={portfolioValue}
              />
              <ThemeToggler />
            </div>
            <div className="hide-scrollbar pointer-events-auto h-auto max-h-[80vh] overflow-y-auto bg-cards">
              <div className="grid grid-cols-4 gap-4 px-6">
                <div className="col-span-2">
                  <SeparatedUsdValue
                    loading={isUserSharesLoading}
                    value={portfolioValue}
                    className={cn(
                      'mt-2',
                      portfolioValue > 0 ? 'text-text' : 'text-gray-100',
                    )}
                  />
                  <h6 className="flex items-center gap-[0.38rem] text-lg text-gray-100">
                    <span>Portfolio Value</span>
                    <PortfolioValueTooltip />
                  </h6>
                </div>
                <div className="col-span-2 col-start-3">
                  <SeparatedUsdValue
                    loading={isLoadingYield}
                    value={totalYield}
                    className={cn('mt-2', totalYield > 0 ? 'text-text' : 'text-gray-100')}
                  />
                  <h6 className="truncate text-lg text-gray-100">
                    Total yield generated
                  </h6>
                </div>
              </div>
              <ActionButtons className="mt-6 px-6" value={portfolioValue} />
              <UserActivityTabs
                value={portfolioValue}
                className={cn(
                  'mt-8 [&_.all-assets]:max-h-[calc(90vh-200px)] [&_.all-assets]:overflow-y-auto [&_.all-assets]:overflow-x-hidden [&_.user-activity]:overflow-y-auto [&_.user-activity]:overflow-x-hidden',
                )}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
