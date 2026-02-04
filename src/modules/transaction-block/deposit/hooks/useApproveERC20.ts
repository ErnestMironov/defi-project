import { CHAIN_IDS_BY_NAME, CONFIRMATIONS_NUMBER } from '@constants/chains'
import { USE_MOCKS } from '@configs/mocks'
import { waitForTransactionReceipt } from '@wagmi/core'
import { useCallback, useEffect, useState } from 'react'
import { type Address, erc20Abi } from 'viem'
import { useConfig, useReadContract, useWriteContract } from 'wagmi'

import type { IDepositWizardHook, STEP_STATUS } from '../interfaces'
import { useActiveAccount } from '@hooks/useActiveAccount'

interface IProperties extends IDepositWizardHook {
  approveValue?: string
  tokenAddress?: Address
  transactionRequestTarget?: string
  chainId?: number
}

export const useApproveERC20 = ({
  approveValue,
  tokenAddress,
  transactionRequestTarget,
  chainId,
  onSuccessHandler,
}: IProperties) => {
  const { writeContract, ...rest } = useWriteContract()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<STEP_STATUS>('idle')
  const { address } = useActiveAccount()

  const config = useConfig()

  const { data: allowance } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address!, transactionRequestTarget as Address],
    query: {
      enabled: !USE_MOCKS,
    },
  })
  console.log('🚀 ~ tokenAddress:', tokenAddress)

  useEffect(() => {
    if (!USE_MOCKS) {
      console.log('🚀 ~ useEffect ~ allowance:', allowance)
      if (allowance && approveValue && BigInt(allowance) >= BigInt(approveValue)) {
        setStatus('success')
        onSuccessHandler?.()
      }
    }
  }, [allowance, approveValue, onSuccessHandler])

  const approve = useCallback(() => {
    if (USE_MOCKS) {
      setLoading(false)
      setStatus('success')
      onSuccessHandler?.()
      return
    }

    console.log('🚀 ~ approve ~ approveValue:', approveValue)

    if (!approveValue || !tokenAddress || !transactionRequestTarget) {
      switch (true) {
        case !approveValue: {
          console.error('approveValue is required')
          break
        }
        case !tokenAddress: {
          console.error('tokenAddress is required')
          break
        }
        case !transactionRequestTarget: {
          console.error('transactionRequestTarget is required')
          break
        }
        default: {
          console.error('Unknown error')
          break
        }
      }
      return
    }

    if (allowance && BigInt(allowance) >= BigInt(approveValue)) {
      setStatus('success')
      onSuccessHandler?.()
      return
    }

    setLoading(true)
    setStatus('confirm_in_wallet')

    return writeContract(
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'approve',
        chainId,
        args: [transactionRequestTarget as `0x${string}`, BigInt(approveValue)],
      },
      {
        onSuccess: async (data) => {
          console.log('🚀 ~ onSuccess: ~ data:', data)
          setStatus('pending')

          try {
            // @ts-ignore
            await waitForTransactionReceipt(config, {
              hash: data,
              chainId,
              confirmations:
                CONFIRMATIONS_NUMBER[
                  (chainId as keyof typeof CONFIRMATIONS_NUMBER) ??
                    CHAIN_IDS_BY_NAME.Arbitrum
                ],
              timeout: 60_000,
            })

            setLoading(false)
            setStatus('success')

            if (onSuccessHandler) {
              onSuccessHandler()
            }
          } catch {
            setLoading(false)
            setStatus('error')
          }
        },
        onError: () => {
          setLoading(false)
          setStatus('error')
        },
      },
    )
  }, [
    approveValue,
    chainId,
    config,
    onSuccessHandler,
    tokenAddress,
    transactionRequestTarget,
    writeContract,
    allowance,
  ])

  return { ...rest, approve, loading, status }
}
