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
  const {
    fromToken,
    toToken,
    fromAmount,
    fromChain,
    toChain,
    enableBoost = true,
  } = parameters_

  const [route, setRoute] = useState<RouteResponse['route']>()
  const [requestId, setRequestId] = useState<string>()
  const { address } = useAccount()
  const { squid, loading } = useSquidSDK()

  const [isPending, setIsPending] = useState(false)

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
      enableBoost,
    }
    console.log('🚀 ~ useEffect ~ parameters:', parameters)

    async function getSwapRoute() {
      if (loading || !squid) return

      setIsPending(true)
      const { route: _route, requestId: _requestId } = await squid.getRoute(parameters)
      console.log('🚀 ~ getSwapRoute ~ _requestId:', _requestId)
      setRoute(_route)
      setRequestId(_requestId)

      setIsPending(false)
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

  return { route, requestId, isPending }
}
