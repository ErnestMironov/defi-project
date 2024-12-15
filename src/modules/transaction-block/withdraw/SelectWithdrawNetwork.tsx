import { useGetWithdrawChains } from '@api/maat-finance/useGetWithdrawChains'
import { ChoiceBox } from '@components/box/ChoiceBox'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import type { ChainType } from '@constants/chains'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { cn } from '@utils/cn'
import { useMemo } from 'react'

import { useTxStore } from '../store/useTxStore'
import type { UseGetMTokenInfoReturn } from './hooks/useGetMTokenInfo'
import { UniversalSelectModal } from './UniversalSelectModal'

const RenderNetworkItem = ({
  chain,
  onChange,
  token,
}: {
  chain: ChainType
  onChange: (chain: ChainType) => void
  token: UseGetMTokenInfoReturn | null
}) => {
  console.log('🚀 ~ chain:', chain)
  return (
    <button
      type="button"
      onClick={() => onChange(chain)}
      className="flex w-full cursor-pointer items-center justify-between rounded-xl px-5 py-4 hover:bg-input-active max-lg:items-start"
    >
      <TokenWithNetwork
        symbol={token?.stable}
        network={chain}
        classNames={{ token: 'size-9' }}
      />
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

  const { data, isLoading } = useGetWithdrawChains()

  const chains = useMemo(() => {
    if (!vault || isLoading) return []

    return data?.data[vault]
  }, [data, vault, isLoading])

  return (
    <UniversalSelectModal<ChainType, ChainType | null>
      title="Select network"
      selectedItem={withdrawToNetwork}
      items={chains as ChainType[]}
      isLoading={false}
      renderTrigger={() => (
        <ChoiceBox
          value={mtToken?.stable?.toUpperCase() || 'Select network'}
          className={cn(mtToken?.stable, !mtToken && 'px-3 py-5')}
          icon={
            <TokenWithNetwork
              symbol={mtToken?.symbol}
              network={withdrawToNetwork}
              classNames={{
                token: 'rounded-full overflow-hidden size-9',
              }}
            />
          }
        />
      )}
      renderItem={(chain, onItemChange) => (
        <RenderNetworkItem chain={chain} onChange={onItemChange} token={mtToken} />
      )}
      onChange={setWithdrawToNetwork}
    />
  )
}
