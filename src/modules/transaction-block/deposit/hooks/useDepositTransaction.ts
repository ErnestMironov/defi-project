// eslint-disable-next-line import/extensions
import { GATEWAY_ABI } from '@abi/gateway'
import { ARB_EID, ARB_GATEWAY } from '@constants/contract-address'
import { useTxStore } from '@modules/transaction-block/store/useDepositStore'
import { useCallback } from 'react'
import type { Address } from 'viem'
import { useWriteContract } from 'wagmi'

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

  const deposit = useCallback(() => {

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
        onSuccess: () => {
          onSuccessHandler?.()
          setCurrentModal('done')
        },
        onError: () => setCurrentModal('error'),
      },
    )
  }, [address, amount, depositAsset, onSuccessHandler, setCurrentModal, writeContract])

  return { deposit, ...rest }
}
