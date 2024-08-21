import type { USDT_TOKENS_RAW } from '@api/squid-router/postHook/data/USDT'
import ArrowDown from '@assets/icons/arrow-down.svg'
import Check from '@assets/icons/check.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { TokenIconComponent } from '@components/token-icon'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { useDisclosure } from '@hooks/useDisclosure'
import { cn } from '@utils/cn'
import { shortenString } from '@utils/transform'
import type { ComponentProps } from 'react'

interface TokenAddressByChainPopoverProperties
  extends Omit<ComponentProps<'div'>, 'onChange'> {
  data: typeof USDT_TOKENS_RAW
  value: (typeof USDT_TOKENS_RAW)[number]
  onChange: (chain: (typeof USDT_TOKENS_RAW)[number]) => void
}

export const TokenAddressByChainPopover = (
  props: TokenAddressByChainPopoverProperties,
) => {
  const { className, data, value, onChange } = props
  const [isOpen, { close, toggle }] = useDisclosure(false)

  return (
    <Popover open={isOpen} onOpenChange={toggle}>
      <PopoverTrigger className={cn('flex items-center gap-2 text-lg', className)}>
        <TokenIconComponent className="size-6" symbol={value.chainId} />
        <p className="ml-1">{shortenString(value.addr, 6)}</p>
        <CopyButton className="size-6" text={value.addr} />
        <div className="mx-3 h-6 w-[2px] bg-stroke-100" />
        <ArrowDown className={cn('size-6 transition', isOpen && 'rotate-180')} />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={10}
        className="flex flex-col gap-5 border border-stroke-100 p-6 text-lg"
        align="end"
      >
        {data.map((item, i) => {
          const chainName =
            CHAIN_NAMES_BY_ID[item.chainId as keyof typeof CHAIN_NAMES_BY_ID]
          return (
            <div
              className="grid cursor-pointer grid-cols-[1.25rem_0.8fr_0.8fr_1.25rem] items-center justify-between"
              key={i}
              onClick={() => {
                onChange(item)
                close()
              }}
            >
              <TokenIconComponent className="size-5" symbol={item.chainId} />
              <p className="ml-2 leading-[0rem]">{chainName}</p>
              <p>{shortenString(item.addr)}</p>
              {value === item ? (
                <Check className="size-[1.125rem]" />
              ) : (
                <CopyButton text={item.addr} />
              )}
            </div>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
