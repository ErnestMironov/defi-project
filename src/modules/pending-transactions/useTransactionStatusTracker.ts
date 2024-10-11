import { getStatus } from '@api/lifi/endpoints/get-status'
import { getEvents } from '@api/queries/useEvents'
import type { ChainType } from '@constants/chains'
import { CONFIRMATIONS_NUMBER } from '@constants/chains'
import type { IPendingTransactionData } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { useTransactionStore } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { type Config, waitForTransactionReceipt } from '@wagmi/core'
import type { AxiosError } from 'axios'
import { useCallback, useEffect } from 'react'
import type { Address } from 'viem'
import { useConfig } from 'wagmi'

// Transaction status checking constants
const TRANSACTION_TIMEOUT = 120_000 // 2 minutes
const REMOVE_DELAY = 30_000 // 30 seconds
const CHECK_INTERVAL = 15_000 // 15 seconds

export const useTransactionStatusChecker = () => {
  const { transactions, updateTransaction, removeTransaction } = useTransactionStore()
  const config = useConfig()

  // Transaction status checking functions
  // These functions handle checking the status of different transaction types

  /**
   * Checks the status of a regular transaction
   * @param tx - The pending transaction data
   */
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
          hash: tx.transactionHash as Address,
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
      }
    },
    [config, updateTransaction, removeTransaction],
  )

  /**
   * Checks the status of a swap transaction
   * @param tx - The pending transaction data
   */
  const checkSwapStatus = useCallback(
    async (tx: IPendingTransactionData) => {
      try {
        await waitForTransactionReceipt(config as unknown as Config, {
          hash: tx.transactionHash as Address,
          chainId: tx.depositFromNetwork as ChainType,
          confirmations:
            CONFIRMATIONS_NUMBER[
              tx.depositFromNetwork as keyof typeof CONFIRMATIONS_NUMBER
            ] || 1,
          timeout: TRANSACTION_TIMEOUT,
        })

        const status = await getStatus(tx.transactionHash as Address)
        console.log('🚀 ~ status:', status)

        switch (status.data.status) {
          case 'DONE': {
            updateTransaction(tx.transactionHash, 'success')
            break
          }
          case 'FAILED': {
            updateTransaction(tx.transactionHash, 'error')
            break
          }
          default:
        }
      } catch (error) {
        console.error('Error checking swap status:', error)
        updateTransaction(tx.transactionHash, 'error')
      }
    },
    [config, updateTransaction],
  )

  /**
   * Checks the status of a withdraw transaction
   * @param tx - The pending transaction data
   * @returns A boolean indicating if the transaction is completed
   */
  const checkWithdrawStatus = useCallback(
    async (tx: IPendingTransactionData) => {
      try {
        const { data } = await getEvents({
          hash_or_address: tx.transactionHash as `0x${string}`,
          limit: 1,
        })

        switch (data.items[0].status) {
          case 'success': {
            updateTransaction(tx.transactionHash, 'success')
            setTimeout(() => {
              removeTransaction(tx.transactionHash)
            }, REMOVE_DELAY)
            return true
          }
          case 'failed': {
            updateTransaction(tx.transactionHash, 'error')
            return true
          }
          default: {
            return false
          }
        }
      } catch (error) {
        if ((error as AxiosError)?.response?.status === 404) {
          return false
        }

        console.error('Error checking withdraw status:', error)
        updateTransaction(tx.transactionHash, 'error')
        return true
      }
    },
    [updateTransaction, removeTransaction],
  )

  // Transaction handling functions
  // These functions manage the process of checking different transaction types

  /**
   * Handles the checking process for withdraw transactions
   * @param tx - The pending transaction data
   * @param intervalIds - Array to store interval IDs for cleanup
   */
  const handleWithdrawTransaction = useCallback(
    (tx: IPendingTransactionData, intervalIds: NodeJS.Timeout[]) => {
      const intervalId = setInterval(async () => {
        try {
          const isCompleted = await checkWithdrawStatus(tx)
          if (isCompleted) {
            clearInterval(intervalId)
          }
        } catch (error) {
          console.error('Error checking withdraw status:', error)
          clearInterval(intervalId)
        }
      }, CHECK_INTERVAL)
      intervalIds.push(intervalId)
    },
    [checkWithdrawStatus],
  )

  /**
   * Handles the checking process for non-withdraw transactions
   * @param tx - The pending transaction data
   */
  const handleOtherTransaction = useCallback(
    (tx: IPendingTransactionData) => {
      let checkFunction

      switch (true) {
        case tx.txType === 'withdraw': {
          checkFunction = checkWithdrawStatus
          break
        }
        case tx.txType === 'deposit' && tx.isTxZAP:
        case tx.txDifficulty === 'cross_chain': {
          checkFunction = checkSwapStatus
          break
        }
        case tx.txDifficulty === 'on_chain': {
          checkFunction = checkTransactionStatus
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

      checkFunction(tx)
    },
    [checkWithdrawStatus, checkTransactionStatus, checkSwapStatus],
  )

  // Main effect for transaction status tracking
  // This effect sets up intervals to check the status of pending transactions

  useEffect(() => {
    const intervalIds: NodeJS.Timeout[] = []

    transactions.forEach((tx) => {
      if (tx.status !== 'pending') return

      if (tx.txType === 'withdraw') {
        handleWithdrawTransaction(tx, intervalIds)
      } else {
        handleOtherTransaction(tx)
      }
    })

    return () => {
      intervalIds.forEach(clearInterval)
    }
  }, [
    transactions,
    checkTransactionStatus,
    checkSwapStatus,
    checkWithdrawStatus,
    handleWithdrawTransaction,
    handleOtherTransaction,
  ])
}
