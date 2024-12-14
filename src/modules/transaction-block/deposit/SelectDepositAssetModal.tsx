/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-shadow */

import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import { useTokensBalance } from '@api/tokens-balance/use-tokens-balance'
import { ChoiceBox } from '@components/box/ChoiceBox'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import type { ChainType } from '@lifi/sdk'
import { cn } from '@utils/cn'
import { useAccount } from 'wagmi'

import { UniversalSelectModal } from '../withdraw/UniversalSelectModal'
import { TokensListItem } from './components/TokensListItem'
import { useAssetSelection } from './hooks/useAssetSelection'
import { useTokensList } from './hooks/useTokensList'

export const SelectDepositAsset = () => {
  const { isBelowDesktop } = useDeviceWidth()
  const { address } = useAccount()
  const { data: userTokens, isLoading } = useTokensBalance({ address })
  const { asset, handleAssetChange } = useAssetSelection()
  const tokensList = useTokensList

  console.log('Raw userTokens:', userTokens)

  const filterTokens = (
    items: Record<string, ITokenData[]>,
    searchValue: string,
    network: ChainType | null,
  ) => tokensList(items, network, searchValue)

  return (
    <UniversalSelectModal
      selectedItem={asset}
      items={userTokens || {}}
      isLoading={isLoading}
      filterByNetwork
      filterBySearch
      filterItems={filterTokens}
      renderTrigger={(selectedItem) => (
        <ChoiceBox
          value={selectedItem?.contract_ticker_symbol || 'Select asset'}
          className={cn(
            selectedItem?.contract_ticker_symbol,
            !selectedItem && 'px-3 py-5',
          )}
          icon={
            selectedItem?.contract_ticker_symbol && (
              <TokenWithNetwork
                symbol={selectedItem.contract_ticker_symbol}
                network={selectedItem.chain_id}
                tokenLogoFallback={selectedItem.logo_url}
                position="bottom-right"
                classNames={{
                  token: 'rounded-full overflow-hidden',
                }}
                width={isBelowDesktop ? '1.25rem' : '2.14288rem'}
              />
            )
          }
        />
      )}
      renderItem={(token, onItemChange) => (
        <TokensListItem
          key={`${token?.contract_address}-${token?.chain_id}`}
          onChange={onItemChange}
          token={token}
          selected={
            `${asset?.contract_address}-${asset?.chain_id}` ===
            `${token.contract_address}-${token.chain_id}`
          }
        />
      )}
      onChange={handleAssetChange}
    />
  )
}
