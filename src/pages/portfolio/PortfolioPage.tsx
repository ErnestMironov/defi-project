import { useUserShares } from '@api/contracts/useGetUserShares'
import { usePortfolioYield } from '@api/maat-finance/usePortfolioYield'
import PortfolioButton from '@layouts/header/components/PortfolioButton'
import { ActionButtons } from '@modules/portfolio/ActionButtons'
import { SeparatedUsdValue } from '@modules/portfolio/components/SeparatedUsdValue'
import { UserActivityTabs } from '@modules/portfolio/maat-activity/UserActivityTabs'
import { PortfolioValueTooltip } from '@modules/portfolio/PortfolioValueTooltip'
import { ThemeToggler } from '@modules/theme/ThemeToggler'
import { useAppKit } from '@reown/appkit/react'
import { cn } from '@utils/cn'
import { type ComponentProps, useEffect, useMemo } from 'react'
import { type Address, formatUnits } from 'viem'
import { useAccount } from 'wagmi'

interface PortfolioPageProperties extends ComponentProps<'div'> {}

export const PortfolioPage = (props: PortfolioPageProperties) => {
  const { className, ...rest } = props
  const { address } = useAccount()
  const { open } = useAppKit()
  useEffect(() => {
    if (!address) {
      open()
    }
  }, [address, open])

  const { data: yieldData, isLoading: isLoadingYield } = usePortfolioYield(
    address as Address,
  )

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
    const total = Object.values(yieldData ?? {}).reduce(
      (accumulator, value) => accumulator + value,
      0,
    )

    return total > 0 ? total : 0
  }, [yieldData])

  return (
    <div className={cn('mt-8', className)} {...rest}>
      {/* wallet */}
      <div className="flex h-auto w-full items-center justify-between">
        <PortfolioButton
          onClick={() => {}}
          isOpen
          openConnectModal={() => {}}
          balance={portfolioValue}
        />
        <ThemeToggler />
      </div>
      {/* header */}
      <div className="mt-8 flex items-start max-lg:gap-8 lg:justify-between">
        <div>
          <h6 className="flex items-center gap-[0.38rem] text-gray-100">
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
          <h6 className="truncate text-gray-100">Total yield generated</h6>
          <SeparatedUsdValue
            loading={isLoadingYield}
            value={totalYield}
            className={cn('mt-2', totalYield > 0 ? 'text-green-100' : 'text-text')}
          />
        </div>
      </div>
      {/* deposit/withdraw/buy */}
      <ActionButtons className="mt-6" value={portfolioValue} />
      {/* tokens/activity */}
      <UserActivityTabs className="mt-8" value={portfolioValue} />
    </div>
  )
}
