/* eslint-disable @typescript-eslint/no-shadow */
import ArrowDown from '@assets/icons/arrow-down.svg'
import Check from '@assets/icons/check.svg'
import { TokenIconComponent } from '@components/token-icon'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { DEPOSIT_CHAIN_IDS, type DepositChainType } from '@constants/chains'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { cn } from '@utils/cn'
import { useState } from 'react'

interface SelectNetworkPopoverProperties {
  trigger: React.ReactNode
  onChange: (chain: DepositChainType | null) => void
  chain?: DepositChainType | null
  showAllNetworksOption?: boolean
}

const ChainItem = ({
  onNetworkChange,
  chain,
  currentChain,
}: {
  onNetworkChange: (chain: DepositChainType | null) => void
  chain: DepositChainType | null
  currentChain: DepositChainType | null | undefined
}) => {
  const data = useTokenAsset(chain)

  const chainName = () => {
    if (chain === null) return 'All networks'

    return data?.name || chain
  }

  return (
    <div
      onClick={() => onNetworkChange(chain)}
      className={cn(
        'flex items-center justify-between rounded-[0.625rem] gap-2 px-3 py-1.5 cursor-pointer hover:bg-main-15',
        chain === currentChain && 'bg-main-15',
      )}
    >
      <div className="flex  items-center gap-2">
        {chain && (
          <div className="overflow-hidden rounded-full">
            <TokenIconComponent
              symbol={chain}
              className="size-4 overflow-hidden rounded-full"
            />
          </div>
        )}
        <span
          className={cn('text-base text-text', chain === currentChain && 'text-main-100')}
        >
          {chainName()}
        </span>
      </div>
      {chain === currentChain && (
        <Check className="ml-auto size-[1.125rem] overflow-visible" />
      )}
    </div>
  )
}

export const SelectNetworkPopover = ({
  trigger,
  onChange,
  chain: currentChain,
  showAllNetworksOption = false,
}: SelectNetworkPopoverProperties) => {
  const [isOpened, setIsOpened] = useState(false)
  const onNetworkChange = (chain: DepositChainType | null) => {
    onChange(chain)
    setIsOpened(false)
  }

  return (
    <Popover open={isOpened} onOpenChange={() => setIsOpened(true)}>
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
        className="pointer-events-auto inline-block w-auto rounded-2xl border px-2 py-4 !shadow-none"
      >
        <div className="flex flex-col gap-1 ">
          {showAllNetworksOption && (
            <ChainItem
              chain={null}
              onNetworkChange={onNetworkChange}
              currentChain={currentChain}
            />
          )}
          {DEPOSIT_CHAIN_IDS.map((chain) => (
            <ChainItem
              key={chain}
              onNetworkChange={onNetworkChange}
              chain={chain}
              currentChain={currentChain}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
