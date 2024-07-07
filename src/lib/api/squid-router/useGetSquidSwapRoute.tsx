import type { RouteResponse } from '@0xsquid/sdk/dist/types'
import { debounce } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
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

  const parameters = useMemo(
    () => ({
      fromAddress: address,
      fromChain,
      fromToken,
      fromAmount,
      toChain,
      toToken,
      toAddress: address,
      enableBoost,
    }),
    [address, fromChain, fromToken, fromAmount, toChain, toToken, enableBoost],
  )

  const debouncedGetSwapRoute = useMemo(
    () =>
      debounce(async (parameters__: typeof parameters) => {
        console.log('🚀 ~ getSwapRoute ~ !!params.fromAmount:', !!parameters__.fromAmount)
        const hasEmptyParameters = Object.values(parameters__).every(
          (value) => value === '' || value === undefined,
        )
        if (
          loading ||
          !squid ||
          Number(parameters__.fromAmount) === 0 ||
          hasEmptyParameters
        )
          return

        setIsPending(true)
        console.log('🚀 ~ getSwapRoute ~ call squid.getRoute:')
        const { route: _route, requestId: _requestId } =
          await squid.getRoute(parameters__)
        console.log('🚀 ~ getSwapRoute ~ _requestId:', _requestId)
        setRoute(_route)
        setRequestId(_requestId)

        setIsPending(false)
      }, 300),
    [loading, squid],
  )

  useEffect(() => {
    if (
      !fromAmount ||
      !fromToken ||
      !toToken ||
      parameters?.fromToken.toLowerCase() === parameters?.toToken.toLowerCase()
    )
      return

    console.log('🚀 ~ useEffect ~ parameters:', parameters)

    debouncedGetSwapRoute(parameters)
  }, [parameters, loading, squid, fromAmount, fromToken, toToken, debouncedGetSwapRoute])

  return { route, requestId, isPending }
}
