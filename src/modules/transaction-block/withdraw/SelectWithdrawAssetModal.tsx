/* eslint-disable @typescript-eslint/no-shadow */

import { ChoiceBox } from '@components/box/ChoiceBox'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import type { TokenShares } from '@hooks/useGetUserShares'
import { useUserShares } from '@hooks/useGetUserShares'
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
}: {
  token: TokenShares
  onChange: (token: UseGetMTokenInfoReturn) => void
}) => {
  const tokenData = useGetMTokenInfo(token)

  return (
    <button
      type="button"
      onClick={() => onChange({ ...token, ...tokenData })}
      className="flex w-full cursor-pointer items-center rounded-xl border border-stroke-100 px-4 py-3 hover:bg-input-default"
    >
      <TokenWithNetwork
        className="size-8"
        symbol={token.stable}
        network={token.chainId}
      />
      <div className="ml-3 flex flex-col items-start text-[1.25rem]/[1.75rem]">
        {token.stable.toUpperCase()}
        <span className="font-[Arial] text-[0.9375rem] font-normal not-italic leading-none text-gray-80">
          {tokenData.chainData?.name}
        </span>
      </div>
      <div className="ml-auto flex flex-col items-end gap-1">
        <p className="text-base text-text">
          {formatAmount(formatUnits(BigInt(token.stableBalance), token?.decimals), {
            maximumFractionDigits: 2,
          })}{' '}
          {token.stable.toUpperCase()}
        </p>
        <p className="text-semi-base font-bold text-gray-80">
          $
          {formatAmountValue(
            formatUnits(BigInt(token.stableBalance), token?.decimals),
            2,
          )}{' '}
        </p>
      </div>
    </button>
  )
}

export const SelectWithdrawAssetModal = () => {
  const { mtToken, setMToken, setWithdrawToNetwork, setWithdrawFromNetwork } =
    useTxStore()
  const { switchChain: _switchChain } = useSwitchChain()
  const { address } = useAccount()

  const { shares, isLoading: isUserSharesLoading } = useUserShares(address)

  const balances = useMemo(() => {
    if (!shares) return []

    return [...shares]
      .filter((token) => token.balance > 999_999)
      .sort((a, b) => Number(b.balance) - Number(a.balance))
  }, [shares])

  const onChange = (_asset: UseGetMTokenInfoReturn) => {
    console.log('🚀 ~ onChange ~ _asset:', _asset)
    setMToken(_asset)
    if (_asset?.chainId) {
      _switchChain({
        chainId: _asset?.chainId,
      })
      setWithdrawToNetwork(_asset?.chainId as any)
      setWithdrawFromNetwork(_asset?.chainId as any)
    }
  }

  return (
    <UniversalSelectModal<TokenShares, UseGetMTokenInfoReturn>
      title="Select asset"
      selectedItem={mtToken}
      items={balances}
      isLoading={isUserSharesLoading}
      renderTrigger={(selectedItem) => (
        <ChoiceBox
          value={selectedItem?.stable?.toUpperCase() || 'Select asset'}
          className="min-w-[10.5rem]"
          icon={
            <TokenWithNetwork
              className="size-[2.14288rem] max-lg:size-[1.125rem]"
              symbol={selectedItem?.stable}
              network={selectedItem?.chainId}
            />
          }
        />
      )}
      renderItem={(token, onItemChange) => (
        <WithdrawAssetItem
          key={token?.chainId}
          token={token}
          onChange={(value) => {
            console.log('🚀 ~ onChange ~ value:', value)
            console.log('🚀 ~ onChange ~ onItemChange:', onItemChange)
            onItemChange(value)
          }}
        />
      )}
      onChange={onChange}
    />
  )
}
