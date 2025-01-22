import { useUserShares } from '@api/contracts/useGetUserShares'
import { usePortfolioYield } from '@api/maat-finance/usePortfolioYield'
import TriangleUpIcon from '@assets/icons/triangle-up.svg'
import { ActionButtons } from '@modules/portfolio/ActionButtons'
import { SeparatedUsdValue } from '@modules/portfolio/components/SeparatedUsdValue'
import { UserActivityTabs } from '@modules/portfolio/maat-activity/UserActivityTabs'
import { useAppKit } from '@reown/appkit/react'
import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue'
import { type ComponentProps, useEffect, useMemo } from 'react'
import { type Address, formatUnits } from 'viem'
import { useAccount } from 'wagmi'

interface PortfolioPageProperties extends ComponentProps<'div'> {
  isMobile?: boolean
}

export const PortfolioPage = (props: PortfolioPageProperties) => {
  const { className, isMobile, ...rest } = props
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

  const portfolioGrowth = useMemo(() => {
    if (portfolioValue < 0.001 || totalYield < 0.001) return 0

    const initialValue = (portfolioValue + totalYield) * 100
    console.log('🚀 ~ portfolioGrowth ~ initialValue:', initialValue)

    return initialValue / portfolioValue - 100
  }, [portfolioValue, totalYield])

  return (
    <div
      className={cn(
        ' bg-cards-widget rounded-[1.5rem] border border-stroke-100 shadow-test-2 mt-4 mb-[3.25rem]',
        className,
      )}
      {...rest}
    >
      <div className="flex-start space-between flex flex-row gap-6 px-6 max-md:p-6">
        <div className="">
          <SeparatedUsdValue
            loading={isUserSharesLoading}
            value={portfolioValue}
            className={cn('mt-2', portfolioValue > 0 ? 'text-text' : 'text-gray-100')}
          />
          <h6 className="flex items-center gap-[0.38rem] text-sm leading-6 text-text-2100">
            <span className="font-medium">Assets Locked</span>
            <div
              className={cn(
                'flex items-center gap-[0.12rem]',
                portfolioGrowth > 0 ? 'text-green-11100' : 'text-text-8100',
              )}
            >
              <TriangleUpIcon className="size-4 [&_path]:fill-current" />
              <span className="w-full text-sm font-medium">
                (
                {formatAmount(portfolioGrowth, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                %)
              </span>
            </div>
          </h6>
        </div>
        <div className="">
          <SeparatedUsdValue
            loading={isLoadingYield}
            value={totalYield}
            className={cn('mt-2')}
          />
          <h6 className="truncate text-sm text-text-2100">Total yield generated</h6>
        </div>
      </div>
      {/* deposit/withdraw/buy */}
      <ActionButtons className="px-4 pb-3" value={portfolioValue} onClose={() => {}} />
      {/* tokens/activity */}
      <UserActivityTabs className="" value={portfolioValue} />
    </div>
  )
}
