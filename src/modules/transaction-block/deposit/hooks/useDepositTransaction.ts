// eslint-disable-next-line import/extensions
import { GATEWAY_ABI } from '@abi/gateway'
import { ARB_EID, ARB_GATEWAY } from '@constants/contract-address'
import { useTxStore } from '@modules/transaction-block/store/useDepositStore'
import { useCallback } from 'react'
import type { Address } from 'viem'
import { parseUnits } from 'viem'
import { useAccount, useWriteContract } from 'wagmi'

export const useDepositTransaction = () => {
  const { writeContract, ...rest } = useWriteContract()
  const { depositAsset, setCurrentModal, inputValue } = useTxStore()
  const { address } = useAccount()

  const deposit = useCallback(() => {
    console.log('deposit')

    if (!depositAsset || !address) return
    const tokenAddress = depositAsset.contract_address as Address
    const amount = parseUnits(inputValue, depositAsset.contract_decimals)

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
  }, [address, depositAsset, inputValue, setCurrentModal, writeContract])

  return { deposit, ...rest }
}
