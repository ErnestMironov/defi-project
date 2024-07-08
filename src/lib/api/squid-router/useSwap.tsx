import type { Squid } from '@0xsquid/sdk'
import { type RouteResponse, SquidRouteType } from '@0xsquid/sdk/dist/types'
import { useEthersSigner } from '@hooks/web3/useEthersSigner'
import type {
  IDepositWizardHook,
  STEP_STATUS,
} from '@modules/transaction-block/deposit/interfaces'
import type { ethers } from 'ethers'
// Import ethers library
import { useCallback, useState } from 'react'

import useSquidSDK from './useSquidSdk'

// Retrieve environment variables
const integratorId: string = process.env.INTEGRATOR_ID!

// Define chain and token addresses
const fromChainId = '56' // BNB chain ID
const toChainId = '42161' // Arbitrum chain ID

/**
 * Waits for the transaction to reach a success status.
 *
 * @param {Squid} squid - The Squid SDK instance.
 * @param {ethers.TransactionReceipt} txReceipt - The transaction receipt.
 * @param {(status: STEP_STATUS) => void} changeStatusFunction - Function to change the status of the step.
 * @param {string} [requestId] - Optional request ID.
 * @returns {Promise<void>} - A promise that resolves when the transaction reaches a success status.
 */
async function waitForSuccessStatus(
  squid: Squid,
  txReceipt: ethers.TransactionReceipt,
  changeStatusFunction: (status: STEP_STATUS) => void,
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

        // Delay the reset of the status
        setTimeout(() => {
          changeStatusFunction('idle')
        }, 5000)

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

interface IProperties extends IDepositWizardHook {
  route?: RouteResponse['route']
  requestId?: string
}

/**
 * Custom hook to handle token swapping using Squid SDK.
 *
 * @param {IProperties} props - The properties for the hook.
 * @returns {{ swapTokens: () => Promise<void>, status: STEP_STATUS, error: string }} - The swap function, status, and error state.
 */
export const useSwap = ({ route, requestId, onSuccessHandler }: IProperties) => {
  const [status, setStatus] = useState<STEP_STATUS>('idle')
  const [error, setError] = useState('')

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

      setStatus('pending')

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
        setStatus('success')
        onSuccessHandler?.()

        // Delay the reset of the status

        return
      }

      return await waitForSuccessStatus(squid, txReceipt!, setStatus)
    } catch (error_: unknown) {
      console.error(error_)
      if (error_ instanceof Error) {
        setError(error_.message)
      } else {
        setError('An unknown error occurred')
      }
      setStatus('error')
    }
  }, [route, requestId, loading, squid, signer, onSuccessHandler])

  return { swapTokens, status, error }
}
