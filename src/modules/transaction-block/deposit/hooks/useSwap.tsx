import { ESTIMATED_TIME_OF_CONFIRMATION } from '@constants/chains'
import { AXELAR_SCAN_URL } from '@constants/index'
import type { STEP_STATUS } from '@modules/transaction-block/deposit/interfaces'
import { useTransactionStore } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { MOCK_LATENCY_MS, USE_MOCKS } from '@configs/mocks'
import { convertBigIntToString } from '@utils/formatValue'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { useSendTransaction } from 'wagmi'

import { transformTxRequestToSendTxParameters } from '../utils/transformTxRequestToSendTxParams'

// ---------------------------------------
// ------------ Constants ----------------
// ---------------------------------------

const INTEGRATOR_ID = 'baat-c34ed33a-e43d-4903-8898-a62fcc1113c5'
const SQUID_API_URL = 'https://apiplus.squidrouter.com/v2/status'
const MAX_RETRIES = 30
const RETRY_DELAY = 5000

const completedStatuses = new Set([
  'success',
  'partial_success',
  'needs_gas',
  'not_found',
])

// ---------------------------------------
// ------------ Helper Functions ----------
// ---------------------------------------

/**
 * Fetches the status of a transaction from the Squid API
 * @param parameters - The parameters for the API request
 * @returns The status data from the API
 */
const getStatus = async (parameters: any) => {
  try {
    const result = await axios.get(SQUID_API_URL, {
      params: {
        transactionId: parameters.transactionId,
        requestId: parameters.requestId,
        fromChainId: parameters.fromChainId,
        toChainId: parameters.toChainId,
      },
      headers: {
        'x-integrator-id': INTEGRATOR_ID,
      },
    })
    console.log('🚀 ~ getStatus ~ result:', result)
    return result.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('API error:', error.response.data)
    }
    console.error('Error with parameters:', parameters)
    throw error
  }
}

/**
 * Handles the status of a transaction and updates accordingly
 * @param status - The status object from the API
 * @param txHash - The transaction hash
 * @param changeStatusFunction - Function to update the status
 * @param successHandler - Function to call on success
 * @param failHandler - Function to call on failure
 * @returns A boolean indicating if the status is final
 */
const handleStatus = (
  status: any,
  txHash: string,
  changeStatusFunction: (status: STEP_STATUS) => void,
  successHandler?: () => void,
  failHandler?: () => void,
) => {
  if (
    !status?.squidTransactionStatus ||
    !completedStatuses.has(status.squidTransactionStatus)
  ) {
    return false
  }

  if (status.squidTransactionStatus === 'success') {
    console.log('Swap transaction executed:', txHash)
    changeStatusFunction('success')
    successHandler?.()
    return true
  }

  if (status.squidTransactionStatus === 'partial_success') {
    console.log('Swap transaction executed:', txHash)
    changeStatusFunction('error')
    failHandler?.()
    return true
  }

  return false
}

/**
 * Handles errors during status checking
 * @param error - The error object
 * @param retryCount - The current retry count
 * @param changeStatusFunction - Function to update the status
 * @param checkStatus - Function to retry status check
 */
const handleError = async (
  error: unknown,
  retryCount: number,
  changeStatusFunction: (status: STEP_STATUS) => void,
  checkStatus: () => Promise<void>,
) => {
  if (axios.isAxiosError(error) && error.response?.status === 404) {
    retryCount++
    if (retryCount < MAX_RETRIES) {
      console.log('Transaction not found. Retrying...')
      await checkStatus()
    } else {
      console.error('Max retries reached. Transaction not found.')
    }
  } else {
    changeStatusFunction('error')
    throw error
  }
}

// ---------------------------------------
// ------------ Status checker ------------
// ---------------------------------------

/**
 * Waits for a successful status of a transaction
 * @param txHash - The transaction hash
 * @param fromChainId - The source chain ID
 * @param toChainId - The destination chain ID
 * @param changeStatusFunction - Function to update the status
 * @param successHandler - Function to call on success
 * @param failHandler - Function to call on failure
 * @param requestId - Optional request ID
 */
export const waitForSuccessStatus = async (
  txHash: string,
  fromChainId: string,
  toChainId: string,
  changeStatusFunction: (status: STEP_STATUS) => void,
  successHandler?: () => void,
  failHandler?: () => void,
  requestId?: string,
) => {
  if (!txHash) {
    throw new Error('Transaction hash is required')
  }

  console.log(`Finished! Check Axelarscan for details: ${AXELAR_SCAN_URL}${txHash}`)

  await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))

  const getStatusParameters = {
    transactionId: txHash,
    requestId,
    integratorId: INTEGRATOR_ID,
    fromChainId,
    toChainId,
  }

  let retryCount = 0

  const checkStatus = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
      const status = await getStatus(getStatusParameters)
      console.log(`Route status: ${status.squidTransactionStatus}`)

      if (handleStatus(status, txHash, changeStatusFunction, successHandler, failHandler))
        return

      retryCount++
      if (retryCount < MAX_RETRIES) {
        await checkStatus()
      } else {
        console.error(
          `Max retries reached. Transaction ${
            status.squidTransactionStatus === 'ongoing'
              ? 'is still ongoing.'
              : 'not found.'
          }`,
        )
      }
    } catch (error: unknown) {
      await handleError(error, retryCount, changeStatusFunction, checkStatus)
    }
  }

  await checkStatus()
}

// ---------------------------------------
// ------------ Hook Definition -----------
// ---------------------------------------

/**
 * Hook for handling token swaps
 * @param requestId - Optional request ID
 * @param onSuccessHandler - Function to call on successful swap
 * @returns Object containing swap function, status, error, and deposit hash
 */
export const useSwap = () => {
  const [status, setStatus] = useState<STEP_STATUS>('idle')
  const [error, setError] = useState('')
  const [depositHash, setDepositHash] = useState<string | null>(null)

  const {
    getFullState,
    setTransactionHash,
    setTimerDuration,
    swapRoute: route,
  } = useTxStore()
  const { addTransaction, updateTransaction, removeTransaction } =
    useTransactionStore()

  const { sendTransaction } = useSendTransaction({
    mutation: {
      onError(_error) {
        setError(_error.message)
        setStatus('error')
      },
      onSuccess(data) {
        setTransactionHash(data)
        setTimerDuration(
          (route?.estimate?.executionDuration ?? 0) + ESTIMATED_TIME_OF_CONFIRMATION,
        )
        setStatus('pending')
        setDepositHash(data) // Set the deposit hash when the transaction is successful

        const txState = getFullState()
        const preparedTxState = convertBigIntToString(txState)
        addTransaction({
          ...preparedTxState,
          transactionHash: data,
          status: 'pending',
          timestamp: Date.now(),
        })
      },
    },
  })

  const mockDelay = (multiplier = 1) =>
    new Promise<void>((resolve) =>
      setTimeout(resolve, Math.max(300, MOCK_LATENCY_MS * multiplier)),
    )

  const mockHash = () =>
    `0x${Math.floor(Date.now()).toString(16).padStart(64, '0')}` as `0x${string}`

  const swapTokens = useCallback(async () => {
    if (USE_MOCKS) {
      setStatus('confirm_in_wallet')
      await mockDelay(1)
      const data = mockHash()
      setTransactionHash(data)
      setTimerDuration(
        (route?.estimate?.executionDuration ?? 0) + ESTIMATED_TIME_OF_CONFIRMATION,
      )
      setStatus('pending')
      setDepositHash(data)

      const txState = getFullState()
      const preparedTxState = convertBigIntToString(txState)
      addTransaction({
        ...preparedTxState,
        transactionHash: data,
        status: 'pending',
        timestamp: Date.now(),
      })

      await mockDelay(2)
      setStatus('success')
      updateTransaction(data, 'success')
      setTimeout(() => removeTransaction(data), 2_000)
      return
    }

    if (!route?.transactionRequest) return
    try {
      setStatus('confirm_in_wallet')

      sendTransaction(transformTxRequestToSendTxParameters(route.transactionRequest))
    } catch (error_: unknown) {
      console.error(error_)
      if (error_ instanceof Error) {
        setError(error_.message)
      } else {
        setError('An unknown error occurred')
      }
      setStatus('error')
    }
  }, [route, sendTransaction])

  return { swapTokens, status, error, depositHash }
}
