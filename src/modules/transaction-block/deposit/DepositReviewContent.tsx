import { SupportedChainsByVault, Tokens } from '@api/squid-router/postHook/constants'
import { USDC_TOKENS } from '@api/squid-router/postHook/data/USDC'
import { USDT_TOKENS } from '@api/squid-router/postHook/data/USDT'
import { CHAIN_IDS_BY_NAME } from '@constants/chains'
import { useTokenAsset } from '@hooks/useTokenAsset'
import {
  parseFloatLocale,
  replaceCommasWithDots,
  trimTrailingZeros,
} from '@utils/formatValue'
import { useMemo } from 'react'

import { TokenInfo } from '../components/TokenInfo'
import { useTransactionStore } from '../store/usePendingTransactionsStore'
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
    transactionHash,
    setCurrentModal,
  } = useTxStore()

  const { transactions } = useTransactionStore()

  const chainData = useTokenAsset(asset?.chain_id)
  const inputValue = parseFloatLocale(amount, 8) as string

  const depositFlow = useMemo(() => {
    if (!asset || !chainData) {
      return null
    }

    const assetContractAddress = asset.contract_address?.toLowerCase()

    try {
      if (
        vault === 'USDC' &&
        SupportedChainsByVault[Tokens.USDC].includes(asset.chain_id) &&
        assetContractAddress ===
          USDC_TOKENS.find(
            (token) => token.chainId === asset.chain_id,
          )?.address.toLowerCase()
      ) {
        return <SimpleDeposit allStepsCompleted={allStepsCompleted} />
      }

      if (
        vault === 'USDT' &&
        SupportedChainsByVault[Tokens.USDT].includes(asset.chain_id) &&
        assetContractAddress ===
          USDT_TOKENS.find(
            (token) => token.chainId === asset.chain_id,
          )?.address.toLowerCase()
      ) {
        return <SimpleDeposit allStepsCompleted={allStepsCompleted} />
      }

      if (asset.chain_id === CHAIN_IDS_BY_NAME.Arbitrum) {
        if (asset.native_token) {
          return <NativeOnchainSwap allStepsCompleted={allStepsCompleted} />
        }
        return <OnchainSwap allStepsCompleted={allStepsCompleted} />
      }

      if (asset.native_token) {
        return <NativeCrossChainSwap allStepsCompleted={allStepsCompleted} />
      }

      return <CrossChainSwap allStepsCompleted={allStepsCompleted} />
    } catch {
      return null
    }
  }, [asset, chainData, vault, allStepsCompleted])

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
