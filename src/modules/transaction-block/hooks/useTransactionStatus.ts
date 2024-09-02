import type { STEP_STATUS } from '../deposit/interfaces'
import { useTransactionStore } from '../store/usePendingTransactionsStore'
import { useTxStore } from '../store/useTxStore'

export const useTransactionStatus = (currentStatus: STEP_STATUS) => {
  const { transactions } = useTransactionStore()
  const { transactionHash } = useTxStore()

  const storedTransaction = transactions.find(
    (tx) => tx.transactionHash === transactionHash,
  )

  if (storedTransaction) {
    return storedTransaction.status
  }

  return currentStatus
}
