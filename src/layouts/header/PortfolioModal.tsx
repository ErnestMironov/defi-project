import { useUserShares } from '@api/contracts/useGetUserShares'
import Metamask from '@assets/icons/metamask.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { useClickOutside } from '@hooks/useClickOutside'
import { usePortfolioData } from '@hooks/usePortfolioStore'
import { useWindowSize } from '@hooks/useWindowSize'
import { ActionButtons } from '@modules/portfolio/ActionButtons'
import { SeparatedUsdValue } from '@modules/portfolio/components/SeparatedUsdValue'
import { UserActivityTabs } from '@modules/portfolio/maat-activity/UserActivityTabs'
import { PortfolioValueTooltip } from '@modules/portfolio/PortfolioValueTooltip'
import { ThemeToggler } from '@modules/theme/ThemeToggler'
import { useAppKit } from '@reown/appkit/react'
import { cn } from '@utils/cn'
import { shortenAddress } from '@utils/transform'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { formatUnits } from 'viem'
import { useAccount } from 'wagmi'

export const PortfolioModal = ({ isOpen, onClose }) => {
  const { address } = useAccount()
  const { height } = useWindowSize()
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
  const sidebarReference = useClickOutside(handleClickOutside, ['#all-assets-chains'])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={sidebarReference}
          className="auto fixed right-0 top-0 z-50 mr-20 mt-4 h-auto w-full max-w-[482px] overflow-hidden rounded-xl bg-white px-6 py-4 shadow-lg"
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            opacity: { duration: 0.2 },
          }}
        >
          <div className="flex h-auto w-full items-center justify-between py-4">
            <div className="flex items-center ">
              <button
                type="button"
                className="flex items-center"
                onClick={() => openConnectModal()}
              >
                <Metamask className="size-5" />
                <p className="text-text ml-3 text-lg">{shortenAddress(address ?? '')}</p>
              </button>
              <CopyButton text={address as string} className="ml-2 size-5" />
            </div>
            <ThemeToggler />
          </div>
          <div className="hide-scrollbar pointer-events-auto h-full overflow-y-auto overflow-x-hidden bg-cards">
            <div className="flex items-start justify-between">
              <div>
                <SeparatedUsdValue
                  loading={isUserSharesLoading}
                  value={portfolioValue}
                  className={cn(
                    'mt-2 ',
                    portfolioValue > 0 ? 'text-text' : 'text-gray-100',
                  )}
                />
                <h6 className="flex items-center gap-[0.38rem] text-lg text-gray-100">
                  <span>Portfolio Value</span>
                  <PortfolioValueTooltip />
                </h6>
              </div>
              <div>
                <SeparatedUsdValue
                  loading={isLoadingYield}
                  value={totalYield}
                  className={cn('mt-2', totalYield > 0 ? 'text-text' : 'text-gray-100')}
                />
                <h6 className="truncate text-lg text-gray-100">Total yield generated</h6>
              </div>
            </div>

            {/* deposit/withdraw/buy and UserActivityTabs */}
            <ActionButtons className="mt-6" value={portfolioValue} />
            <UserActivityTabs
              value={portfolioValue}
              className={cn(
                'mt-8 [&_.all-assets]:max-h-[12vh] [&_.all-assets]:overflow-y-auto [&_.all-assets]:overflow-x-hidden [&_.user-activity]:max-h-[15vh]  [&_.user-activity]:overflow-y-auto [&_.user-activity]:overflow-x-hidden ',
                {
                  '[&_.user-activity]:max-h-[25vh]': height > 768,
                  '[&_.all-assets]:max-h-[20vh]': height > 768,
                },
              )}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body, // Рендерим в body
  )
}
