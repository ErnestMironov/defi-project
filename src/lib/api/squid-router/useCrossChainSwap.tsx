// Import Squid SDK

import type { Squid } from '@0xsquid/sdk'
import { type RouteResponse, SquidRouteType } from '@0xsquid/sdk/dist/types'
import { useEthersSigner } from '@hooks/web3/useEthersSigner'
import type { ethers } from 'ethers'
// Import ethers library
import { useCallback, useState } from 'react'

import useSquidSDK from './useSquidSdk'

// Retrieve environment variables
const integratorId: string = process.env.INTEGRATOR_ID!

// Define chain and token addresses
const fromChainId = '56' // BNB chain ID
const toChainId = '42161' // Arbitrum chain ID

type SwapStatus = 'success' | 'pending' | 'error' | 'waiting-for-swap'

async function waitForSuccessStatus(
  squid: Squid,
  txReceipt: ethers.TransactionReceipt,
  changeStatusFunction: (status: SwapStatus) => void,
  requestId?: string,
) {
  changeStatusFunction('pending')
  const axelarScanLink = `https://axelarscan.io/gmp/${txReceipt.hash}`
  console.log(`Finished! Check Axelarscan for details: ${axelarScanLink}`)

  await new Promise((resolve) => setTimeout(resolve, 5000))

  const getStatusParameters = {
    transactionId: txReceipt.hash,
    requestId,
    integratorId,
    fromChainId,
    toChainId,
  }

  const completedStatuses = new Set([
    'success',
    'partial_success',
    'needs_gas',
    'not_found',
  ])
  const maxRetries = 30
  let retryCount = 0

  const checkStatus = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000))
      const status = await squid.getStatus(getStatusParameters)
      console.log(`Route status: ${status.squidTransactionStatus}`)

      if (
        status &&
        status.squidTransactionStatus &&
        completedStatuses.has(status.squidTransactionStatus)
      ) {
        console.log('Swap transaction executed:', txReceipt.hash)
        changeStatusFunction('success')

        // Delay the reset of the swapStatus
        setTimeout(() => {
          changeStatusFunction('waiting-for-swap')
        }, 5000) // Adjust the delay as needed

        return
      }

      retryCount++
      if (retryCount < maxRetries) {
        await checkStatus()
      } else if (status.squidTransactionStatus === 'ongoing') {
        console.error('Max retries reached. Transaction is still ongoing.')
      } else {
        console.error('Max retries reached. Transaction not found.')
      }
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        (error as any).response &&
        (error as any).response.status === 404
      ) {
        changeStatusFunction('error')
        retryCount++
        if (retryCount < maxRetries) {
          console.log('Transaction not found. Retrying...')
          await checkStatus()
        } else {
          console.error('Max retries reached. Transaction not found.')
        }
      } else {
        throw error
      }
    }
  }

  return checkStatus()
}

export const useCrossChainSwap = ({
  route,
  requestId,
}: {
  route?: RouteResponse['route']
  requestId?: string
}) => {
  const [swapStatus, setSwapStatus] = useState<SwapStatus>('waiting-for-swap')
  console.log('🚀 ~ requestId:', requestId)
  // Main function
  // Initialize Squid SDK
  const { squid, loading } = useSquidSDK()
  const signer = useEthersSigner()

  // Get the swap route using Squid SDK
  const swapTokens = useCallback(async () => {
    console.log('🚀 ~ useCrossChainSwap ~ route', route)
    console.log('🚀 ~ useCrossChainSwap ~ requestId', requestId)
    if (!route) return
    try {
      if (loading || !squid) return

      console.log('swapping started')

      // Execute the swap transaction
      const tx = (await squid.executeRoute({
        signer: signer as unknown as any,
        route,
      })) as unknown as ethers.TransactionResponse
      const txReceipt = await tx.wait()
      console.log('🚀 ~ swapTokens ~ txReceipt:', txReceipt)

      if (
        route?.transactionRequest?.routeType === SquidRouteType.EVM_ONLY &&
        txReceipt?.status === 1
      ) {
        console.log('Swap transaction executed:', txReceipt.hash)
        setSwapStatus('success')

        // Delay the reset of the swapStatus
        setTimeout(() => {
          setSwapStatus('waiting-for-swap')
        }, 5000) // Adjust the delay as needed

        return
      }

      return await waitForSuccessStatus(squid, txReceipt!, setSwapStatus)
    } catch (error) {
      console.error(error)
    }
  }, [route, requestId, loading, squid, signer])

  return { swapTokens, swapStatus }
}
