/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-shadow */

import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import { useTokensBalance } from '@api/tokens-balance/use-tokens-balance'
import Search from '@assets/icons/search.svg'
import { ChoiceBox } from '@components/box/ChoiceBox'
import { SystemMessage } from '@components/system-message'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Dialog, DialogHeader, DialogTrigger } from '@components/ui/dialog'
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
          className={cn(asset?.contract_ticker_symbol, !asset && 'px-3 py-5')}
          icon={
            asset?.contract_ticker_symbol && (
              <TokenWithNetwork
                symbol={asset?.contract_ticker_symbol}
                network={asset?.chain_id}
                tokenLogoFallback={asset?.logo_url}
                position="bottom-right"
                classNames={{
                  token: 'rounded-full overflow-hidden',
                }}
                width={isBelowDesktop ? '1.25rem' : '2.14288rem'}
              />
            )
          }
        />
      </DialogTrigger>

      <ResponsiveDialogContent
        className="max-w-[31.25rem] border border-stroke-100"
        opened={opened}
        setOpened={setOpened}
      >
        <DialogHeader className="border-b border-stroke-100 px-6 py-[1.12rem] normal-case max-lg:text-left">
          <h3 className="text-base/none font-medium text-text-3100">Select assets</h3>
        </DialogHeader>

        <div className="relative flex w-full items-stretch gap-2 px-6 py-4 max-lg:max-w-full">
          <label
            htmlFor="search-input"
            className="flex grow items-center gap-2 rounded-xl bg-input-default px-6 py-4"
          >
            <Search />
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

        <ScrollArea className="h-[19.5rem] overscroll-none px-1 max-lg:h-auto max-lg:grow">
          <div className="space-y-1">
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
                selected={
                  `${asset?.contract_address}-${asset?.chain_id}` ===
                  `${token.contract_address}-${token.chain_id}`
                }
              />
            ))}

            {filteredTokens?.length === 0 && searchValue && (
              <SystemMessage
                className="mx-5"
                variant="error"
                message="Whoops...This token was not found"
              />
            )}
          </div>
        </ScrollArea>
      </ResponsiveDialogContent>
    </Dialog>
  )
}
