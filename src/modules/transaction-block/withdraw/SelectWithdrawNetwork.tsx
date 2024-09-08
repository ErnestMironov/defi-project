import { useGetWithdrawChains } from '@api/maat-finance/useGetWithdrawChains'
import { ChoiceBox } from '@components/box/ChoiceBox'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import type { ChainType } from '@constants/chains'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { useMemo } from 'react'

import { useTxStore } from '../store/useTxStore'
import type { UseGetMTokenInfoReturn } from './hooks/useGetMTokenInfo'
import { useGetMTokenInfo } from './hooks/useGetMTokenInfo'
import { UniversalSelectModal } from './UniversalSelectModal'

const RenderNetworkItem = (
  chain: ChainType,
  onChange: (chain: ChainType) => void,
  token: UseGetMTokenInfoReturn | null,
) => {
  return (
    <button
      type="button"
      onClick={() => onChange(chain)}
      className="flex w-full cursor-pointer items-center gap-4 rounded-xl border border-stroke-100 px-4 py-3 hover:bg-input-default"
    >
      <TokenWithNetwork symbol={token?.stable} network={chain} className="size-8" />
      <div className="flex flex-col items-start text-[1.25rem]/[1.75rem]">
        {token?.stable?.toUpperCase()}
        <span className="text-gray-80">
          {CHAIN_NAMES_BY_ID[chain as keyof typeof CHAIN_NAMES_BY_ID] ?? 'Unknown Chain'}
        </span>
      </div>
    </button>
  )
}

export const SelectWithdrawNetworkModal = () => {
  const { withdrawToNetwork, setWithdrawToNetwork, mtToken, vault } = useTxStore()
  const token = useGetMTokenInfo(mtToken)

  const { data, isLoading } = useGetWithdrawChains()

  console.log('🚀 ~ SelectWithdrawNetworkModal ~ data:', data)

  const chains = useMemo(() => {
    if (!vault || isLoading) return []

    return data?.data[vault]
  }, [data, vault, isLoading])

  return (
    <UniversalSelectModal
      title="Select network"
      selectedItem={withdrawToNetwork}
      items={chains as ChainType[]}
      isLoading={false}
      renderTrigger={() => (
        <ChoiceBox
          value={token?.stable?.toUpperCase() || 'Select network'}
          className="min-w-[10.5rem]"
          icon={
            <TokenWithNetwork
              symbol={token?.symbol}
              network={withdrawToNetwork}
              className="size-[2.14288rem] max-lg:size-[1.125rem]"
            />
          }
        />
      )}
      renderItem={(chain, onItemChange) => RenderNetworkItem(chain, onItemChange, token)}
      onChange={setWithdrawToNetwork}
    />
  )
}
