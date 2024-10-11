import { tokenVaultAbi } from '@constants/abi/token-vault'
import type { ContractCallsQuoteRequest } from '@lifi/sdk'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { useEffect, useMemo } from 'react'
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

  const parameters: ContractCallsQuoteRequest | undefined = useMemo(() => {
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

    const depositTxData = encodeFunctionData({
      abi: tokenVaultAbi,
      functionName: 'deposit',
      args: [parseUnits(inputValue, depositAsset.contract_decimals ?? 6), address],
    })

    console.log('🚀 ~ useGetSwapRoute ~ depositTxData:', depositTxData)

    return {
      fromAddress: address,
      fromChain: depositFromNetwork.toString(),
      fromToken: depositAsset.contract_address,
      fromAmount: parseUnits(inputValue, depositAsset.contract_decimals ?? 6).toString(),
      toChain: depositToNetwork.toString(),
      toToken: vaultDepositTokenAddress,
      contractCalls: [
        {
          fromAmount: parseUnits(
            inputValue,
            depositAsset.contract_decimals ?? 6,
          ).toString(),
          fromTokenAddress: vaultDepositTokenAddress,
          toContractAddress: vaultAddress,
          toContractCallData: depositTxData,
          toContractGasLimit: '200000',
        },
      ],
    }
  }, [
    depositAsset?.contract_ticker_symbol,
    depositAsset?.contract_address,
    depositAsset?.contract_decimals,
    vaultAddress,
    address,
    depositFromNetwork,
    depositToNetwork,
    inputValue,
    vaultDepositTokenAddress,
  ])

  const { data, isLoading, error } = useGetQuote(parameters)

  useEffect(() => {
    console.log('🚀 ~ useGetSwapRoute ~ data:', data)
    if (data?.data) {
      return setSwapRoute(data.data)
    }
    setSwapRoute(undefined)
  }, [data, setSwapRoute])

  return {
    route: data?.data?.route,
    isPending: isLoading,
    error,
  }
}
