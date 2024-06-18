/* eslint-disable @typescript-eslint/no-shadow */
import ArrowDown from '@assets/icons/arrow-down.svg'
import Check from '@assets/icons/check.svg'
import { TokenIconComponent } from '@components/token-icon'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { cn } from '@utils/cn'
import { useState } from 'react'

import { useDepositStore } from './store/useDepositStore'

interface SelectNetworkPopoverProperties {}
const networks = ['Polygon', 'Ethereum', 'Optimism', 'Arbitrum', 'Avalanche']

export const SelectNetworkPopover = (_props: SelectNetworkPopoverProperties) => {
  const { network: selectedNetwork, setNetwork } = useDepositStore()
  const [isOpened, setIsOpened] = useState(false)
  const onChange = (network: string) => {
    setNetwork(network)
    setIsOpened(false)
  }
  return (
    <Popover open={isOpened} onOpenChange={() => setIsOpened(!isOpened)}>
      <PopoverTrigger className="flex items-center gap-2 text-lg font-bold">
        {selectedNetwork ? (
          <div className="flex items-center gap-[0.38rem]">
            <TokenIconComponent symbol={selectedNetwork} className="size-4" />
            <span className="leading-0">{selectedNetwork}</span>
          </div>
        ) : (
          <span>All networks</span>
        )}
        <ArrowDown
          className={cn(
            'size-4 transition group-data-[state="open"]:rotate-180',
            isOpened && 'rotate-180',
          )}
        />
      </PopoverTrigger>
      <PopoverContent
        align="center"
        sideOffset={24}
        className="w-[10.8125rem] rounded-2xl border border-stroke px-2 py-4 text-text-100 !shadow-none"
      >
        {networks.map((network) => (
          <div
            onClick={() => onChange(network)}
            key={network}
            className={cn(
              'flex items-center justify-between rounded-[0.625rem] px-3 py-2 cursor-pointer hover:bg-main/10',
              network === selectedNetwork && 'bg-[#6160FF26]',
            )}
          >
            <div className="flex items-center gap-2">
              <TokenIconComponent symbol={network} className="size-4" />
              <span
                className={cn(
                  'text-base text-text-100',
                  network === selectedNetwork && 'text-main',
                )}
              >
                {network}
              </span>
            </div>
            {network === selectedNetwork && (
              <Check className="ml-auto size-[1.125rem] overflow-visible" />
            )}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
