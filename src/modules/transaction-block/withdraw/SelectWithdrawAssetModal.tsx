/* eslint-disable @typescript-eslint/no-shadow */

import type { TokenShares } from '@api/contracts/useGetUserShares'
import { useUserShares } from '@api/contracts/useGetUserShares'
import CheckedIcon from '@assets/icons/check.svg'
import { ChoiceBox } from '@components/box/ChoiceBox'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import type { ChainType } from '@constants/chains'
import { useTokensList } from '@hooks/tokens/useTokensList'
import { cn } from '@utils/cn'
import { formatAmount, formatAmountValue } from '@utils/formatValue'
import { useMemo } from 'react'
import { formatUnits } from 'viem'
import { useAccount, useSwitchChain } from 'wagmi'

import { useTxStore } from '../store/useTxStore'
import type { UseGetMTokenInfoReturn } from './hooks/useGetMTokenInfo'
import { useGetMTokenInfo } from './hooks/useGetMTokenInfo'
import { UniversalSelectModal } from './UniversalSelectModal'

const WithdrawAssetItem = ({
  token,
  onChange,
  selected,
}: {
  token: TokenShares
  onChange: (token: UseGetMTokenInfoReturn) => void
  selected: boolean
}) => {
  const tokenData = useGetMTokenInfo(token)

  const formattedBalance = useMemo(() => {
    if (!token?.stableBalance || !token?.decimals) return '0'
    try {
      return formatUnits(BigInt(token.stableBalance), token.decimals)
    } catch {
      return '0'
    }
  }, [token?.stableBalance, token?.decimals])

  return (
    <button
      type="button"
      onClick={() => onChange({ ...token, ...tokenData })}
      className="flex w-full cursor-pointer items-center justify-between rounded-xl px-5 py-4 hover:bg-input-active max-lg:items-start"
    >
      <div className="flex items-center gap-[0.67rem]">
        <TokenIconComponent className="size-9" symbol={token?.stable} />
        <div className="flex flex-col items-start gap-[0.13rem] max-lg:items-start max-lg:text-left">
          <p className="text-base/[1.5rem] text-text-1100">
            {formatAmount(formattedBalance, {
              maximumFractionDigits: 2,
            })}{' '}
            {token?.stable?.toUpperCase() || ''}
          </p>
          <div className="flex items-center gap-[0.22rem]">
            <TokenIconComponent
              symbol={tokenData?.chainData?.chainId}
              className="size-4 overflow-hidden rounded-md"
            />
            <p className="text-[0.875rem]/[1rem] text-text-2100/60">
              {tokenData?.chainData?.name}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <div className="ml-auto flex flex-col items-end gap-[0.12rem]">
          <p className="text-medium text-base text-text-1100">
            <span className="text-text-270">$</span>
            {formatAmountValue(formattedBalance, 2)}{' '}
          </p>
        </div>
        {selected && <CheckedIcon className="size-4" />}
      </div>
    </button>
  )
}

export const SelectWithdrawAssetModal = () => {
  const { mtToken, setMToken, setWithdrawToNetwork, setWithdrawFromNetwork } =
    useTxStore()
  const { switchChain: _switchChain } = useSwitchChain()
  const { address } = useAccount()

  const { data, isLoading: isUserSharesLoading } = useUserShares(address)
  const shares = data?.shares

  const balances = useMemo(() => {
    if (!shares) return {}

    const uniqueTokens = shares
      .filter((token) => token.balance > 999_999)
      .reduce((map, token) => {
        const key = `${token.chainId}-${token.address}`
        const existing = map.get(key)

        if (!existing || token.balance > existing.balance) {
          map.set(key, token)
        }

        return map
      }, new Map<string, TokenShares>())

    return Array.from(uniqueTokens.values()).reduce(
      (accumulator, token) => {
        const chainId = token.chainId.toString()
        if (!accumulator[chainId]) {
          accumulator[chainId] = []
        }
        accumulator[chainId].push(token)
        return accumulator
      },
      {} as Record<string, TokenShares[]>,
    )
  }, [shares])

  const onChange = (_asset: UseGetMTokenInfoReturn | null) => {
    if (!_asset) return
    setMToken(_asset)
    if (_asset?.chainId) {
      _switchChain({
        chainId: _asset.chainId,
      })
      setWithdrawToNetwork(_asset.chainId as any)
      setWithdrawFromNetwork(_asset.chainId as any)
    }
  }

  const tokensList = useTokensList<TokenShares>

  const filterTokens = (
    items: TokenShares[] | Record<string, TokenShares[]>,
    searchValue: string,
    network: ChainType | null,
  ) => {
    if (Array.isArray(items) && !network) {
      return tokensList({ all: items }, null, searchValue)
    }

    if (!Array.isArray(items)) {
      return tokensList(items, network, searchValue)
    }

    return []
  }

  return (
    <UniversalSelectModal<TokenShares, UseGetMTokenInfoReturn | null>
      selectedItem={mtToken as TokenShares | undefined}
      items={balances}
      filterBySearch
      filterByNetwork
      isLoading={isUserSharesLoading}
      filterItems={filterTokens}
      renderTrigger={(selectedItem) => (
        <ChoiceBox
          value={selectedItem?.stable?.toUpperCase() || 'Select asset'}
          className={cn(selectedItem?.stable, !selectedItem && 'px-3 py-5')}
          icon={
            <TokenWithNetwork
              classNames={{
                token: 'rounded-full overflow-hidden size-9',
              }}
              symbol={selectedItem?.stable}
              network={selectedItem?.chainId}
            />
          }
        />
      )}
      renderItem={(token, onItemChange) => (
        <WithdrawAssetItem
          key={`${token?.chainId}-${token?.address}`}
          token={token}
          selected={
            String(mtToken?.chainId) + String(mtToken?.address) ===
            String(token?.chainId) + String(token?.address)
          }
          onChange={(value) => {
            onItemChange(value)
          }}
        />
      )}
      onChange={onChange}
    />
  )
}
