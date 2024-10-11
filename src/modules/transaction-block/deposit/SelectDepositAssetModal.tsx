/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-shadow */
import type { ITokenData } from '@api/tokens-balance/api'
import { useTokensBalance } from '@api/tokens-balance/use-tokens-balance'
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
import { CHAIN_IDS_BY_NAME, type ChainType } from '@constants/chains'
import { SupportedChainIds } from '@constants/vaults'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { cn } from '@utils/cn'
import { formatTokenBalance } from '@utils/formatValue'
import BigNumber from 'bignumber.js'
import { useMemo, useState } from 'react'
import { useAccount } from 'wagmi'

import { SelectNetworkPopover } from '../SelectNetworkPopover'
import { useTxStore } from '../store/useTxStore'

// -------------------- Types --------------------

interface ResponsiveDialogContentProperties
  extends React.ComponentPropsWithoutRef<typeof DialogContent> {
  opened: boolean
  setOpened: (isOpen: boolean) => void
}

// -------------------- Components --------------------

/**
 * Renders the trigger for selecting a chain
 */
const SelectChainTrigger = ({ chain }: { chain: ChainType | null }) => {
  const chainData = useTokenAsset(chain)

  return (
    <div className="flex items-center gap-[0.38rem] text-lg/[0] font-bold">
      {chain && (
        <div className="overflow-hidden rounded-full">
          <TokenIconComponent symbol={chain} className="size-4" />
        </div>
      )}
      <span>{chainData?.name || 'All networks'}</span>
    </div>
  )
}

/**
 * Renders a single token item in the list
 * @param onChange - Function to call when the token is selected
 * @param token - Token data to display
 */
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
        classNames={{
          token: 'rounded-full',
        }}
        position="bottom-right"
        width="2.14288rem"
      />

      <div className="ml-3 flex flex-col items-start max-lg:items-start max-lg:text-left">
        <p className="text-[1.25rem]/[1.75rem] text-text max-lg:max-w-[8.5rem] ">
          {token.contract_ticker_symbol}
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

/**
 * Renders a responsive dialog content
 * @param props - Component properties
 */
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

// -------------------- Helper Functions --------------------

/**
 * Sorts tokens by quote in descending order
 * @param tokens - Array of tokens to sort
 */
const sortTokensByQuote = (tokens: ITokenData[]) => {
  return tokens.sort((a, b) => b.quote - a.quote)
}

/**
 * Filters tokens based on supported addresses and non-zero balance
 * @param tokens - Array of tokens to filter
 * @param supportedTokensAddr - Array of supported token addresses
 */
const filterTokens = (tokens: ITokenData[], supportedTokensAddr: string[]) => {
  return tokens.filter(
    (token) =>
      supportedTokensAddr.includes(token.contract_address.toLowerCase()) &&
      !BigNumber(token?.balance ? token?.balance?.toString() : 0).isZero(),
  )
}

/**
 * Searches tokens based on name or symbol
 * @param tokens - Array of tokens to search
 * @param searchValue - Search query
 */
const searchTokens = (tokens: ITokenData[], searchValue: string) => {
  return tokens.filter(
    (token) =>
      token.contract_name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      token.contract_ticker_symbol?.toLowerCase().includes(searchValue.toLowerCase()),
  )
}

// -------------------- Main Component --------------------

export const SelectDepositAsset = () => {
  const { isBelowDesktop } = useDeviceWidth()
  const [searchValue, setSearchValue] = useState('')
  const [opened, setOpened] = useState(false)

  const { address } = useAccount()
  const { data: userTokens, isLoading } = useTokensBalance({ address })

  // const { squid } = useSquidSDK()

  // const supportedBySquidTokens = squid?.tokens as Token[]
  // const supportedTokensAddr = useMemo(() => {
  //   return supportedBySquidTokens?.map((token) => token.address.toLowerCase())
  // }, [supportedBySquidTokens])

  const [chain, setNetwork] = useState<ChainType | null>(null)

  const {
    depositAsset: asset,
    setDepositAsset: setAsset,
    setDepositToNetwork,
    setDepositFromNetwork,
    resetStore,
  } = useTxStore()

  // -------------------- Handlers --------------------

  /**
   * Handles the change of selected asset
   * @param _asset - The selected asset
   */
  const onChange = (_asset: ITokenData) => {
    resetStore()
    setAsset(_asset)
    setDepositFromNetwork(_asset.chain_id as ChainType)

    if (SupportedChainIds.includes(_asset.chain_id)) {
      setDepositToNetwork(_asset.chain_id as ChainType)
    } else {
      setDepositToNetwork(CHAIN_IDS_BY_NAME.Arbitrum)
    }

    setOpened(false)
  }

  // -------------------- Memoized Values --------------------

  const filteredByChainTokens = useMemo(() => {
    // if (!userTokens || !supportedTokensAddr || supportedBySquidTokens?.length === 0)
    if (!userTokens) return []

    if (chain) {
      const chainTokens = userTokens[chain] || []
      const filteredChainTokens = searchValue
        ? searchTokens(chainTokens, searchValue)
        : chainTokens
      // return sortTokensByQuote(filterTokens(filteredChainTokens, supportedTokensAddr))
      return sortTokensByQuote(filteredChainTokens)
    }

    const allTokens = Object.values(userTokens).flat()
    const filteredAllTokens = searchValue
      ? searchTokens(allTokens, searchValue)
      : allTokens
    // return sortTokensByQuote(filterTokens(filteredAllTokens, supportedTokensAddr))
    return sortTokensByQuote(filteredAllTokens)
  }, [userTokens, chain, searchValue])

  // -------------------- Render --------------------

  return (
    <Dialog open={opened} onOpenChange={() => setOpened(!opened)}>
      <DialogTrigger>
        <ChoiceBox
          className="min-w-[10.5rem]"
          value={asset?.contract_ticker_symbol || 'Select asset'}
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
              onChange={(_network) => setNetwork(_network)}
              trigger={<SelectChainTrigger chain={chain} />}
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
