// eslint-disable-next-line import/extensions
import { GATEWAY_ABI } from '@abi/gateway'
import { ARB_EID, ARB_GATEWAY } from '@constants/contract-address'
import { useTransactionStore } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { convertBigIntToString } from '@utils/formatValue'
import { useCallback, useState } from 'react'
import { type Address, formatUnits } from 'viem'
import { useAccount, useWriteContract } from 'wagmi'

import type { IDepositWizardHook, STEP_STATUS } from '../interfaces'

interface IProperties extends IDepositWizardHook {
  address: Address
  amount: bigint
}

export const useDepositTransaction = ({ address, amount }: IProperties) => {
  const { writeContract, ...rest } = useWriteContract()
  const {
    setCurrentModal,
    getFullState,
    setTransactionCanBeCollapsed,
    setDepositAmount,
  } = useTxStore()
  const { address: userAddress } = useAccount()
  const [status, setStatus] = useState<STEP_STATUS>('idle')
  const { addTransaction } = useTransactionStore()

  const deposit = useCallback(() => {
    if (!address || !userAddress) return
    setDepositAmount(amount ? formatUnits(amount, 6) : '0')
    setStatus('confirm_in_wallet')

    return writeContract(
      {
        address: ARB_GATEWAY,
        abi: GATEWAY_ABI,
        functionName: 'deposit',
        args: [address, amount, userAddress, ARB_EID],
      },
      {
        onSuccess: async (data) => {
          setStatus('pending')

          const txState = getFullState()
          const txStateWithStringBigInt = convertBigIntToString(txState)
          // @ts-ignore
          addTransaction({
            ...txStateWithStringBigInt,
            id: data,
            status: 'pending',
            timestamp: Date.now(),
          })

          setTransactionCanBeCollapsed(true)
        },
        onError: (err) => {
          console.error('Error depositing', err)
          setCurrentModal('error')
        },
      },
    )
  }, [
    address,
    userAddress,
    writeContract,
    amount,
    getFullState,
    setDepositAmount,
    addTransaction,
    setTransactionCanBeCollapsed,
    setCurrentModal,
  ])

  return { deposit, ...rest, status }
}
