/* eslint-disable @typescript-eslint/no-shadow */
import ArrowDown from '@assets/icons/arrow-down.svg'
import Check from '@assets/icons/check.svg'
import { TokenIconComponent } from '@components/token-icon'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import type { NetworkType } from '@constants/networks'
import { NETWORKS } from '@constants/networks'
import { cn } from '@utils/cn'
import { useState } from 'react'

interface SelectNetworkPopoverProperties {
  trigger: React.ReactNode
  onChange: (network: NetworkType) => void
  network?: NetworkType | null
}

export const SelectNetworkPopover = ({
  trigger,
  onChange,
  network: currentNetwork,
}: SelectNetworkPopoverProperties) => {
  const [isOpened, setIsOpened] = useState(false)
  const onNetworkChange = (network: NetworkType) => {
    onChange(network)
    setIsOpened(false)
  }
  return (
    <Popover open={isOpened} onOpenChange={() => setIsOpened(!isOpened)}>
      <PopoverTrigger className="flex items-center gap-2">
        {trigger}
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
        className="w-[10.8125rem] rounded-2xl border px-2 py-4 !shadow-none"
      >
        {NETWORKS.map((network) => (
          <div
            onClick={() => onNetworkChange(network)}
            key={network}
            className={cn(
              'flex items-center justify-between rounded-[0.625rem] px-3 py-2 cursor-pointer',
              network === currentNetwork && 'bg-[#6160FF26]',
            )}
          >
            <div className="flex items-center gap-2">
              <TokenIconComponent symbol={network} className="size-4" />
              <span
                className={cn(
                  'text-base text-text',
                  network === currentNetwork && 'text-main-100',
                )}
              >
                {network}
              </span>
            </div>
            {network === currentNetwork && (
              <Check className="ml-auto size-[1.125rem] overflow-visible" />
            )}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
