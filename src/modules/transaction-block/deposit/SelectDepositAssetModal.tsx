/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-shadow */

import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import { useTokensBalance } from '@api/tokens-balance/use-tokens-balance'
import { ChoiceBox } from '@components/box/ChoiceBox'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import type { ChainType } from '@constants/chains'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { useTokensList } from '@hooks/tokens/useTokensList'
import { cn } from '@utils/cn'
import { useAccount } from 'wagmi'

import { UniversalSelectModal } from '../withdraw/UniversalSelectModal'
import { TokensListItem } from './components/TokensListItem'
import { useAssetSelection } from './hooks/useAssetSelection'

export const SelectDepositAsset = () => {
  const { isBelowDesktop } = useDeviceWidth()
  const { address } = useAccount()
  const { data: userTokens, isLoading } = useTokensBalance({ address })
  const { asset, handleAssetChange } = useAssetSelection()
  const tokensList = useTokensList<ITokenData>

  const filterTokens = (
    items: Record<string, ITokenData[]>,
    searchValue: string,
    network: ChainType,
  ) => tokensList(items, network, searchValue)

  const choiceBoxValue = asset?.contract_ticker_symbol
    ? isBelowDesktop
      ? ''
      : asset?.contract_ticker_symbol
    : 'Select asset'

  return (
    <UniversalSelectModal<ITokenData>
      selectedItem={asset as ITokenData | undefined}
      items={(userTokens as any) || {}}
      isLoading={isLoading}
      filterByNetwork
      filterBySearch
      filterItems={filterTokens as any}
      renderTrigger={(selectedItem) => (
        <ChoiceBox
          value={choiceBoxValue}
          className={cn(
            !selectedItem && 'px-4 py-5 max-lg:py-[1rem] max-lg:px-[1.25rem]',
            ' hover:bg-[#8585A914]',
          )}
          icon={
            selectedItem?.contract_ticker_symbol && (
              <TokenWithNetwork
                symbol={selectedItem.contract_ticker_symbol}
                network={selectedItem.chain_id}
                tokenLogoFallback={selectedItem.logo_url}
                position="bottom-right"
                classNames={{
                  token: 'rounded-full overflow-hidden size-[2.25rem] max-lg:size-[2rem]',
                }}
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
