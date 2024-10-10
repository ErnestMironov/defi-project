import { usePortfolioAssets } from '@api/queries/usePortfolioAssets'
import { usePortfolioYield } from '@api/queries/usePortfolioYield'
import Metamask from '@assets/icons/metamask.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { ActionButtons } from '@modules/portfolio/ActionButtons'
import { SeparatedUsdValue } from '@modules/portfolio/components/SeparatedUsdValue'
import { UserActivityTabs } from '@modules/portfolio/maat-activity/UserActivityTabs'
import { PortfolioValueTooltip } from '@modules/portfolio/PortfolioValueTooltip'
import { cn } from '@utils/cn'
import { shortenAddress } from '@utils/transform'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { type ComponentProps, useEffect, useMemo } from 'react'
import type { Address } from 'viem'
import { useAccount } from 'wagmi'

interface PortfolioPageProperties extends ComponentProps<'div'> {}

export const PortfolioPage = (props: PortfolioPageProperties) => {
  const { className, ...rest } = props
  const { address } = useAccount()
  const { open } = useWeb3Modal()
  useEffect(() => {
    if (!address) {
      open()
    }
  }, [address, open])
  const { data: assetsData, isLoading: isLoadingAssets } = usePortfolioAssets(
    address as Address,
  )
  const { data: yieldData, isLoading: isLoadingYield } = usePortfolioYield(
    address as Address,
  )

  const portfolioValue = useMemo(() => {
    return Object.values(assetsData ?? {}).reduce(
      (accumulator, value) => accumulator + value,
      0,
    )
  }, [assetsData])

  const totalYield = useMemo(() => {
    return Object.values(yieldData ?? {}).reduce(
      (accumulator, value) => accumulator + value,
      0,
    )
  }, [yieldData])

  return (
    <div className={cn('mt-8', className)} {...rest}>
      {/* wallet */}
      <div className={cn('flex items-center', !address && 'hidden')}>
        <Metamask className="size-5" />
        <p className="ml-3 text-text">{shortenAddress(address ?? '')}</p>
        <CopyButton text={address as string} className="ml-2 size-5" />
      </div>
      {/* header */}
      <div className="mt-8 flex items-start max-lg:gap-8 lg:justify-between">
        <div>
          <h6 className="flex items-center gap-[0.38rem] text-gray-100">
            <span>Portfolio Value</span>
            <PortfolioValueTooltip />
          </h6>
          <SeparatedUsdValue
            loading={isLoadingAssets}
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
      <ActionButtons className="mt-6" />
      {/* tokens/activity */}
      <UserActivityTabs className="mt-8" />
    </div>
  )
}
