import { CONFIRMATIONS_NUMBER } from '@constants/chains'
import type { IPendingTransactionData } from '@modules/transaction-block/store/usePendingTransactionsStore'
import { type Config, waitForTransactionReceipt } from '@wagmi/core'
import { useCallback } from 'react'
import type { Address } from 'viem'
import { useConfig } from 'wagmi'

const TRANSACTION_TIMEOUT = 120_000 // 2 minutes

/**
 * Hook for checking transaction status in blockchain
 * @returns Function for checking transaction status
 */
export const useTransactionStatusCheck = () => {
  const config = useConfig()

  return useCallback(
    async (tx: IPendingTransactionData) => {
      const network =
        tx.txType === 'deposit'
          ? tx.depositAsset?.chain_id
          : tx.mtToken?.chainData?.chainId

      if (!network) throw new Error('Invalid network')

      await waitForTransactionReceipt(config as unknown as Config, {
        hash: tx.transactionHash as Address,
        chainId: network as number,
        confirmations:
          CONFIRMATIONS_NUMBER[network as keyof typeof CONFIRMATIONS_NUMBER] || 1,
        timeout: TRANSACTION_TIMEOUT,
      })
    },
    [config],
  )
}
