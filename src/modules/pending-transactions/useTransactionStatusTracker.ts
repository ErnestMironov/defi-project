import { CHAIN_IDS_BY_NAME, CONFIRMATIONS_NUMBER } from '@constants/chains'
import { useTransactionStore } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { waitForTransactionReceipt } from '@wagmi/core'
import { useEffect } from 'react'
import { useConfig } from 'wagmi'

export const useTransactionStatusTracker = () => {
  const { transactions, updateTransaction } = useTransactionStore()
  const config = useConfig()

  useEffect(() => {
    transactions.forEach((tx) => {
      if (tx.status === 'pending') {
        const checkTransactionStatus = async () => {
          try {
            await waitForTransactionReceipt(config, {
              hash: tx.id as `0x${string}`,
              chainId: CHAIN_IDS_BY_NAME.Arbitrum,
              confirmations: CONFIRMATIONS_NUMBER[CHAIN_IDS_BY_NAME.Arbitrum],
              timeout: 60_000,
            })
            updateTransaction(tx.id, 'completed')
          } catch (error) {
            console.error('Error checking transaction status:', error)
            updateTransaction(tx.id, 'failed')
          }
        }

        checkTransactionStatus()
      }
    })
  }, [transactions, updateTransaction, config])
}
