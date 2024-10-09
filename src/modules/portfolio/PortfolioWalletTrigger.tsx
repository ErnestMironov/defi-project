import { usePortfolioAssets } from '@api/queries/usePortfolioAssets'
import { usePortfolioYield } from '@api/queries/usePortfolioYield'
import EmptyWallet from '@assets/icons/empty-wallet.svg'
import Metamask from '@assets/icons/metamask.svg'
import Tooltip from '@assets/icons/tooltip.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { Button } from '@components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@components/ui/drawer'
import { cn } from '@utils/cn'
import { shortenAddress } from '@utils/transform'
import { type ComponentProps, useMemo } from 'react'
import type { Address } from 'viem'
import { useAccount } from 'wagmi'

import { ActionButtons } from './ActionButtons'
import { SeparatedUsdValue } from './components/SeparatedUsdValue'
import { UserActivityTabs } from './maat-activity/UserActivityTabs'

interface PortfolioWalletTriggerProperties extends ComponentProps<'div'> {}

export const PortfolioWalletDrawer = (_props: PortfolioWalletTriggerProperties) => {
  const { address } = useAccount()
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
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button size="icon" variant="container">
          <EmptyWallet className="size-7 [&_path]:fill-orange-100" />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        position="right"
        withDraggable={false}
        overlay={false}
        className="pointer-events-none w-[28.1875rem] bg-transparent py-8 pr-8"
      >
        <div className="hide-scrollbar pointer-events-auto h-full overflow-auto rounded-[2rem] bg-cards px-8 pb-8 pt-6">
          {/* wallet */}
          <div className="flex items-center">
            <Metamask className="size-5" />
            <p className="ml-3 text-text">{shortenAddress(address ?? '')}</p>
            <CopyButton text={address as string} className="ml-2 size-5" />
          </div>
          {/* header */}
          <div className="mt-[1.56rem] flex items-start justify-between">
            <div>
              <h6 className="flex items-center text-lg text-gray-100">
                <span>Portfolio Value</span>
                <Tooltip className="ml-[0.38rem]" />
              </h6>
              <SeparatedUsdValue
                loading={isLoadingAssets}
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
          <UserActivityTabs className="mt-8" />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
