import { CHAIN_IDS_BY_NAME, CONFIRMATIONS_NUMBER } from '@constants/chains'
import { waitForSuccessStatus } from '@modules/transaction-block/deposit/hooks/useSwap'
import type { IPendingTransactionData } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { useTransactionStore } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { type Config, waitForTransactionReceipt } from '@wagmi/core'
import { useCallback, useEffect } from 'react'
import { useConfig } from 'wagmi'

const TRANSACTION_TIMEOUT = 120_000 // 2 минуты
const REMOVE_DELAY = 60_000 // 1 минута

export const useTransactionStatusChecker = () => {
  const { transactions, updateTransaction, removeTransaction } = useTransactionStore()
  const config = useConfig()

  const checkTransactionStatus = useCallback(
    async (tx: IPendingTransactionData) => {
      try {
        const network =
          tx.txType === 'deposit'
            ? tx.depositAsset?.chain_id
            : tx.mtToken?.chainData?.chainId
        console.log('🚀 ~ network:', network)

        if (!network) throw new Error('Invalid network')

        await waitForTransactionReceipt(config as unknown as Config, {
          hash: tx.transactionHash as `0x${string}`,
          chainId: network as number,
          confirmations:
            CONFIRMATIONS_NUMBER[network as keyof typeof CONFIRMATIONS_NUMBER] || 1,
          timeout: TRANSACTION_TIMEOUT,
        })
        updateTransaction(tx.transactionHash, 'success')

        setTimeout(() => {
          removeTransaction(tx.transactionHash)
        }, REMOVE_DELAY)
      } catch (error) {
        console.error('Error checking transaction status:', error)
        updateTransaction(tx.transactionHash, 'error')
        // Здесь можно добавить логику для повторных попыток или уведомления пользователя
      }
    },
    [config, updateTransaction, removeTransaction],
  )

  const checkSwapStatus = useCallback(
    (tx: IPendingTransactionData) => {
      waitForSuccessStatus(
        tx.transactionHash,
        tx.depositAsset?.chain_id.toString(),
        CHAIN_IDS_BY_NAME.Arbitrum.toString(),
        (status) => updateTransaction(tx.transactionHash, status),
        () => updateTransaction(tx.transactionHash, 'success'),
        () => updateTransaction(tx.transactionHash, 'error'),
      )
    },
    [updateTransaction],
  )

  useEffect(() => {
    transactions.forEach((tx) => {
      if (tx.status !== 'pending') return

      if (tx.txDifficulty === 'simple') {
        checkTransactionStatus(tx)
      } else if (tx.txDifficulty === 'withSwap') {
        checkSwapStatus(tx)
      }
    })
  }, [transactions, checkTransactionStatus, checkSwapStatus, updateTransaction])
}
