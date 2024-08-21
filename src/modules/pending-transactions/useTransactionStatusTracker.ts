import { CONFIRMATIONS_NUMBER } from '@constants/chains'
import { useTransactionStore } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { type Config, waitForTransactionReceipt } from '@wagmi/core'
import { useEffect } from 'react'
import { useConfig } from 'wagmi'

export const useTransactionStatusChecker = () => {
  const { transactions, updateTransaction, removeTransaction } = useTransactionStore()
  const config = useConfig() as unknown as Config

  useEffect(() => {
    transactions.forEach((tx) => {
      if (tx.status === 'pending') {
        const checkTransactionStatus = async () => {
          try {
            const network =
              tx.txType === 'deposit' ? tx.depositAsset?.chain_id : tx.withdrawNetwork

            await waitForTransactionReceipt(config, {
              hash: tx.transactionHash as `0x${string}`,
              chainId: network as number,
              confirmations:
                CONFIRMATIONS_NUMBER[network as keyof typeof CONFIRMATIONS_NUMBER],
              timeout: 60_000,
            })
            updateTransaction(tx.transactionHash, 'success')

            setTimeout(() => {
              removeTransaction(tx.transactionHash)
            }, 30_000)
          } catch (error) {
            console.error('Error checking transaction status:', error)
            updateTransaction(tx.transactionHash, 'error')
          }
        }

        checkTransactionStatus()
      }
    })
  }, [transactions, updateTransaction, removeTransaction, config])
}
