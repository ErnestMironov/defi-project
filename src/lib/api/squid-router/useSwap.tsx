import { type RouteResponse } from '@0xsquid/sdk/dist/types'
import { getEthersProvider } from '@hooks/web3/useEthersProvider'
import type {
  IDepositWizardHook,
  STEP_STATUS,
} from '@modules/transaction-block/deposit/interfaces'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'

const integratorId: string = 'baat-c34ed33a-e43d-4903-8898-a62fcc1113c5'

// Function to get the status of the transaction using Squid API
const getStatus = async (parameters: any) => {
  try {
    const result = await axios.get('https://apiplus.squidrouter.com/v2/status', {
      params: {
        transactionId: parameters.transactionId,
        requestId: parameters.requestId,
        fromChainId: parameters.fromChainId,
        toChainId: parameters.toChainId,
      },
      headers: {
        'x-integrator-id': integratorId,
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

async function waitForSuccessStatus(
  txHash: string,
  fromChainId: string,
  toChainId: string,
  changeStatusFunction: (status: STEP_STATUS) => void,
  successHandler?: () => void,
  requestId?: string,
) {
  if (!txHash) {
    throw new Error('Transaction hash is required')
  }

  changeStatusFunction('pending')
  const axelarScanLink = `https://axelarscan.io/gmp/${txHash}`
  console.log(`Finished! Check Axelarscan for details: ${axelarScanLink}`)

  await new Promise((resolve) => setTimeout(resolve, 5000))

  const getStatusParameters = {
    transactionId: txHash,
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

  const handleStatus = async (status: any) => {
    if (
      status?.squidTransactionStatus &&
      completedStatuses.has(status.squidTransactionStatus)
    ) {
      console.log('Swap transaction executed:', txHash)
      changeStatusFunction('success')
      successHandler?.()
      return true
    }
    return false
  }

  const handleError = async (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
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

  const checkStatus = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000))
      const status = await getStatus(getStatusParameters)
      console.log(`Route status: ${status.squidTransactionStatus}`)

      if (await handleStatus(status)) return

      retryCount++
      if (retryCount < maxRetries) {
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
      await handleError(error)
    }
  }

  await checkStatus()
}

interface IProperties extends IDepositWizardHook {
  route?: RouteResponse['route']
  requestId?: string
}

export const useSwap = ({ route, requestId, onSuccessHandler }: IProperties) => {
  const [status, setStatus] = useState<STEP_STATUS>('idle')
  const [error, setError] = useState('')

  const provider = getEthersProvider()
  console.log('🚀 ~ useSwap ~ provider:', provider)
  const { sendTransaction, data: hash } = useSendTransaction({
    mutation: {
      onError(_error) {
        setError(_error.message)
        setStatus('error')
      },
      onSuccess(data) {
        waitForSuccessStatus(
          data,
          route?.params?.fromChain,
          route?.params?.toChain,
          setStatus,
          onSuccessHandler,
          requestId,
        )
      },
    },
  })

  const { data } = useWaitForTransactionReceipt({
    hash,
  })
  console.log('🚀 ~ useSwap ~ data:', data)

  const swapTokens = useCallback(async () => {
    if (!route?.transactionRequest) return
    try {
      setStatus('pending')

      sendTransaction({
        to: route.transactionRequest.target,
        data: route.transactionRequest.data,
        value: route.transactionRequest.value,
        gasPrice: route.transactionRequest.gasPrice,
        gasLimit: route.transactionRequest.gasLimit,
      })
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

  return { swapTokens, status, error }
}
