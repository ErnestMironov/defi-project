import { useUserShares } from '@api/contracts/useGetUserShares'
import ClosePortfolioIcon from '@assets/icons/portfolio-close.svg'
import TriangleUpIcon from '@assets/icons/triangle-up.svg'
import { useClickOutside } from '@hooks/useClickOutside'
import { usePortfolioData } from '@hooks/usePortfolioStore'
import { ActionButtons } from '@modules/portfolio/ActionButtons'
import { SeparatedUsdValue } from '@modules/portfolio/components/SeparatedUsdValue'
import { UserActivityTabs } from '@modules/portfolio/maat-activity/UserActivityTabs'
import { PortfolioValueTooltip } from '@modules/portfolio/PortfolioValueTooltip'
import { ThemeToggler } from '@modules/theme/ThemeToggler'
import { useAppKit } from '@reown/appkit/react'
import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { formatUnits } from 'viem'
import { useAccount } from 'wagmi'

import PortfolioButton from './PortfolioButton'

interface PortfolioModalProperties extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  isMobile?: boolean
}

export const PortfolioModal = ({
  isOpen,
  onClose,
  isMobile,
}: PortfolioModalProperties) => {
  const { address } = useAccount()
  const { yield: yieldData, isLoadingYield } = usePortfolioData()
  console.log('yieldData', yieldData)
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

  const portfolioGrowth = useMemo(() => {
    if (portfolioValue < 0.001 || totalYield < 0.001) return 0

    const initialValue = portfolioValue - totalYield
    console.log('🚀 ~ portfolioGrowth ~ initialValue:', initialValue)

    return (totalYield / initialValue) * 100
  }, [portfolioValue, totalYield])

  const handleClickOutside = () => {
    if (isOpen) {
      onClose()
    }
  }
  const sidebarReference = useClickOutside(handleClickOutside, [
    '#all-assets-chains, #chain-filter, .open',
  ])

  useEffect(() => {
    document.body.style.overflow = isOpen && isMobile ? 'hidden' : 'auto'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, isMobile])

  return createPortal(
    <>
      {isOpen && isMobile && <div className="fixed inset-0 z-[99] bg-cards-widget" />}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={sidebarReference}
            className="fixed right-0 top-0 z-[100] mt-4 flex max-md:mr-0 max-md:mt-0 max-md:w-full  max-md:p-4 md:mr-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative mr-3 flex items-start pt-2 max-md:mr-0">
              {!isMobile && (
                <button
                  type="button"
                  onClick={onClose}
                  className="flex size-12 items-center justify-center rounded-xl bg-cards-widget hover:bg-gray-50"
                >
                  <ClosePortfolioIcon />
                </button>
              )}
            </div>
            <div className="relative size-auto max-h-screen w-[30.125rem] overflow-y-auto rounded-3xl border border-stroke-100 bg-cards-widget pt-4 shadow-lg">
              <div className="flex h-auto w-full items-center justify-between  px-6 py-4">
                <PortfolioButton
                  onClick={onClose}
                  isOpen={isOpen}
                  openConnectModal={() => openConnectModal()}
                  balance={portfolioValue}
                  isMobile={isMobile}
                />
                <div className="flex  items-center justify-center gap-2 ">
                  <ThemeToggler />
                  {isMobile && (
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex size-12 items-center justify-center rounded-xl border border-stroke-100 bg-cards-widget hover:bg-transparent"
                    >
                      <ClosePortfolioIcon />
                    </button>
                  )}
                </div>
              </div>
              <div className="hide-scrollbar pointer-events-auto h-auto max-h-[80vh] overflow-y-auto bg-cards-widget">
                <div className="grid grid-cols-4 gap-4 px-6 max-md:py-4">
                  <div className="col-span-2">
                    <SeparatedUsdValue
                      loading={isUserSharesLoading}
                      value={portfolioValue}
                      className={cn(
                        'mt-2',
                        portfolioValue > 0 ? 'text-text' : 'text-gray-100',
                      )}
                    />
                    <h6 className="flex items-center gap-[0.38rem] text-sm leading-6 text-text-2100">
                      <span className="font-medium">Portfolio Value</span>
                      <PortfolioValueTooltip />
                      {!isMobile && (
                        <div className="flex items-center gap-[0.12rem]">
                          <TriangleUpIcon className="size-4" />
                          <span className="w-full text-sm font-medium text-green-11100">
                            (
                            {formatAmount(portfolioGrowth, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                            %)
                          </span>
                        </div>
                      )}
                    </h6>
                  </div>
                  <div className="col-span-2 col-start-3">
                    <SeparatedUsdValue
                      loading={isLoadingYield}
                      value={totalYield}
                      className={cn('mt-2')}
                    />
                    <h6 className="truncate text-sm text-text-2100">
                      Total yield generated
                    </h6>
                  </div>
                </div>
                <ActionButtons
                  className="mt-6 px-6 max-md:mt-0 max-md:px-4"
                  value={portfolioValue}
                  onClose={onClose}
                />
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
      </AnimatePresence>
    </>,
    document.body,
  )
}
