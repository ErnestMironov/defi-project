import type { RouteResponse } from '@0xsquid/sdk/dist/types'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import useSquidSDK from './useSquidSdk'

export function useGetSquidSwapRoute(parameters_: {
  fromChain: string
  fromToken: string
  fromAmount: string
  toChain: string
  toToken: string
  enableBoost?: boolean
}) {
  const { fromToken, toToken, fromAmount, fromChain, toChain, enableBoost } = parameters_
  console.log('🚀 ~ parameters_:', parameters_)

  const [route, setRoute] = useState<RouteResponse['route']>()
  const [requestId, setRequestId] = useState<string>()
  const { address } = useAccount()
  const { squid, loading } = useSquidSDK()

  useEffect(() => {
    if (!fromAmount) return
    if (!fromToken || !toToken) return

    const parameters = {
      fromAddress: address,
      fromChain,
      fromToken,
      fromAmount,
      toChain,
      toToken,
      toAddress: address,
      enableBoost: enableBoost ?? true,
    }

    async function getSwapRoute() {
      if (loading || !squid) return

      const { route: _route, requestId: _requestId } = await squid.getRoute(parameters)
      console.log('🚀 ~ getSwapRoute ~ requestId:', _requestId)
      console.log('Calculated route:', _route.estimate.toAmount)

      setRoute(_route)
      setRequestId(_requestId)
    }

    getSwapRoute()
  }, [
    address,
    enableBoost,
    fromAmount,
    fromChain,
    fromToken,
    loading,
    squid,
    toChain,
    toToken,
  ])

  return { route, requestId }
}
