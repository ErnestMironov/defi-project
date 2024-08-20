/* eslint-disable @typescript-eslint/no-shadow */
import type { Token } from '@0xsquid/squid-types'
import useSquidSDK from '@api/squid-router/useSquidSdk'
import type { ITokenData } from '@api/tokens-balance/api'
import {
  COVALENT_CHAINS_MAPPER,
  useTokensBalance,
} from '@api/tokens-balance/use-tokens-balance'
import BigCloseBtn from '@assets/icons/big-close-btn.svg'
import BigCloseBtnDark from '@assets/icons/big-close-btn_dark.svg'
import Search from '@assets/icons/search.svg'
import WarnIcon from '@assets/icons/warn.svg'
import { ChoiceBox } from '@components/box/ChoiceBox'
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
import { Skeleton } from '@components/ui/skeleton'
import useDeviceWidth from '@hooks/useDeviceWidth'
import { useTokenAsset } from '@hooks/useTokenAsset'
import { cn } from '@utils/cn'
import { formatTokenBalance } from '@utils/formatValue'
import BigNumber from 'bignumber.js'
import { type ComponentProps, useMemo, useState } from 'react'
import { useAccount } from 'wagmi'

import { SelectNetworkPopover } from '../SelectNetworkPopover'
import { useTxStore } from '../store/useTxStore'

interface SelectDepositAssetModalProperties extends ComponentProps<'div'> {}

const SelectChainTrigger = () => {
  const { depositNetwork } = useTxStore()
  const chainData = useTokenAsset(depositNetwork)

  return (
    <button
      type="button"
      className="flex items-center gap-[0.38rem] text-lg/[0] font-bold"
    >
      {depositNetwork && (
        <div className="overflow-hidden rounded-full">
          <TokenIconComponent symbol={depositNetwork} className="size-4" />
        </div>
      )}
      <span>{chainData?.name || 'All networks'}</span>
    </button>
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

  return (
    <button
      type="button"
      onClick={() => onChange(token)}
      className="flex w-full cursor-pointer items-center rounded-xl border border-stroke-100 px-4 py-3 hover:bg-input-default max-lg:items-start"
    >
      <TokenWithNetwork
        symbol={token.contract_ticker_symbol}
        tokenLogoFallback={token.logo_url}
        network={token.chain_id}
        position="bottom-right"
        width="2.14288rem"
      />

      <div className="ml-3 flex flex-col items-start max-lg:items-start max-lg:text-left">
        <p className="text-[1.25rem]/[1.75rem] text-text max-lg:max-w-[8.5rem] ">
          {token.contract_name}
        </p>
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

interface ResponsiveDialogContentProperties
  extends React.ComponentPropsWithoutRef<typeof DialogContent> {
  opened: boolean
  setOpened: (isOpen: boolean) => void
}

const ResponsiveDialogContent: React.FC<ResponsiveDialogContentProperties> = ({
  className,
  children,
  opened,
  setOpened,
  ...props
}) => {
  const { isBelowDesktop } = useDeviceWidth()

  if (isBelowDesktop && opened) {
    return (
      <div
        className={cn(
          'fixed h-screen w-screen top-0 left-0 bg-white z-10 pt-[5.5rem] pb-12 px-4 flex flex-col gap-6 overscroll-none',
          'animate-translateIn bg-cards',
          className,
        )}
      >
        {children}

        <button
          type="button"
          aria-label="Close"
          onClick={() => {
            setOpened(false)
          }}
          className={cn(
            'm-auto flex size-[4.125rem] shrink-0 items-center justify-center',
            'active:opacity-50',
          )}
        >
          <BigCloseBtn className="size-full dark:hidden" />
          <BigCloseBtnDark className="hidden size-full dark:block" />
        </button>
      </div>
    )
  }

  return (
    <DialogContent className="gap-6 text-text max-lg:max-w-[95vw]" {...props}>
      {children}
    </DialogContent>
  )
}

export const SelectDepositAsset = (_props: SelectDepositAssetModalProperties) => {
  const { isBelowDesktop } = useDeviceWidth()
  const [searchValue, setSearchValue] = useState('')

  const { address } = useAccount()
  const { data: userTokens, isLoading } = useTokensBalance({ address })

  const { squid } = useSquidSDK()

  const supportedBySquidTokens = squid?.tokens as Token[]
  const supportedTokensAddr = useMemo(() => {
    return supportedBySquidTokens?.map((token) => token.address.toLowerCase())
  }, [supportedBySquidTokens])

  const {
    depositAsset: asset,
    setDepositAsset: setAsset,
    depositNetwork: chain,
    setDepositNetwork: setNetwork,
    setRepresentationTokensChain,
  } = useTxStore()
  const [opened, setOpened] = useState(false)
  const onChange = (_asset: ITokenData) => {
    setAsset(_asset)
    setRepresentationTokensChain(
      COVALENT_CHAINS_MAPPER[_asset.chain_id as keyof typeof COVALENT_CHAINS_MAPPER],
    )
    setOpened(false)
  }

  const sortTokensByQuote = (tokens: ITokenData[]) => {
    return tokens.sort((a, b) => b.quote - a.quote)
  }

  const filterTokens = (tokens: ITokenData[], supportedTokensAddr: string[]) => {
    return tokens.filter(
      (token) =>
        supportedTokensAddr.includes(token.contract_address.toLowerCase()) &&
        !BigNumber(token?.balance ? token?.balance?.toString() : 0).isZero(),
    )
  }

  const searchTokens = (tokens: ITokenData[], searchValue: string) => {
    return tokens.filter(
      (token) =>
        token.contract_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        token.contract_ticker_symbol?.toLowerCase().includes(searchValue.toLowerCase()),
    )
  }

  const filteredByChainTokens = useMemo(() => {
    if (!userTokens || !supportedTokensAddr || supportedBySquidTokens?.length === 0)
      return []

    if (chain) {
      const chainTokens = userTokens[chain] || []
      const filteredChainTokens = searchValue
        ? searchTokens(chainTokens, searchValue)
        : chainTokens
      return sortTokensByQuote(filterTokens(filteredChainTokens, supportedTokensAddr))
    }

    const allTokens = Object.values(userTokens).flat()
    const filteredAllTokens = searchValue
      ? searchTokens(allTokens, searchValue)
      : allTokens
    return sortTokensByQuote(filterTokens(filteredAllTokens, supportedTokensAddr))
  }, [
    userTokens,
    supportedTokensAddr,
    supportedBySquidTokens?.length,
    chain,
    searchValue,
  ])

  return (
    <Dialog open={opened} onOpenChange={() => setOpened(!opened)}>
      <DialogTrigger>
        <ChoiceBox
          className="min-w-[10.5rem]"
          value={asset?.contract_ticker_symbol || 'Any token'}
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
            <div className="mx-3 grow">
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                className="max-w-full bg-transparent text-lg placeholder:text-gray-100 focus:outline-none max-lg:max-w-24"
                placeholder="Search"
              />
            </div>
            <SelectNetworkPopover
              chain={chain}
              onChange={(_network) => setNetwork(_network)}
              trigger={<SelectChainTrigger />}
              showAllNetworksOption
            />
          </div>
        </div>

        <ScrollArea className="-mx-4 h-[19.5rem] overscroll-none px-4 max-lg:h-auto max-lg:grow">
          <div className="space-y-2">
            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="flex h-[4.5rem] w-full cursor-pointer items-center rounded-xl border border-stroke-100 px-4 py-3 hover:bg-input-default"
                />
              ))}
            {filteredByChainTokens?.map((token) => (
              <TokensListItem
                // eslint-disable-next-line no-unsafe-optional-chaining
                key={token?.contract_address + token?.chain_id}
                onChange={onChange}
                token={token}
              />
            ))}
            {filteredByChainTokens?.length <= 0 && searchValue && (
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
