// eslint-disable-next-line import/extensions
import { tokenVaultAbi } from '@constants/abi/token-vault'
import { ESTIMATED_TIME_OF_CONFIRMATION } from '@constants/chains'
import { useTransactionStore } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { USE_MOCKS, MOCK_LATENCY_MS } from '@configs/mocks'
import { convertBigIntToString } from '@utils/formatValue'
import { useCallback, useState } from 'react'
import { type Address, formatUnits } from 'viem'
import { useWriteContract } from 'wagmi'

import type { IDepositWizardHook, STEP_STATUS } from '../interfaces'
import { useActiveAccount } from '@hooks/useActiveAccount'

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
  const { address: userAddress } = useActiveAccount()
  const [status, setStatus] = useState<STEP_STATUS>('idle')
  const { addTransaction, updateTransaction, removeTransaction } = useTransactionStore()

  const mockDelay = (multiplier = 1) =>
    new Promise<void>((resolve) =>
      setTimeout(resolve, Math.max(300, MOCK_LATENCY_MS * multiplier)),
    )

  const mockHash = () =>
    `0x${Math.floor(Date.now()).toString(16).padStart(64, '0')}` as `0x${string}`

  const deposit = useCallback(() => {
    if (!address || !userAddress || !vaultAddress) return
    setStatus('confirm_in_wallet')
    setDepositAmount(amount ? formatUnits(amount, 6) : '0')

    if (USE_MOCKS) {
      return (async () => {
        await mockDelay(1)
        const data = mockHash()
        setStatus('pending')
        setTransactionHash(data)
        setTxDifficulty('on_chain')
        setTimerDuration(ESTIMATED_TIME_OF_CONFIRMATION)
        const txState = getFullState()
        const txStateWithStringBigInt = convertBigIntToString(txState)
        addTransaction({
          ...txStateWithStringBigInt,
          transactionHash: data,
          status: 'pending',
          timestamp: Date.now(),
        })
        setTransactionCanBeCollapsed(true)

        await mockDelay(2)
        updateTransaction(data, 'success')
        setTimeout(() => removeTransaction(data), 2_000)
      })()
    }

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
