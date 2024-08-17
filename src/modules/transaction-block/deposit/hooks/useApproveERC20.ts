// eslint-disable-next-line import/extensions
// eslint-disable-next-line import/extensions

import { CHAIN_IDS_BY_NAME, CONFIRMATIONS_NUMBER } from '@constants/chains'
import { waitForTransactionReceipt } from '@wagmi/core'
import { useCallback, useState } from 'react'
import { type Address, erc20Abi } from 'viem'
import { useConfig, useWriteContract } from 'wagmi'

import type { IDepositWizardHook, STEP_STATUS } from '../interfaces'

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

  const config = useConfig()

  const approve = useCallback(() => {
    if (!approveValue || !tokenAddress || !transactionRequestTarget) return

    setLoading(true)
    setStatus('confirm_in_wallet')

    return writeContract(
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'approve',
        args: [transactionRequestTarget as `0x${string}`, BigInt(approveValue)],
      },
      {
        onSuccess: async (data) => {
          setStatus('pending')
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
          onSuccessHandler?.()
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
  ])

  return { ...rest, approve, loading, status }
}
