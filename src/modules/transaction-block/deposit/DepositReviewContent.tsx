import useSquidSDK from '@api/squid-router/useSquidSdk'
import { useTokenAsset } from '@hooks/useTokenAsset'
import {
  parseFloatLocale,
  replaceCommasWithDots,
  trimTrailingZeros,
} from '@utils/formatValue'
import { useMemo } from 'react'

import { TokenInfo } from '../components/TokenInfo'
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
  const { depositAsset: asset, vault, inputValue: amount, inputValueInUSD } = useTxStore()

  const chainData = useTokenAsset(asset?.chain_id)
  const inputValue = parseFloatLocale(amount, 8) as string

  const { squid } = useSquidSDK()

  const tokenAddrForVault = useMemo(() => {
    const depositTokenAsset = squid?.tokens.find(
      (token) => token.symbol?.toLowerCase() === vault?.toLowerCase(),
    )
    return depositTokenAsset?.address!
  }, [squid?.tokens, vault])

  const depositFlow = useMemo(() => {
    console.log(
      '🚀 ~ depositFlow ~ !asset || !chainData || !tokenAddrForVault:',
      !asset || !chainData || !tokenAddrForVault,
    )
    if (!asset || !chainData || !tokenAddrForVault) {
      return null
    }

    const assetContractAddress = asset.contract_address?.toLowerCase()
    console.log('🚀 ~ depositFlow ~ assetContractAddress:', assetContractAddress)
    const vaultAddress = tokenAddrForVault.toLowerCase()
    console.log('🚀 ~ depositFlow ~ vaultAddress:', vaultAddress)

    if (vaultAddress === assetContractAddress) {
      return <SimpleDeposit allStepsCompleted={allStepsCompleted} />
    }

    if (chainData.chainId === 42_161) {
      if (asset.native_token) {
        return <NativeOnchainSwap allStepsCompleted={allStepsCompleted} />
      }
      return <OnchainSwap allStepsCompleted={allStepsCompleted} />
    }

    if (asset.native_token) {
      return <NativeCrossChainSwap allStepsCompleted={allStepsCompleted} />
    }

    return <CrossChainSwap allStepsCompleted={allStepsCompleted} />
  }, [asset, chainData, tokenAddrForVault, allStepsCompleted])
  console.log('🚀 ~ depositFlow ~ depositFlow:', depositFlow)

  return (
    <>
      <div className="flex flex-col items-start gap-4 self-stretch rounded-2xl border border-stroke-100 p-6">
        <TokenInfo
          type="input"
          amount={replaceCommasWithDots(trimTrailingZeros(inputValue))}
          tokenInfo={{
            symbol: asset?.contract_ticker_symbol,
            chain_id: asset?.chain_id,
          }}
          usdAmount={inputValueInUSD}
        />
        <div className="h-px w-full bg-stroke-100" />
        <TokenInfo
          type="deposit"
          amount={inputValueInUSD}
          tokenInfo={{
            symbol: vault,
            chain_id: asset?.chain_id,
          }}
          usdAmount={inputValueInUSD}
        />
      </div>
      {depositFlow}
    </>
  )
}
