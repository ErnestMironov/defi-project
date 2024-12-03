/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-shadow */

import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import { useTokensBalance } from '@api/tokens-balance/use-tokens-balance'
import Search from '@assets/icons/search.svg'
import WarnIcon from '@assets/icons/warn.svg'
import { ChoiceBox } from '@components/box/ChoiceBox'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Dialog, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/dialog'
import { ScrollArea } from '@components/ui/scroll-area'
import { Skeleton } from '@components/ui/skeleton'
import { type ChainType } from '@constants/chains'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { cn } from '@utils/cn'
import { useState } from 'react'
import { useAccount } from 'wagmi'

import { SelectNetworkPopover } from '../SelectNetworkPopover'
import { ResponsiveDialogContent } from './components/ResponsiveDialogContent'
import { SelectChainTrigger } from './components/SelectChainTrigger'
import { TokensListItem } from './components/TokensListItem'
import { useAssetSelection } from './hooks/useAssetSelection'
import { useTokensList } from './hooks/useTokensList'

export const SelectDepositAsset = () => {
  const { isBelowDesktop } = useDeviceWidth()
  const [searchValue, setSearchValue] = useState('')
  const [opened, setOpened] = useState(false)
  const [chain, setNetwork] = useState<ChainType | null>(null)

  const { address } = useAccount()
  const { data: userTokens, isLoading } = useTokensBalance({ address })
  const { asset, handleAssetChange } = useAssetSelection()

  const filteredTokens = useTokensList(
    userTokens as Record<string, ITokenData[]> | undefined,
    chain,
    searchValue,
  )

  const handleSelect = (selectedAsset: ITokenData) => {
    handleAssetChange(selectedAsset)
    setOpened(false)
  }

  return (
    <Dialog open={opened} onOpenChange={() => setOpened(!opened)}>
      <DialogTrigger>
        <ChoiceBox
          value={asset?.contract_ticker_symbol || 'Select asset'}
          className={cn(asset?.contract_ticker_symbol)}
          icon={
            asset?.contract_ticker_symbol && (
              <TokenWithNetwork
                symbol={asset?.contract_ticker_symbol}
                network={asset?.chain_id}
                position="bottom-right"
                width={isBelowDesktop ? '1.25rem' : '2.14288rem'}
              />
            )
          }
        />
      </DialogTrigger>

      <ResponsiveDialogContent opened={opened} setOpened={setOpened}>
        <div className="flex flex-col gap-8 max-lg:gap-4">
          <DialogHeader className="max-lg:text-left">
            <DialogTitle>Select asset</DialogTitle>
          </DialogHeader>

          <div className="relative flex w-full items-center rounded-2xl border border-stroke-100 px-6 py-4 max-lg:max-w-full">
            <Search />
            <label htmlFor="search-input" className="mx-3 grow">
              <input
                id="search-input"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                className="max-w-full bg-transparent text-lg placeholder:text-gray-100 focus:outline-none max-lg:max-w-24"
                placeholder="Search"
              />
            </label>
            <SelectNetworkPopover
              chain={chain}
              onChange={setNetwork}
              trigger={<SelectChainTrigger chain={chain} />}
              showAllNetworksOption
            />
          </div>
        </div>

        <ScrollArea className="-mx-4 h-[19.5rem] overscroll-none px-4 max-lg:h-auto max-lg:grow">
          <div className="space-y-2">
            {isLoading && (
              <>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="flex h-[4.5rem] w-full cursor-pointer items-center rounded-xl border border-stroke-100 px-4 py-3 hover:bg-input-default"
                  />
                ))}
              </>
            )}

            {filteredTokens?.map((token) => (
              <TokensListItem
                key={`${token?.contract_address}-${token?.chain_id}`}
                onChange={handleSelect}
                token={token}
              />
            ))}

            {filteredTokens?.length === 0 && searchValue && (
              <div className="flex h-auto items-start gap-2 rounded-xl bg-orange-15 p-4">
                <WarnIcon className="size-[2.14288rem] text-red-600" />
                <p className="flex flex-col gap-2 font-[Arial] text-[1.25rem] leading-[150%]">
                  Unknown token
                  <span className="text-base leading-none">This token was not found</span>
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </ResponsiveDialogContent>
    </Dialog>
  )
}
