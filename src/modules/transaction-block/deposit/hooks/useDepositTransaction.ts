// eslint-disable-next-line import/extensions
import { tokenVaultAbi } from '@constants/abi/token-vault'
import { ESTIMATED_TIME_OF_CONFIRMATION } from '@constants/chains'
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
    depositAsset: asset,
    vaultAddress,
    setCurrentModal,
    getFullState,
    setTransactionCanBeCollapsed,
    setDepositAmount,
    setTransactionHash,
    setTxDifficulty,
    setTimerDuration,
  } = useTxStore()
  const { address: userAddress } = useAccount()
  const [status, setStatus] = useState<STEP_STATUS>('idle')
  const { addTransaction } = useTransactionStore()

  const deposit = useCallback(() => {
    if (!address || !userAddress || !vaultAddress) return
    setStatus('confirm_in_wallet')
    setDepositAmount(amount ? formatUnits(amount, 6) : '0')

    return writeContract(
      {
        address: vaultAddress,
        abi: tokenVaultAbi,
        chainId: asset?.chain_id,
        functionName: 'deposit',
        args: [amount, userAddress],
      },
      {
        onSuccess: async (data) => {
          setStatus('pending')
          setTransactionHash(data)
          setTxDifficulty('on_chain')
          setTimerDuration(ESTIMATED_TIME_OF_CONFIRMATION)
          const txState = getFullState()
          const txStateWithStringBigInt = convertBigIntToString(txState)
          // @ts-ignore
          addTransaction({
            ...txStateWithStringBigInt,
            transactionHash: data,
            status: 'pending',
            timestamp: Date.now(),
          })

          setTransactionCanBeCollapsed(true)
        },
        onError: (err) => {
          console.error('Error depositing', err)
          console.log(JSON.stringify(err, null, 2))
          setCurrentModal('error')
        },
      },
    )
  }, [
    address,
    userAddress,
    vaultAddress,
    setDepositAmount,
    amount,
    writeContract,
    asset?.chain_id,
    setTransactionHash,
    setTxDifficulty,
    setTimerDuration,
    getFullState,
    addTransaction,
    setTransactionCanBeCollapsed,
    setCurrentModal,
  ])

  return { deposit, ...rest, status }
}
