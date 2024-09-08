/* eslint-disable @typescript-eslint/no-shadow */

import type { ParsedSharesBalanceResponse } from '@api/maat-finance/types'
import { useGetSharesBalance } from '@api/maat-finance/useGetSharesBalance'
import { ChoiceBox } from '@components/box/ChoiceBox'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { formatAmountValue } from '@utils/formatValue'
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
  token: ParsedSharesBalanceResponse['balances'][number]
  onChange: (token: UseGetMTokenInfoReturn) => void
}) => {
  const tokenData = useGetMTokenInfo(token)

  return (
    <button
      type="button"
      onClick={() => onChange({ ...token, ...tokenData } as UseGetMTokenInfoReturn)}
      className="flex w-full cursor-pointer items-center rounded-xl border border-stroke-100 px-4 py-3 hover:bg-input-default"
    >
      <TokenWithNetwork
        className="size-8"
        symbol={tokenData?.stable}
        network={tokenData?.chainData?.chainId}
      />
      <div className="ml-3 flex flex-col items-start text-[1.25rem]/[1.75rem]">
        {tokenData?.stable.toUpperCase()}
        <span className="font-[Arial] text-[0.9375rem] font-normal not-italic leading-none text-gray-80">
          {tokenData?.chainData?.name}
        </span>
      </div>
      <div className="ml-auto flex flex-col items-end gap-1">
        <p className="text-base text-text">
          {formatAmountValue(formatUnits(BigInt(token.value), token?.decimals))}{' '}
          {tokenData?.stable.toUpperCase()}
        </p>
        <p className="text-semi-base font-bold text-gray-80">
          ${formatAmountValue(formatUnits(BigInt(token.value), token?.decimals), 2)}{' '}
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

  const { data, isLoading } = useGetSharesBalance(address)

  const balances = useMemo(() => {
    if (!data?.data?.balances) return []

    return [...data.data.balances]
      .filter((token) => token.value > 999_999)
      .sort((a, b) => Number(b.value) - Number(a.value))
  }, [data?.data?.balances])

  const onChange = (_asset: UseGetMTokenInfoReturn) => {
    console.log('🚀 ~ onChange ~ _asset:', _asset)
    setMToken(_asset)
    if (_asset?.chainData?.chainId) {
      _switchChain({
        chainId: _asset?.chainData?.chainId,
      })
      setWithdrawToNetwork(_asset?.chainData?.chainId as any)
      setWithdrawFromNetwork(_asset?.chainData?.chainId as any)
    }
  }

  return (
    <UniversalSelectModal
      title="Select asset"
      selectedItem={mtToken}
      items={balances as unknown as UseGetMTokenInfoReturn[]}
      isLoading={isLoading}
      renderTrigger={(selectedItem) => (
        <ChoiceBox
          value={selectedItem?.stable?.toUpperCase() || 'Any token'}
          className="min-w-[10.5rem]"
          icon={
            <TokenWithNetwork
              className="size-[2.14288rem] max-lg:size-[1.125rem]"
              symbol={selectedItem?.stable}
              network={selectedItem?.chainData?.chainId}
            />
          }
        />
      )}
      renderItem={(token, onItemChange) => (
        <WithdrawAssetItem
          key={token?.chain_id}
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
