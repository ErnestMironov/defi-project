import { SupportedChainsByVault, Tokens } from '@api/squid-router/postHook/constants'
import { USDC_TOKENS } from '@api/squid-router/postHook/data/USDC'
import { USDT_TOKENS } from '@api/squid-router/postHook/data/USDT'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import {
  parseFloatLocale,
  replaceCommasWithDots,
  trimTrailingZeros,
} from '@utils/formatValue'
import { useEffect, useMemo } from 'react'

import { TxReviewInfo } from '../components/TxReviewInfo'
import { useTransactionStatus } from '../hooks/useTransactionStatus'
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

  const depositFlow = useMemo(() => {
    if (!asset || !chainData) {
      return null
    }

    const assetContractAddress = asset.contract_address?.toLowerCase()
    const isNativeToken = asset.native_token
    const isSupportedChain = SupportedChainsByVault[
      Tokens[vault as keyof typeof Tokens] as keyof typeof SupportedChainsByVault
    ]?.includes(asset.chain_id)
    const isCrossChain = depositFromNetwork !== depositToNetwork

    try {
      if (isCrossChain || !isSupportedChain) {
        return isNativeToken ? (
          <NativeCrossChainSwap allStepsCompleted={allStepsCompleted} />
        ) : (
          <CrossChainSwap allStepsCompleted={allStepsCompleted} />
        )
      }

      const tokenList = vault === 'USDC' ? USDC_TOKENS : USDT_TOKENS
      const isMatchingToken =
        assetContractAddress ===
        tokenList.find((token) => token.chainId === asset.chain_id)?.address.toLowerCase()

      if (isMatchingToken) {
        return <SimpleDeposit allStepsCompleted={allStepsCompleted} />
      }

      if (isNativeToken) {
        return <NativeOnchainSwap allStepsCompleted={allStepsCompleted} />
      }

      return <OnchainSwap allStepsCompleted={allStepsCompleted} />
    } catch {
      return null
    }
  }, [asset, chainData, vault, allStepsCompleted, depositFromNetwork, depositToNetwork])

  const depositStatus = useTransactionStatus('idle')

  useEffect(() => {
    if (depositStatus === 'success') {
      setCurrentModal('done')
    }

    if (depositStatus === 'error') {
      setCurrentModal('error')
    }
  }, [setCurrentModal, depositStatus])

  return (
    <>
      <TxReviewInfo
        playAnimation={false}
        items={[
          {
            label: 'You input',
            value: replaceCommasWithDots(trimTrailingZeros(inputValue)),
            usdValue: inputValueInUSD,
            tokenData: {
              symbol: asset?.contract_ticker_symbol ?? '',
              network: depositFromNetwork ?? 1,
              maxDigits: asset?.contract_decimals && asset?.contract_decimals > 6 ? 4 : 2,
            },
          },
          {
            label: 'You will deposit ',
            value: depositTotalAmount,
            usdValue: depositTotalInUSD,
            tokenData: {
              symbol: vault ?? '',
              network: depositToNetwork ?? 1,
            },
          },
        ]}
      />
      {depositFlow}
    </>
  )
}
