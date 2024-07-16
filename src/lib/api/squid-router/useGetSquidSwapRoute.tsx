import { EIDS_BY_CHAIN_ID } from '@constants/eids'
import { getEthersProvider } from '@hooks/web3/useEthersProvider'
import { useTxStore } from '@modules/transaction-block/store/useDepositStore'
import { useQuery } from '@tanstack/react-query'
import { Token } from '@uniswap/sdk-core'
import axios from 'axios'
import { formatUnits } from 'ethers'
import { useEffect, useMemo } from 'react'
import { useAccount } from 'wagmi'

import {
  getPostHookForCrossChainSwapAndDeposit,
  getPostHookForOneChainSwapAndDeposit,
} from './postHook/postHook'

const integratorId = 'baat-c34ed33a-e43d-4903-8898-a62fcc1113c5'

// Function to get the optimal route for the swap using Squid API
const getRoute = async (_parameters: any, provider: any) => {
  console.log('🚀 ~ getRoute ~ provider:', provider)
  console.log('🚀 ~ getRoute ~ _parameters:', _parameters)

  try {
    const postHook = await (_parameters.fromChain === _parameters.toChain
      ? getPostHookForOneChainSwapAndDeposit(
          new Token(Number(_parameters.toChain), _parameters.toToken, 6),
          _parameters.toAddress,
        )
      : getPostHookForCrossChainSwapAndDeposit(
          new Token(Number(_parameters.toChain), _parameters.toToken, 6),
          _parameters.toAddress,
          EIDS_BY_CHAIN_ID[Number(_parameters.fromChain)] as number, // Fixed line
          provider,
        ))

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

export function useGetSquidSwapRoute(parameters_: {
  fromChain: string
  fromToken: string
  fromAmount: string
  toChain: string
  toToken: string
  enableBoost?: boolean
}) {
  const {
    fromToken,
    toToken,
    fromAmount,
    fromChain,
    toChain,
    enableBoost = true,
  } = parameters_

  const { setDepositAmount } = useTxStore()

  const { address } = useAccount()
  const provider = getEthersProvider({
    chainId: Number(toChain),
  })

  const parameters = useMemo(() => {
    console.log('��� ~ getRouteParameters', provider, fromAmount, fromToken, toToken)
    console.log(
      '🚀 ~ parameters ~ !fromAmount || !fromToken || !toToken:',
      !fromAmount || !fromToken || !toToken,
    )
    console.log('🚀 ~ parameters ~ toToken:', toToken)
    console.log('🚀 ~ parameters ~ fromToken:', fromToken)
    console.log('🚀 ~ parameters ~ fromAmount:', fromAmount)
    console.log('🚀 ~ parameters ~ address:', address)

    if (!provider) return
    if (!fromAmount || !fromToken || !toToken) return
    if (fromToken.toLowerCase() === toToken.toLowerCase()) return
    if (!address) return

    return {
      fromAddress: address,
      fromChain,
      fromToken,
      fromAmount,
      toChain,
      toToken,
      toAddress: address,
      enableBoost,
      enableExpress: true,
    }
  }, [provider, fromAmount, fromToken, toToken, address, fromChain, toChain, enableBoost])

  console.log('🚀 ~ parameters:', parameters)

  const { data, isLoading, error } = useQuery({
    queryKey: ['squidSwapRoute', parameters],
    queryFn: async () => getRoute(parameters, provider),
    enabled:
      !!parameters && !!provider && fromToken.toLowerCase() !== toToken.toLowerCase(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    refetchIntervalInBackground: true,
    retry: false,
  })

  useEffect(() => {
    if (data?.data?.route?.estimate?.toAmountMin) {
      const depositAmount = data?.data?.route?.estimate?.toAmountMin
      console.log('🚀 ~ useEffect ~ depositAmount:', depositAmount)
      setDepositAmount(formatUnits(depositAmount, 6).toString())
    }
  }, [data, setDepositAmount])

  return {
    route: data?.data?.route,
    requestId: data?.requestId,
    isPending: isLoading,
    error,
  }
}
