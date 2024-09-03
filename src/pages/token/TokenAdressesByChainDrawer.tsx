import type { USDT_TOKENS_RAW } from '@api/squid-router/postHook/data/USDT'
import ArrowDown from '@assets/icons/arrow-down.svg'
import Check from '@assets/icons/check.svg'
import X from '@assets/icons/close.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { TokenIconComponent } from '@components/token-icon'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@components/ui/drawer'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { cn } from '@utils/cn'
import { shortenString } from '@utils/transform'
import { type ComponentProps, useState } from 'react'

interface TokenAddressByChainPopoverProperties
  extends Omit<ComponentProps<'div'>, 'onChange'> {
  data: typeof USDT_TOKENS_RAW
  value: (typeof USDT_TOKENS_RAW)[number]
  onChange: (chain: (typeof USDT_TOKENS_RAW)[number]) => void
}

export const TokenAddressByChainDrawerMobile = (
  props: TokenAddressByChainPopoverProperties,
) => {
  const { className, data, value, onChange } = props
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className={cn('flex items-center gap-2 text-base', className)}>
        <TokenIconComponent className="size-6" symbol={value.chainId} />
        <p className="ml-1">{shortenString(value.addr)}</p>
        <CopyButton className="size-6" text={value.addr} />
        <div className="mx-1 h-6 w-[2px] bg-stroke-100" />
        <ArrowDown className={cn('size-6 transition', isOpen && 'rotate-180')} />
      </DrawerTrigger>
      <DrawerContent
        withDraggable={false}
        aria-describedby={undefined}
        className="px-4 py-6"
      >
        <DrawerHeader className="mb-5 flex w-full items-center justify-between">
          <DrawerTitle className="text-lg font-bold text-text-90">Contract</DrawerTitle>
          <DrawerClose>
            <X className="size-6 [&_path]:stroke-gray-100" />
          </DrawerClose>
        </DrawerHeader>
        <div className="flex flex-col gap-5 text-base">
          {data.map((item, i) => {
            const chainName =
              CHAIN_NAMES_BY_ID[item.chainId as keyof typeof CHAIN_NAMES_BY_ID]
            return (
              <div
                key={i}
                onClick={() => {
                  onChange(item)
                  setIsOpen(false)
                }}
                className="flex cursor-pointer items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <TokenIconComponent className="size-6" symbol={item.chainId} />
                  <p className="leading-[0rem]">{chainName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p>{shortenString(item.addr, 7)}</p>
                  {value === item ? (
                    <Check className="size-[1.125rem]" />
                  ) : (
                    <CopyButton text={item.addr} />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
