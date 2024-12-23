import { useGetWithdrawChains } from '@api/maat-finance/useGetWithdrawChains'
import CheckedIcon from '@assets/icons/check.svg'
import { ChoiceBox } from '@components/box/ChoiceBox'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import type { ChainType } from '@constants/chains'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { useChainsList } from '@hooks/chains/useChainsList'
import { cn } from '@utils/cn'
import { useCallback, useMemo } from 'react'

import { useTxStore } from '../store/useTxStore'
import type { UseGetMTokenInfoReturn } from './hooks/useGetMTokenInfo'
import { UniversalSelectModal } from './UniversalSelectModal'

const RenderNetworkItem = ({
  chain,
  onChange,
  token,
  isSelected,
}: {
  chain: ChainType
  onChange: (chain: ChainType) => void
  token: UseGetMTokenInfoReturn | null
  isSelected: boolean
}) => {
  return (
    <button
      type="button"
      onClick={() => onChange(chain)}
      className="flex w-full cursor-pointer items-center justify-between rounded-xl px-5 py-4 hover:bg-input-active max-lg:items-start"
    >
      <div className="flex items-center gap-2">
        <TokenWithNetwork
          symbol={token?.stable}
          network={chain}
          classNames={{ token: 'size-9' }}
        />
        <div className="flex flex-col items-start">
          {token?.stable?.toUpperCase()}
          <span className="text-[0.875rem] font-medium text-text-60">
            {token?.stable?.toUpperCase()}
          </span>
        </div>
      </div>
      <span className="flex items-center gap-2 leading-6">
        {CHAIN_NAMES_BY_ID[chain as keyof typeof CHAIN_NAMES_BY_ID] ?? 'Unknown Chain'}
        {isSelected && <CheckedIcon />}
      </span>
    </button>
  )
}

export const SelectWithdrawNetworkModal = () => {
  const { withdrawToNetwork, setWithdrawToNetwork, mtToken, vault } = useTxStore()
  const { data, isLoading } = useGetWithdrawChains()
  const chainsList = useChainsList()

  const chains = useMemo(() => {
    if (!vault || isLoading) return []
    return data?.data[vault]
  }, [data, vault, isLoading])

  const filterItems = useCallback(
    (items: ChainType[] | Record<string, ChainType[]>, searchValue: string) => {
      if (!Array.isArray(items)) return []
      return chainsList(items, searchValue)
    },
    [chainsList],
  )

  return (
    <UniversalSelectModal<ChainType>
      title="Select network"
      selectedItem={withdrawToNetwork ?? undefined}
      items={chains as ChainType[]}
      filterItems={filterItems}
      filterBySearch
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
        <RenderNetworkItem
          key={chain}
          chain={chain}
          onChange={onItemChange}
          token={mtToken}
          isSelected={withdrawToNetwork === chain}
        />
      )}
      onChange={setWithdrawToNetwork}
    />
  )
}
