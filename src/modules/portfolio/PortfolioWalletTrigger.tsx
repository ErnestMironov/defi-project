import { usePortfolioAssets } from '@api/maat-finance/usePortfolioAssets'
import { usePortfolioYield } from '@api/maat-finance/usePortfolioYield'
import EmptyWallet from '@assets/icons/empty-wallet.svg'
import Metamask from '@assets/icons/metamask.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { Button } from '@components/ui/button'
import { Drawer, DrawerContent } from '@components/ui/drawer'
import { useAppKit } from '@reown/appkit/react'
import { cn } from '@utils/cn'
import { shortenAddress } from '@utils/transform'
import { type ComponentProps, useMemo, useState } from 'react'
import type { Address } from 'viem'
import { useAccount } from 'wagmi'

import { ActionButtons } from './ActionButtons'
import { SeparatedUsdValue } from './components/SeparatedUsdValue'
import { UserActivityTabs } from './maat-activity/UserActivityTabs'
import { PortfolioValueTooltip } from './PortfolioValueTooltip'

interface PortfolioWalletTriggerProperties extends ComponentProps<'div'> {}

export const PortfolioWalletDrawer = (_props: PortfolioWalletTriggerProperties) => {
  const { address } = useAccount()
  const { open: openConnectModal } = useAppKit()
  const [open, setOpen] = useState(false)

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
    const yieldSum = Object.values(yieldData ?? {}).reduce(
      (accumulator, value) => accumulator + value,
      0,
    )
    if (yieldSum >= 0) {
      return yieldSum
    }
    return 0
  }, [yieldData])

  // TODO: Add pending transactions
  const txCount = 4

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      {/* <DrawerTrigger asChild> */}
      <Button
        size="icon"
        variant="container"
        className="relative"
        onClick={() => {
          if (address) {
            setOpen(true)
          } else {
            openConnectModal()
          }
        }}
      >
        <EmptyWallet className="size-7 [&_path]:fill-orange-100" />
        <div className="absolute right-[-0.3125rem] top-[-0.3125rem] size-4 rounded-full bg-orange-100 text-center align-middle text-[0.75rem]/[1rem] font-bold text-white ring-2 ring-white">
          {txCount}
        </div>
      </Button>
      {/* </DrawerTrigger> */}
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
            <p className="text-text ml-3">{shortenAddress(address ?? '')}</p>
            <CopyButton text={address as string} className="ml-2 size-5" />
          </div>
          {/* header */}
          <div className="mt-[1.56rem] flex items-start justify-between">
            <div>
              <h6 className="flex items-center gap-[0.38rem] text-lg text-gray-100">
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
