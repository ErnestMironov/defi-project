import { CopyButton } from '@components/copy/CopyButton'
import { TokenIconComponent } from '@components/token-icon'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { useDisclosure } from '@hooks/useDisclosure'
import type { ComponentProps } from 'react'

interface TokenAddressByChainPopoverProperties
  extends Omit<ComponentProps<'div'>, 'onChange'> {
  chainAddresses: {
    chain: string
    address: string
  }[]
  selectedChain: string
  onChange: (chain: string) => void
}

export const TokenAddressByChainPopover = (
  props: TokenAddressByChainPopoverProperties,
) => {
  const { className, chainAddresses, selectedChain, onChange, ...rest } = props
  const [isOpen, { close, toggle }] = useDisclosure(false)
  return (
    <Popover open={isOpen} onOpenChange={toggle}>
      <PopoverTrigger className={className}>
        <p className="text-lg">{selectedChain}</p>
      </PopoverTrigger>
      <PopoverContent className="text-lg">
        {chainAddresses.map((item) => (
          <div
            key={item.chain}
            onClick={() => {
              onChange(item.chain)
              close()
            }}
          >
            <TokenIconComponent className="size-5" symbol={item.chain} />
            <p className="ml-2">{item.chain}</p>
            <p>{item.address}</p>
            <CopyButton text={item.address} />
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
