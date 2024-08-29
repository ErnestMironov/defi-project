import type { RouteResponse } from '@0xsquid/squid-types'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { useQuery } from '@tanstack/react-query'
import { Token } from '@uniswap/sdk-core'
import axios from 'axios'
import { useEffect, useMemo } from 'react'
import { parseUnits } from 'viem'
import { useAccount } from 'wagmi'

import { getDepositPostHook } from './postHook/postHook'

const integratorId = 'baat-c34ed33a-e43d-4903-8898-a62fcc1113c5'

// Function to get the optimal route for the swap using Squid API
const getRoute = async (_parameters: any): Promise<{ data: RouteResponse }> => {
  try {
    const postHook = await getDepositPostHook(
      new Token(Number(_parameters.toChain), _parameters.toToken, 6),
      _parameters.toAddress,
    )

    console.log('��� ~ postHook:', postHook)

    const parameters = {
      ..._parameters,
      postHook,
    }

    const result = await axios.post(
      'https://apiplus.squidrouter.com/v2/route',
      parameters,
      {
        headers: {
          'x-integrator-id': integratorId,
          'Content-Type': 'application/json',
        },
      },
    )
    const requestId = result.headers['x-request-id'] // Retrieve request ID from response headers
    return { data: result.data, requestId }
  } catch (error: any) {
    if (error.response) {
      console.error('API error:', error.response.data)
    }
    console.error('Error with parameters:', _parameters)
    console.error(error.message)
    throw error
  }
}

export function useGetSquidSwapRoute() {
  const {
    inputValue,
    depositAsset,
    depositToNetwork,
    depositFromNetwork,
    vaultAddress,
    setSquidRoute,
  } = useTxStore()

  const { boostMode } = useTxStore()

  const { address } = useAccount()

  const parameters = useMemo(() => {
    console.log('Проверка inputValue:', !inputValue)
    console.log('Проверка depositAsset:', !depositAsset)
    console.log('Проверка vaultAddress:', !vaultAddress)
    if (!inputValue || !depositAsset || !vaultAddress) return

    console.log(
      'Проверка равенства символов:',
      depositAsset?.contract_ticker_symbol.toLowerCase() === vaultAddress?.toLowerCase(),
    )
    if (
      depositAsset?.contract_ticker_symbol.toLowerCase() === vaultAddress?.toLowerCase()
    )
      return

    console.log('Проверка address:', !address)
    if (!address) return

    console.log('Проверка depositFromNetwork:', !depositFromNetwork)
    if (!depositFromNetwork) return

    console.log('Проверка depositToNetwork:', !depositToNetwork)
    if (!depositToNetwork) return

    return {
      fromAddress: address,
      fromChain: depositFromNetwork.toString(),
      fromToken: depositAsset?.contract_address,
      fromAmount: parseUnits(inputValue, depositAsset?.contract_decimals ?? 6).toString(),
      toChain: depositToNetwork.toString(),
      toToken: vaultAddress,
      toAddress: address,
      enableBoost: boostMode,
      enableExpress: true,
    }
  }, [
    inputValue,
    depositAsset,
    vaultAddress,
    address,
    depositFromNetwork,
    depositToNetwork,
    boostMode,
  ])

  const { data, isLoading, error } = useQuery({
    queryKey: ['squidSwapRoute', parameters],
    queryFn: async () => getRoute(parameters),
    enabled:
      !!parameters &&
      depositAsset?.contract_ticker_symbol.toLowerCase() !== vaultAddress?.toLowerCase(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    refetchIntervalInBackground: true,
    retry: false,
  })

  useEffect(() => {
    if (data) {
      setSquidRoute(data.data.route)
    }
  }, [data, setSquidRoute])

  return {
    route: data?.data?.route,
    requestId: data?.requestId,
    isPending: isLoading,
    error,
  }
}
