// eslint-disable-next-line import/extensions
// eslint-disable-next-line import/extensions
import { useCallback } from 'react'
import { type Address, erc20Abi } from 'viem'
import { useWriteContract } from 'wagmi'

import type { IDepositWizardHook } from '../interfaces'

interface IProperties extends IDepositWizardHook {
  approveValue?: string
  tokenAddress?: Address
  transactionRequestTarget?: string
}

export const useApproveERC20 = ({
  approveValue,
  tokenAddress,
  transactionRequestTarget,
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

  const approve = useCallback(() => {
    if (!approveValue || !tokenAddress || !transactionRequestTarget) return

    return writeContract(
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'approve',
        args: [transactionRequestTarget as `0x${string}`, BigInt(approveValue)],
      },
      {
        onSuccess: () => {
          onSuccessHandler?.()
        },
      },
    )
  }, [
    approveValue,
    onSuccessHandler,
    tokenAddress,
    transactionRequestTarget,
    writeContract,
  ])

  return { approve, ...rest }
}
