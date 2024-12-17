import { useDepositStatusChecker } from '@hooks/transaction-status/useDepositStatusChecker'
import { useSwapStatusChecker } from '@hooks/transaction-status/useSwapStatusChecker'
import { useWithdrawStatusChecker } from '@hooks/transaction-status/useWithdrawStatusChecker'
import type { IPendingTransactionData } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { useTransactionStore } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { useCallback, useEffect } from 'react'

// Transaction status checking constants
const CHECK_INTERVAL = 15_000 // 15 seconds
const REMOVE_DELAY = 30_000 // 30 seconds

/**
 * Hook for tracking transaction status
 * Handles different types of transactions (withdraw, deposit, swap)
 * and updates their status in the store
 */
export const useTransactionStatusChecker = () => {
  const { transactions, updateTransaction, removeTransaction } = useTransactionStore()
  const checkWithdrawStatus = useWithdrawStatusChecker()
  const checkSwapStatus = useSwapStatusChecker()
  const checkDepositStatus = useDepositStatusChecker()

  const handleTransaction = useCallback(
    async (tx: IPendingTransactionData) => {
      let result

      switch (true) {
        case tx.txType === 'withdraw': {
          result = await checkWithdrawStatus(tx)
          break
        }
        case tx.txType === 'deposit' && tx.isTxZAP:
        case tx.txDifficulty === 'cross_chain': {
          result = await checkSwapStatus(tx)
          break
        }
        case tx.txDifficulty === 'on_chain': {
          result = await checkDepositStatus(tx)
          break
        }
        default: {
          console.warn(
            `Unknown transaction type - ${tx.txType} and difficulty ${tx.txDifficulty}`,
            tx,
          )
          return
        }
      }

      if (result.completed) {
        updateTransaction(tx.transactionHash, result.status)

        if (result.status === 'success') {
          setTimeout(() => {
            removeTransaction(tx.transactionHash)
          }, REMOVE_DELAY)
        }
      }
    },
    [
      checkWithdrawStatus,
      checkSwapStatus,
      checkDepositStatus,
      updateTransaction,
      removeTransaction,
    ],
  )

  useEffect(() => {
    const intervalIds: NodeJS.Timeout[] = []

    transactions.forEach((tx) => {
      if (tx.status !== 'pending') return

      const intervalId = setInterval(() => {
        handleTransaction(tx)
      }, CHECK_INTERVAL)

      intervalIds.push(intervalId)
    })

    return () => {
      intervalIds.forEach(clearInterval)
    }
  }, [transactions, handleTransaction])
}
