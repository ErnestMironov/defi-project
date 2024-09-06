import { tokenVaultAbi } from '@constants/abi/token-vault'
import { ESTIMATED_TIME_OF_CONFIRMATION } from '@constants/chains'
import { EIDS_BY_CHAIN_ID } from '@constants/eids'
import type { STEP_STATUS } from '@modules/transaction-block/deposit/interfaces'
import { useTransactionStore } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { convertBigIntToString } from '@utils/formatValue'
import { useState } from 'react'
import type { Address } from 'viem'
import { useAccount, useWriteContract } from 'wagmi'

import { useVaultBalance } from './useVaultBalance'

export const useWithdrawTransaction = ({ amount }: { amount: string }) => {
  const { address } = useAccount()
  const {
    setCurrentModal,
    mtToken,
    withdrawToNetwork,
    withdrawFromNetwork,
    setTransactionCanBeCollapsed,
    getFullState,
    setTransactionHash,
    setTxDifficulty,
    setTimerDuration,
  } = useTxStore()

  const { addTransaction } = useTransactionStore()

  const [status, setStatus] = useState<STEP_STATUS>('idle')

  const { sharesBalance } = useVaultBalance(mtToken?.mtAddress || '0x')

  const isEnoughSharesToWithdraw =
    sharesBalance && amount ? sharesBalance >= BigInt(amount) : undefined

  const { writeContract, ...rest } = useWriteContract({})

  const withdraw = async () => {
    if (
      !address ||
      !amount ||
      !isEnoughSharesToWithdraw ||
      !mtToken ||
      !withdrawToNetwork ||
      !withdrawFromNetwork
    )
      return
    setStatus('confirm_in_wallet')

    return writeContract(
      {
        address: mtToken?.mtAddress as Address,
        abi: tokenVaultAbi,
        functionName: 'requestWithdraw',
        chainId: withdrawFromNetwork,
        args: [BigInt(amount), EIDS_BY_CHAIN_ID[withdrawToNetwork], address, address],
      },

      {
        onSuccess: (data) => {
          setStatus('pending')
          setTransactionHash(data)
          setTimerDuration(ESTIMATED_TIME_OF_CONFIRMATION)
          setTxDifficulty('on_chain')
          const txState = getFullState()
          const txStateWithStringBigInt = convertBigIntToString(txState)
          addTransaction({
            ...txStateWithStringBigInt,
            status: 'pending',
            timestamp: Date.now(),
          })
          setTransactionCanBeCollapsed(true)
        },
        onError: (e) => {
          console.error(e.message)
          setCurrentModal('error')
          setStatus('error')
        },
      },
    )
  }

  return { withdraw, isEnoughSharesToWithdraw, ...rest, status }
}
