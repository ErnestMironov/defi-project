// src/modules/transaction-block/store/usePendingTransactionsStore.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import type { STEP_STATUS } from '../deposit/interfaces'
import type { SelectedAssetState } from './useTxStore'

type OmitSetters<T> = {
  [K in keyof T as K extends `set${string}` ? never : K]: T[K]
}

export interface IPendingTransactionData extends OmitSetters<SelectedAssetState> {
  transactionHash: string
  status: STEP_STATUS
  timestamp: number
  isTransactionFromStore: boolean
}

interface TransactionState {
  transactions: IPendingTransactionData[]
  addTransaction: (transaction: IPendingTransactionData) => void
  updateTransaction: (id: string, status: STEP_STATUS) => void
  clearTransactions: () => void
  removeTransaction: (id: string) => void
  isTransactionExist: (hash: string) => boolean // Переименованный метод
}

export const useTransactionStore = create<TransactionState>()(
  devtools(
    persist(
      (set, get) => ({
        transactions: [],
        addTransaction: (transaction) => {
          set((state) => ({
            transactions: [
              ...state.transactions,
              { ...transaction, isTransactionFromStore: true },
            ],
          }))
        },
        updateTransaction: (hash, status) => {
          set((state) => ({
            transactions: state.transactions.map((transaction) =>
              transaction.transactionHash === hash
                ? { ...transaction, status }
                : transaction,
            ),
          }))
        },
        clearTransactions: () => {
          set({ transactions: [] })
        },
        removeTransaction: (hash) => {
          set((state) => ({
            transactions: state.transactions.filter(
              (transaction) => transaction.transactionHash !== hash,
            ),
          }))
        },
        isTransactionExist: (hash) => {
          return get().transactions.some(
            (transaction) => transaction.transactionHash === hash,
          )
        },
      }),
      {
        name: 'transactions-storage',
      },
    ),
    {
      name: 'TransactionStore',
      enabled: process.env.NODE_ENV === 'development',
    },
  ),
)
