import { useEffect, useState } from 'react'

import type { STEP_STATUS } from '../deposit/interfaces'
import { useTransactionStore } from '../store/usePendingTransactionsStore'
import { useTxStore } from '../store/useTxStore'

export const useTransactionStatus = (currentStatus: STEP_STATUS) => {
  const { transactions } = useTransactionStore()
  const { transactionHash } = useTxStore()
  const [successStatus, setSuccessStatus] = useState<STEP_STATUS | null>(null)

  const storedTransaction = transactions.find(
    (tx) => tx.transactionHash === transactionHash,
  )

  useEffect(() => {
    if (storedTransaction?.status === 'success') {
      setSuccessStatus('success')
    }
  }, [storedTransaction?.status])

  // Show error if it comes from any source
  if (currentStatus === 'error' || storedTransaction?.status === 'error') {
    return 'error'
  }

  // If no error, return success status if exists, otherwise fallback to store/current status
  return successStatus || storedTransaction?.status || currentStatus
}
