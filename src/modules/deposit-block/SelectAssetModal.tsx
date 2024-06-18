import Search from '@assets/icons/search.svg'
import { Select } from '@components/select/Select'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
import { ScrollArea } from '@components/ui/scroll-area'
import { type ComponentProps, useState } from 'react'

import { SelectNetworkPopover } from './SelectNetworkPopover'
import type { Asset } from './store/useDepositStore'
import { useDepositStore } from './store/useDepositStore'

interface SelectAssetModalProperties extends ComponentProps<'div'> {}

const MOCK_TOKENS = [
  { name: 'USDC', symbol: 'USDC', network: 'Optimism' },
  { name: 'USDT', symbol: 'USDT', network: 'Base' },
  { name: 'DAI', symbol: 'DAI', network: 'Arbitrum' },
  { name: 'FRAX', symbol: 'FRAX', network: 'Arbitrum' },
  { name: 'USDC', symbol: 'USDC', network: 'Optimism' },
  { name: 'USDT', symbol: 'USDT', network: 'Base' },
  { name: 'DAI', symbol: 'DAI', network: 'Arbitrum' },
  { name: 'FRAX', symbol: 'FRAX', network: 'Arbitrum' },
  { name: 'USDC', symbol: 'USDC', network: 'Optimism' },
  { name: 'USDT', symbol: 'USDT', network: 'Base' },
  { name: 'DAI', symbol: 'DAI', network: 'Arbitrum' },
  { name: 'FRAX', symbol: 'FRAX', network: 'Arbitrum' },
]

export const SelectAsset = (_props: SelectAssetModalProperties) => {
  const { asset, setAsset } = useDepositStore()
  const [opened, setOpened] = useState(false)
  const onChange = (_asset: Asset) => {
    setAsset(_asset)
    setOpened(false)
  }
  return (
    <Dialog open={opened} onOpenChange={() => setOpened(!opened)}>
      <DialogTrigger className="group">
        <Select
          value={asset?.symbol || 'Any token'}
          icon={
            asset && (
              <TokenWithNetwork
                symbol={asset?.symbol}
                network={asset?.network}
                position="bottom-right"
                width="2.14288rem"
              />
            )
          }
        />
      </DialogTrigger>
      <DialogContent className="gap-6 text-text-100">
        <DialogHeader>
          <DialogTitle>Select asset</DialogTitle>
        </DialogHeader>
        <div className="relative mb-6 flex w-full items-center rounded-2xl border border-stroke px-6 py-4">
          <Search />
          <input
            type="text"
            className="mx-3 grow text-lg placeholder:text-gray-100 focus:outline-none"
            placeholder="Search"
          />
          <SelectNetworkPopover />
        </div>
        <ScrollArea className="-mx-4 h-[19.5rem] px-4">
          <div className="space-y-2">
            {MOCK_TOKENS.map(({ symbol, network, name }) => (
              <button
                type="button"
                onClick={() => onChange({ symbol, network, name })}
                className="flex w-full cursor-pointer items-center rounded-xl border border-stroke px-4 py-3 hover:bg-violet-4"
              >
                <TokenWithNetwork
                  symbol={symbol}
                  network={network}
                  position="bottom-right"
                  width="2.14288rem"
                />
                {/* <div className="relative">
                  <TokenIconComponent symbol={symbol} className="size-8" />
                  <div className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-white">
                    <TokenIconComponent symbol={network} className="size-3.5" />
                  </div>
                </div> */}
                <div className="ml-3 flex flex-col items-start">
                  <p className="text-[1.25rem]/[1.75rem] text-text-100">{name}</p>
                  <p className="text-[0.9375rem]/[1.125rem] text-gray/80">{network}</p>
                </div>
                <div className="ml-auto flex flex-col items-end gap-[0.12rem]">
                  <p className="text-base text-text-100">7,472.09 {symbol}</p>
                  <p className="text-semi-base text-gray/80">$7,472.09</p>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
