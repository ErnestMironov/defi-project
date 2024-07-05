// eslint-disable-next-line import/extensions
import { GATEWAY_ABI } from '@abi/gateway'
import { ARB_EID, ARB_GATEWAY } from '@constants/contract-address'
import { useTxStore } from '@modules/transaction-block/store/useDepositStore'
import { useCallback } from 'react'
import type { Address } from 'viem'
import { useWriteContract } from 'wagmi'

export const useDepositTransaction = ({
  address,
  amount,
}: {
  address: Address
  amount: bigint
}) => {
  const { writeContract, ...rest } = useWriteContract()
  const { depositAsset, setCurrentModal } = useTxStore()

  const deposit = useCallback(() => {
    console.log('deposit')

    if (!depositAsset || !address) return
    const tokenAddress = depositAsset.contract_address as Address

    return writeContract(
      {
        address: ARB_GATEWAY,
        abi: GATEWAY_ABI,
        functionName: 'deposit',
        args: [tokenAddress, amount, address, ARB_EID],
      },
      {
        onSuccess: () => setCurrentModal('done'),
        onError: () => setCurrentModal('error'),
      },
    )
  }, [address, amount, depositAsset, setCurrentModal, writeContract])

  return { deposit, ...rest }
}
