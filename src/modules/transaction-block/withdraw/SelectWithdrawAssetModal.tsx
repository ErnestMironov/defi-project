/* eslint-disable @typescript-eslint/no-shadow */

import type { TokenShares } from '@api/contracts/useGetUserShares'
import { useUserShares } from '@api/contracts/useGetUserShares'
import CheckedIcon from '@assets/icons/check.svg'
import { ChoiceBox } from '@components/box/ChoiceBox'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import type { ChainType } from '@constants/chains'
import type { WithdrawToken } from '@hooks/tokens/useTokensList'
import { useTokensList } from '@hooks/tokens/useTokensList'
import { useUniqueTokens } from '@hooks/tokens/useUniqueTokens'
import { cn } from '@utils/cn'
import { formatAmount, formatAmountValue } from '@utils/formatValue'
import { useMemo } from 'react'
import { formatUnits } from 'viem'
import { useAccount, useSwitchChain } from 'wagmi'

import { useTxStore } from '../store/useTxStore'
import { useGetMTokenInfo } from './hooks/useGetMTokenInfo'
import { UniversalSelectModal } from './UniversalSelectModal'

const WithdrawAssetItem = ({
  token,
  onChange,
  selected,
}: {
  token: TokenShares
  onChange: (token: WithdrawToken) => void
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
      onClick={() => onChange(tokenData)}
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
            <span className="text-text-60">$</span>
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

  const { data, isLoading: isUserSharesLoading } = useUserShares(
    '0xd70fa171c3a814a7C1c3DFc16A74c71F5e70AD90',
  )
  const balances = useUniqueTokens(data?.shares)

  const onChange = (_asset: WithdrawToken | null) => {
    if (!_asset) return
    setMToken(_asset)
    if (_asset?.chainId) {
      _switchChain({
        chainId: _asset.chainId,
      })
      setWithdrawToNetwork(_asset.chainId as ChainType)
      setWithdrawFromNetwork(_asset.chainId as ChainType)
    }
  }

  const tokensList = useTokensList<WithdrawToken>

  const filterTokens = (
    items: WithdrawToken[] | Record<string, WithdrawToken[]>,
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
    <UniversalSelectModal<WithdrawToken>
      selectedItem={mtToken as WithdrawToken | undefined}
      items={balances}
      filterBySearch
      filterByNetwork
      isLoading={isUserSharesLoading}
      filterItems={filterTokens}
      renderTrigger={(selectedItem) => (
        <ChoiceBox
          value={selectedItem?.stable?.toUpperCase() || 'Select asset'}
          className={cn(
            selectedItem?.stable,
            !selectedItem && 'px-4 py-5 max-lg:py-[1rem] max-lg:px-[1.25rem]',
            'hover:bg-[#8585A914]',
          )}
          icon={
            <TokenWithNetwork
              classNames={{
                token: 'rounded-full overflow-hidden size-9',
                network: 'rounded-md size-4',
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
          onChange={onItemChange}
        />
      )}
      onChange={onChange}
    />
  )
}
