// eslint-disable-next-line import/extensions
// eslint-disable-next-line import/extensions
import { CHAIN_IDS_BY_NAME, CONFIRMATIONS_NUMBER } from '@constants/chains'
import { useCallback, useState } from 'react'
import { type Address, erc20Abi } from 'viem'
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

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
  console.log(
    '🚀 ~  approveValue',
    approveValue,
    tokenAddress,
    transactionRequestTarget,
    onSuccessHandler,
  )
  const { writeContract, ...rest } = useWriteContract()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<STEP_STATUS>('idle')

  const [approveHash, setApproveHash] = useState<Address | undefined>()

  const { status: approveTxStatus } = useWaitForTransactionReceipt({
    hash: approveHash,
    query: {
      enabled: !!approveHash,
    },
    confirmations:
      CONFIRMATIONS_NUMBER[
        (chainId as keyof typeof CONFIRMATIONS_NUMBER) ?? CHAIN_IDS_BY_NAME.Arbitrum
      ],
    chainId: chainId ?? CHAIN_IDS_BY_NAME.Arbitrum,
    timeout: 60_000,
  })

  if (approveTxStatus === 'success') {
    setLoading(false)
    setStatus('success')
    onSuccessHandler?.()
    console.log('🚀 ~ approveTxStatus', approveTxStatus)

    // eslint-disable-next-line unicorn/no-useless-undefined
    setApproveHash(undefined)
  }

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
        onSuccess: (data) => {
          setStatus('pending')
          setApproveHash(data)
        },
        onError: () => {
          setLoading(false)
          setStatus('error')
        },
      },
    )
  }, [approveValue, tokenAddress, transactionRequestTarget, writeContract])

  return { ...rest, approve, loading, status }
}
