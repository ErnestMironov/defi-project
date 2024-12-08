import { USDC_TOKENS } from '@constants/usdc'
import { USDT_TOKENS } from '@constants/usdt'
import { SupportedChainsByVault, Tokens } from '@constants/vaults'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { parseFloatLocale } from '@utils/formatValue'
import { useMemo } from 'react'

import { useTxStore } from '../store/useTxStore'
import { CrossChainSwap } from './deposit-wizards/CrossChainSwap'
import { NativeCrossChainSwap } from './deposit-wizards/NativeCrossChainSwap'
import { NativeOnchainSwap } from './deposit-wizards/NativeOnchainSwap'
import { OnchainSwap } from './deposit-wizards/OnchainSwap'
import { SimpleDeposit } from './deposit-wizards/SimpleDeposit'

export const DepositReviewContent = ({
  allStepsCompleted,
}: {
  allStepsCompleted?: boolean
}) => {
  const {
    depositAsset: asset,
    vault,
    inputValue: amount,
    inputValueInUSD,
    depositFromNetwork,
    depositToNetwork,
    depositTotalAmount,
    depositTotalInUSD,
    setCurrentModal,
  } = useTxStore()

  const chainData = useTokenAsset(asset?.chain_id)
  const inputValue = parseFloatLocale(amount, 8) as string

  return useMemo(() => {
    if (!asset || !chainData) {
      return null
    }

    const assetContractAddress = asset.contract_address?.toLowerCase()
    const isNativeToken = asset.is_native
    const isSupportedChain = SupportedChainsByVault[
      Tokens[vault as keyof typeof Tokens] as keyof typeof SupportedChainsByVault
    ]?.includes(asset.chain_id)
    const isCrossChain = depositFromNetwork !== depositToNetwork

    try {
      if (isCrossChain || !isSupportedChain) {
        return isNativeToken ? (
          <NativeCrossChainSwap _allStepsCompleted={allStepsCompleted} />
        ) : (
          <CrossChainSwap _allStepsCompleted={allStepsCompleted} />
        )
      }

      const tokenList = vault === 'USDC' ? USDC_TOKENS : USDT_TOKENS
      const isMatchingToken =
        assetContractAddress ===
        tokenList.find((token) => token.chainId === asset.chain_id)?.address.toLowerCase()

      if (isMatchingToken) {
        return <SimpleDeposit _allStepsCompleted={allStepsCompleted} />
      }

      if (isNativeToken) {
        return <NativeOnchainSwap _allStepsCompleted={allStepsCompleted} />
      }

      return <OnchainSwap _allStepsCompleted={allStepsCompleted} />
    } catch {
      return null
    }
  }, [asset, chainData, vault, allStepsCompleted, depositFromNetwork, depositToNetwork])
}
