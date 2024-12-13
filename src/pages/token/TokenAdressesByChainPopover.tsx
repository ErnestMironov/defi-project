import type { VaultType } from '@api/maat-finance/types'
import Chevron from '@assets/icons/arrow-up.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { IconWithLabelComponent } from '@components/token-icon'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { useDisclosure } from '@hooks/common/useDisclosure'
import { cn } from '@utils/cn'
import { shortenAddress } from '@utils/transform'
import { type ComponentProps } from 'react'

interface TokenAddressByChainPopoverProperties
  extends Omit<ComponentProps<'div'>, 'onChange'> {
  data: VaultType[]
}

export const TokenAddressByChainPopover = (
  props: TokenAddressByChainPopoverProperties,
) => {
  const { className, data } = props
  const [isOpen, { toggle }] = useDisclosure(false)

  return (
    <Popover open={isOpen} onOpenChange={toggle}>
      <PopoverTrigger className={cn('', className)}>
        <p className="flex items-center gap-1 px-[0.38rem] py-1 text-text-2100">
          Contracts{' '}
          <Chevron
            className={cn('size-4 transition-all rotate-180', isOpen && 'rotate-0')}
          />
        </p>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={10}
        className="flex max-h-80 w-[16.25rem] flex-col gap-1 overflow-y-auto border border-stroke-100"
        align="end"
      >
        {data.map((item, i) => {
          const chainName =
            CHAIN_NAMES_BY_ID[item.chain_id as keyof typeof CHAIN_NAMES_BY_ID]
          return (
            <div
              className="flex cursor-pointer items-center justify-between rounded-xl p-3 hover:bg-[#8585A914]"
              key={i}
            >
              <IconWithLabelComponent
                symbol={chainName}
                className="size-4 gap-[0.38rem] text-sm"
              />
              <div className="flex items-center gap-[0.38rem]">
                <p className="text-[0.75rem]/[1rem]">{shortenAddress(item.address)}</p>
                <CopyButton text={item.address} className="size-4" />
              </div>
            </div>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
