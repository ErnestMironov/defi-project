import { tokenVaultAbi } from '@constants/abi/token-vault'
import { useDebounce } from '@hooks/useDebounce'
import type { ContractCallsQuoteRequest } from '@lifi/sdk'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { encodeFunctionData, parseUnits } from 'viem'
import { useAccount } from 'wagmi'

import { useGetQuote } from '../endpoints/get-quote'

export function useGetSwapRoute() {
  const {
    inputValue,
    depositAsset,
    depositToNetwork,
    depositFromNetwork,
    vaultAddress,
    vaultDepositTokenAddress,
    setSwapRoute,
  } = useTxStore()

  const { address } = useAccount()
  const [estimatedTokens, setEstimatedTokens] = useState<bigint>()
  const [isFirstRequestPending, setIsFirstRequestPending] = useState(false)
  const [debouncedInputValue, setDebouncedInputValue] = useState(inputValue)

  const debouncedSetInputValue = useDebounce((value: string) => {
    setDebouncedInputValue(value)
  }, 500)

  useEffect(() => {
    debouncedSetInputValue(inputValue)
  }, [inputValue, debouncedSetInputValue])

  // First request parameters
  const firstParameters: ContractCallsQuoteRequest | undefined = useMemo(() => {
    if (
      depositAsset?.contract_ticker_symbol.toLowerCase() === vaultAddress?.toLowerCase()
    )
      return undefined

    if (
      !address ||
      !depositFromNetwork ||
      !depositToNetwork ||
      !depositAsset?.contract_address ||
      !vaultAddress ||
      !vaultDepositTokenAddress
    )
      return undefined

    if (!depositAsset.contract_decimals) {
      console.warn(`Missing decimals for token ${depositAsset.contract_address}`)
      return undefined
    }

    return {
      fromAddress: address,
      fromChain: depositFromNetwork.toString(),
      fromToken: depositAsset.contract_address,
      fromAmount: parseUnits(
        debouncedInputValue,
        depositAsset.contract_decimals,
      ).toString(),
      toChain: depositToNetwork.toString(),
      toToken: vaultDepositTokenAddress,
      contractCalls: [],
    }
  }, [
    depositAsset?.contract_ticker_symbol,
    depositAsset?.contract_address,
    depositAsset?.contract_decimals,
    vaultAddress,
    address,
    depositFromNetwork,
    depositToNetwork,
    debouncedInputValue,
    vaultDepositTokenAddress,
  ])

  const { data: firstData, isLoading: isFirstLoading } = useGetQuote(firstParameters)

  useEffect(() => {
    setIsFirstRequestPending(true)
    setEstimatedTokens(undefined)
  }, [firstParameters])

  useEffect(() => {
    if (firstData?.data?.estimate?.toAmount) {
      setEstimatedTokens(BigInt(firstData.data.estimate.toAmount))
      setIsFirstRequestPending(false)
      // Log the results of the first request
      console.log('First request results:', {
        fromAmount: firstData.data.estimate.fromAmount,
        toAmount: firstData.data.estimate.toAmount,
        estimatedGasCosts: firstData.data.estimate?.gasCosts,
      })
    }
  }, [firstData])

  const executeSecondRequest = useCallback(() => {
    if (
      firstParameters &&
      estimatedTokens &&
      !isFirstRequestPending &&
      vaultDepositTokenAddress &&
      vaultAddress &&
      depositAsset?.contract_decimals
    ) {
      // Calculate both 0.1% and 10 cents safety margins
      const percentMargin = (estimatedTokens * BigInt(1)) / BigInt(1000) // 0.1%
      const tenCents = BigInt(10) ** BigInt(depositAsset.contract_decimals) / BigInt(10) // 0.1 token

      // Use the smaller value
      const safetyMargin = percentMargin < tenCents ? percentMargin : tenCents

      const adjustedTokens = estimatedTokens - safetyMargin

      const depositTxData = encodeFunctionData({
        abi: tokenVaultAbi,
        functionName: 'deposit',
        args: [adjustedTokens, address],
      })

      const secondParameters: ContractCallsQuoteRequest = {
        ...firstParameters,
        contractCalls: [
          {
            fromAmount: adjustedTokens.toString(),
            fromTokenAddress: vaultDepositTokenAddress,
            toContractAddress: vaultAddress,
            toContractCallData: depositTxData,
            toContractGasLimit: '200000',
          },
        ],
      }

      return secondParameters
    }
    return undefined
  }, [
    estimatedTokens,
    isFirstRequestPending,
    firstParameters,
    address,
    vaultDepositTokenAddress,
    vaultAddress,
    depositAsset?.contract_decimals,
  ])

  const {
    data: secondData,
    isLoading: isSecondLoading,
    error,
  } = useGetQuote(executeSecondRequest())

  useEffect(() => {
    if (secondData?.data) {
      setSwapRoute(secondData.data)
      // Log the results of the second (main) request
      console.log('Second (main) request results:', {
        fromAmount: secondData.data.estimate.fromAmount,
        toAmount: secondData.data.estimate.toAmount,
        estimatedGasCosts: secondData.data.estimate?.gasCosts,
        steps: secondData.data.includedSteps,
      })
    } else {
      setSwapRoute(undefined)
    }
  }, [secondData, setSwapRoute])

  return {
    route: secondData?.data,
    isPending: isFirstLoading || isSecondLoading || isFirstRequestPending,
    error,
  }
}
