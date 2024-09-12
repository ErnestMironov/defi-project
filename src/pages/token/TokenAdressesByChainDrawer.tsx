import type { VaultType } from '@api/maat-finance/types'
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
import { shortenAddress } from '@utils/transform'
import { type ComponentProps, useState } from 'react'

interface TokenAddressByChainPopoverProperties
  extends Omit<ComponentProps<'div'>, 'onChange'> {
  data: VaultType[]
  value: VaultType
  onChange: (chain: VaultType) => void
}

export const TokenAddressByChainDrawerMobile = (
  props: TokenAddressByChainPopoverProperties,
) => {
  const { className, data, value, onChange } = props
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className={cn('flex items-center gap-2 text-base', className)}>
        <TokenIconComponent className="size-6" symbol={value.chain_id} />
        <p className="ml-1">{shortenAddress(value.address)}</p>
        <CopyButton className="size-6" text={value.address} />
        <div className="mx-1 h-6 w-[2px] bg-stroke-100" />
        <ArrowDown className={cn('size-6 transition', isOpen && 'rotate-180')} />
      </DrawerTrigger>
      <DrawerContent
        withDraggable={false}
        aria-describedby={undefined}
        className="px-4 pt-6"
      >
        <DrawerHeader className="mb-5 flex w-full items-center justify-between">
          <DrawerTitle className="text-lg font-bold text-text-90">Contract</DrawerTitle>
          <DrawerClose>
            <X className="size-6 [&_path]:stroke-gray-100" />
          </DrawerClose>
        </DrawerHeader>
        <div className="flex max-h-[50lvh] flex-col gap-5 overflow-y-scroll pb-6 pr-3 text-base">
          {data.map((item, i) => {
            const chainName =
              CHAIN_NAMES_BY_ID[item.chain_id as keyof typeof CHAIN_NAMES_BY_ID]
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
                  <TokenIconComponent className="size-6" symbol={item.chain_id} />
                  <p className="leading-[0rem]">{chainName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p>{shortenAddress(item.address)}</p>
                  {value === item ? (
                    <Check className="size-[1.125rem]" />
                  ) : (
                    <CopyButton text={item.address} />
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
