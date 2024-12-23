import { getStatus } from '@api/lifi/endpoints/get-status'
import type { IPendingTransactionData } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { useCallback } from 'react'
import type { Address } from 'viem'

import { useTransactionStatusCheck } from './useTransactionStatusCheck'
import type { TransactionCheckResult } from './useWithdrawStatusChecker'

/**
 * Hook for checking swap transaction status
 * First checks blockchain status, then checks LiFi status
 */
export const useSwapStatusChecker = () => {
  const checkTransactionStatus = useTransactionStatusCheck()

  return useCallback(
    async (tx: IPendingTransactionData): Promise<TransactionCheckResult> => {
      try {
        // First, check blockchain transaction status
        await checkTransactionStatus(tx)
      } catch (error) {
        console.error('Blockchain transaction failed:', error)
        return { status: 'error', completed: true }
      }

      try {
        const status = await getStatus(tx.transactionHash as Address)

        switch (status.data.status) {
          case 'DONE': {
            return { status: 'success', completed: true }
          }
          case 'FAILED': {
            return { status: 'error', completed: true }
          }
          default: {
            return { status: 'pending', completed: false }
          }
        }
      } catch (error) {
        console.error('Error checking swap status:', error)
        return { status: 'error', completed: true }
      }
    },
    [checkTransactionStatus],
  )
}
