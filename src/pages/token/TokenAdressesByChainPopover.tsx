import type { VaultType } from '@api/maat-finance/types'
import ArrowDown from '@assets/icons/arrow-down.svg'
import Check from '@assets/icons/check.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { useDisclosure } from '@hooks/common/useDisclosure'
import { cn } from '@utils/cn'
import { shortenAddress } from '@utils/transform'
import { type ComponentProps } from 'react'

interface TokenAddressByChainPopoverProperties
  extends Omit<ComponentProps<'div'>, 'onChange'> {
  data: VaultType[]
  value: VaultType
  onChange: (chain: VaultType) => void
}

export const TokenAddressByChainPopover = (
  props: TokenAddressByChainPopoverProperties,
) => {
  const { className, data, value, onChange } = props
  const [isOpen, { close, toggle }] = useDisclosure(false)

  return (
    <Popover open={isOpen} onOpenChange={toggle}>
      <PopoverTrigger className={cn('flex items-center gap-2 text-lg', className)}>
        <TokenIconComponent className="size-6" symbol={value.chain_id} />
        <p className="ml-1">{shortenAddress(value.address)}</p>
        <CopyButton className="size-6" text={value.address} />
        <div className="mx-3 h-6 w-[2px] bg-stroke-100" />
        <ArrowDown className={cn('size-6 transition', isOpen && 'rotate-180')} />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={10}
        className="flex max-h-80 w-80 flex-col gap-5 overflow-y-scroll border border-stroke-100 p-6 text-lg"
        align="end"
      >
        {data.map((item, i) => {
          const chainName =
            CHAIN_NAMES_BY_ID[item.chain_id as keyof typeof CHAIN_NAMES_BY_ID]
          return (
            <div
              className="grid cursor-pointer grid-cols-[1.2fr_1.3fr_1.25rem] items-center justify-between"
              key={i}
              onClick={() => {
                onChange(item)
                close()
              }}
            >
              <IconWithLabelComponent symbol={chainName} className="size-5" />
              {/* <p className="ml-2 leading-[0rem]">{chainName}</p> */}
              <p>{shortenAddress(item.address)}</p>
              {value === item ? (
                <Check className="size-[1.125rem]" />
              ) : (
                <CopyButton text={item.address} />
              )}
            </div>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
