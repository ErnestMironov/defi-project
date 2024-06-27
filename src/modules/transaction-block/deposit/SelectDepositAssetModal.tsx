/* eslint-disable @typescript-eslint/no-shadow */
import type { ITokenData } from '@api/tokens-balance/api'
import { useTokensBalance } from '@api/tokens-balance/use-tokens-balance'
import Search from '@assets/icons/search.svg'
import { Select } from '@components/select/Select'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
import { ScrollArea } from '@components/ui/scroll-area'
import useDeviceWidth from '@hooks/useDeviceWidth'
import { useTokenAsset } from '@hooks/useTokenAsset'
import { cn } from '@utils/cn'
import { formatTokenBalance } from '@utils/formatValue'
import { type ComponentProps, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAccount } from 'wagmi'

import { SelectNetworkPopover } from '../SelectNetworkPopover'
import { useDepositStore } from '../store/useDepositStore'

interface SelectDepositAssetModalProperties extends ComponentProps<'div'> {}

const SelectChainTrigger = () => {
  const { depositNetwork } = useDepositStore()
  const chainData = useTokenAsset(depositNetwork)

  return (
    <div className="flex items-center gap-[0.38rem] text-lg/[0] font-bold">
      <div className="overflow-hidden rounded-full">
        <TokenIconComponent symbol={depositNetwork} className="size-4" />
      </div>
      <span>{chainData?.name || 'All networks'}</span>
    </div>
  )
}

function TokensListItem({
  onChange,
  token,
}: {
  onChange: (_asset: ITokenData) => void
  token: ITokenData
}) {
  const chainData = useTokenAsset(token.chain_id)
  console.log('🚀 ~ chainData:', chainData)

  return (
    <button
      type="button"
      onClick={() => onChange(token)}
      className="flex w-full cursor-pointer items-center rounded-xl border border-stroke-100 px-4 py-3 hover:bg-input-default"
    >
      <TokenWithNetwork
        symbol={token.contract_ticker_symbol}
        tokenLogoFallback={token.logo_url}
        network={token.chain_id}
        position="bottom-right"
        width="2.14288rem"
      />

      <div className="ml-3 flex flex-col items-start">
        <p className="text-[1.25rem]/[1.75rem] text-text">{token.contract_name}</p>
        <p className="text-[0.9375rem]/[1.125rem] text-gray-80">{chainData?.name}</p>
      </div>
      <div className="ml-auto flex flex-col items-end gap-[0.12rem]">
        <p className="text-base text-text">
          {formatTokenBalance(token?.balance, token?.contract_decimals)}{' '}
          {token.contract_ticker_symbol}
        </p>
        <p className="text-semi-base text-gray-80">{token.pretty_quote}</p>
      </div>
    </button>
  )
}

export const SelectDepositAsset = (_props: SelectDepositAssetModalProperties) => {
  const { isBelowDesktop } = useDeviceWidth()

  const { address } = useAccount()
  const { data: userTokens } = useTokensBalance({ address })

  const {
    depositAsset: asset,
    setDepositAsset: setAsset,
    depositNetwork: chain,
    setDepositNetwork: setNetwork,
  } = useDepositStore()
  const [opened, setOpened] = useState(true)
  const onChange = (_asset: ITokenData) => {
    setAsset(_asset)
    setOpened(false)
  }
  if (isBelowDesktop) {
    return createPortal(
      <div
        className={cn(
          'fixed z-[50] h-screen w-screen translate-y-[100vh] bg-bg',
          opened && 'translate-y-0',
        )}
      >
        123
      </div>,
      document.body,
    )
  }
  return (
    <Dialog open={opened} onOpenChange={() => setOpened(!opened)}>
      <DialogTrigger>
        <Select
          value={asset?.contract_ticker_symbol || 'Any token'}
          icon={
            asset && (
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
      <DialogContent className="gap-6 text-text">
        <DialogHeader>
          <DialogTitle>Select asset</DialogTitle>
        </DialogHeader>
        <div className="relative flex w-full items-center rounded-2xl border border-stroke-100 px-6 py-4">
          <Search />
          <input
            type="text"
            className="mx-3 grow bg-transparent text-lg placeholder:text-gray-100 focus:outline-none"
            placeholder="Search"
          />
          <SelectNetworkPopover
            chain={chain}
            onChange={(_network) => setNetwork(_network)}
            trigger={<SelectChainTrigger />}
          />
        </div>
        <ScrollArea className="-mx-4 h-[19.5rem] px-4">
          <div className="space-y-2">
            {Object.values(userTokens ?? {})
              .flat()
              .flatMap((token) => (
                <TokensListItem
                  key={token.contract_address}
                  onChange={onChange}
                  token={token}
                />
              ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
