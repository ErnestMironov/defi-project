// eslint-disable-next-line import/extensions
// eslint-disable-next-line import/extensions
import { useCallback } from 'react'
import { type Address, erc20Abi } from 'viem'
import { useWriteContract } from 'wagmi'

export const useApproveDepositTransaction = ({
  approveValue,
  tokenAddress,
  transactionRequestTarget,
}: {
  approveValue: string
  tokenAddress: Address
  transactionRequestTarget: string
}) => {
  const { writeContract, ...rest } = useWriteContract()

  const approve = useCallback(() => {
    if (!approveValue || !tokenAddress || !transactionRequestTarget) return

    return writeContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: 'approve',
      args: [transactionRequestTarget as `0x${string}`, BigInt(approveValue)],
    })
  }, [approveValue, tokenAddress, transactionRequestTarget, writeContract])

  return { approve, ...rest }
}
