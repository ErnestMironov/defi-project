// eslint-disable-next-line import/extensions
import { GATEWAY_ABI } from '@abi/gateway'
import { ARB_EID, ARB_GATEWAY } from '@constants/contract-address'
import { useTxStore } from '@modules/transaction-block/store/useDepositStore'
import { useCallback } from 'react'
import type { Address } from 'viem'
import { useAccount, useWriteContract } from 'wagmi'

import type { IDepositWizardHook } from '../interfaces'

interface IProperties extends IDepositWizardHook {
  address: Address
  amount: bigint
}

export const useDepositTransaction = ({
  address,
  amount,
  onSuccessHandler,
}: IProperties) => {
  const { writeContract, ...rest } = useWriteContract()
  const { depositAsset, setCurrentModal } = useTxStore()
  const { address: userAddress } = useAccount()

  const deposit = useCallback(() => {
    console.log(
      '🚀 ~ deposit ~ address, amount, userAddress, ARB_EID:',
      address,
      amount,
      userAddress,
      ARB_EID,
    )
    if (!depositAsset || !address || !userAddress) return

    return writeContract(
      {
        address: ARB_GATEWAY,
        abi: GATEWAY_ABI,
        functionName: 'deposit',
        args: [address, amount, userAddress, ARB_EID],
      },
      {
        onSuccess: () => {
          onSuccessHandler?.()
          setCurrentModal('done')
        },
        onError: (err) => {
          console.error('Error depositing', err)
          setCurrentModal('error')
        },
      },
    )
  }, [
    address,
    amount,
    depositAsset,
    onSuccessHandler,
    setCurrentModal,
    userAddress,
    writeContract,
  ])

  return { deposit, ...rest }
}
