import type { IPendingTransactionData } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { useCallback } from 'react'

import { useTransactionStatusCheck } from './useTransactionStatusCheck'
import type { TransactionCheckResult } from './useWithdrawStatusChecker'

/**
 * Hook for checking deposit transaction status
 * Only checks blockchain status as there's no additional backend check needed
 */
export const useDepositStatusChecker = () => {
  const checkTransactionStatus = useTransactionStatusCheck()

  return useCallback(
    async (tx: IPendingTransactionData): Promise<TransactionCheckResult> => {
      try {
        await checkTransactionStatus(tx)
        return { status: 'success', completed: true }
      } catch (error) {
        console.error('Error checking deposit status:', error)
        return { status: 'error', completed: true }
      }
    },
    [checkTransactionStatus],
  )
}
