// eslint-disable-next-line import/extensions
// eslint-disable-next-line import/extensions
import { useTxStore } from '@modules/transaction-block/store/useDepositStore'
import { useCallback } from 'react'
import { type Address, erc20Abi } from 'viem'
import { useWriteContract } from 'wagmi'

export const useApproveDepositTransaction = ({
  transactionRequestTarget,
}: {
  transactionRequestTarget?: string
}) => {
  const { writeContract, ...rest } = useWriteContract()
  const { depositAsset, inputValue } = useTxStore()

  const approve = useCallback(() => {
    if (
      !depositAsset ||
      !inputValue ||
      !depositAsset.balance ||
      !transactionRequestTarget
    )
      return
    const tokenAddress = depositAsset.contract_address as Address
    console.log('🚀 ~ approve ~ tokenAddress:', tokenAddress)
    return writeContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: 'approve',
      args: [transactionRequestTarget as `0x${string}`, depositAsset.balance],
    })
  }, [depositAsset, inputValue, transactionRequestTarget, writeContract])

  return { approve, ...rest }
}
