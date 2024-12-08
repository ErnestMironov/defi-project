import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import { CHAIN_IDS_BY_NAME, type ChainType } from '@constants/chains'
import { SupportedChainIds } from '@constants/vaults'

import { useTxStore } from '../../store/useTxStore'

export const useAssetSelection = () => {
  const {
    depositAsset: asset,
    setDepositAsset: setAsset,
    setDepositToNetwork,
    setDepositFromNetwork,
    resetStore,
  } = useTxStore()

  const handleAssetChange = (selectedAsset: ITokenData) => {
    resetStore()
    setAsset(selectedAsset)
    setDepositFromNetwork(selectedAsset.chain_id as ChainType)

    if (SupportedChainIds.includes(selectedAsset.chain_id)) {
      setDepositToNetwork(selectedAsset.chain_id as ChainType)
    } else {
      setDepositToNetwork(CHAIN_IDS_BY_NAME.Arbitrum)
    }

    return selectedAsset
  }

  return {
    asset,
    handleAssetChange,
  }
}
