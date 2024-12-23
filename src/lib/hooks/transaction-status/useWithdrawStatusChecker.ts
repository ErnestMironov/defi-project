import { getEvents } from '@api/maat-finance/useEvents'
import type { IPendingTransactionData } from '@modules/transaction-block/store/usePendingTransactionsStore'
import type { AxiosError } from 'axios'
import { useCallback } from 'react'

import { useTransactionStatusCheck } from './useTransactionStatusCheck'

export type TransactionCheckResult = {
  status: 'success' | 'error' | 'pending'
  completed: boolean
}

/**
 * Hook for checking withdraw transaction status
 * First checks blockchain status, then checks events from backend
 */
export const useWithdrawStatusChecker = () => {
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

      // If blockchain transaction is successful, check events
      try {
        const { data } = await getEvents({
          hash_or_address: [tx.transactionHash as string],
          limit: 1,
        })

        switch (data.items[0].status) {
          case 'success': {
            return { status: 'success', completed: true }
          }
          case 'failed': {
            return { status: 'error', completed: true }
          }
          default: {
            return { status: 'pending', completed: false }
          }
        }
      } catch (error) {
        if ((error as AxiosError)?.response?.status === 404) {
          return { status: 'pending', completed: false }
        }

        console.error('Error checking withdraw events:', error)
        return { status: 'error', completed: true }
      }
    },
    [checkTransactionStatus],
  )
}
