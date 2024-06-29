// eslint-disable-next-line import/extensions
// eslint-disable-next-line import/extensions
import { ARB_GATEWAY } from '@constants/contract-address'
import { useTxStore } from '@modules/transaction-block/store/useDepositStore'
import { useCallback } from 'react'
import { type Address, erc20Abi } from 'viem'
import { useWriteContract } from 'wagmi'

export const useApproveDepositTransaction = () => {
  const { writeContract, ...rest } = useWriteContract()
  const { depositAsset, inputValue } = useTxStore()

  const approve = useCallback(() => {
    if (!depositAsset || !inputValue || !depositAsset.balance) return
    const tokenAddress = depositAsset.contract_address as Address
    return writeContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: 'approve',
      args: [ARB_GATEWAY, depositAsset.balance],
    })
  }, [depositAsset, inputValue, writeContract])

  return { approve, ...rest }
}
