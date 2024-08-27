// src/modules/transaction-block/store/usePendingTransactionsStore.ts
import type { ITokenData } from '@api/tokens-balance/api'
import { type ChainType } from '@constants/chains'
import type { TxType } from '@constants/txTypes'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import type { STEP_STATUS } from '../deposit/interfaces'
import type { Vault } from '../deposit/SelectVault'
import type { UseGetMTokenInfoReturn } from '../withdraw/hooks/useGetMTokenInfo'
import type { TxDifficulty } from './useTxStore'

export interface IPendingTransactionData {
  transactionHash: string
  inputValue: string
  inputValueInUsd: string
  status: STEP_STATUS
  timestamp: number
  vault: Vault
  depositAsset: ITokenData
  depositFromNetwork: ChainType | null
  withdrawNetwork: ChainType | null
  mtToken: UseGetMTokenInfoReturn | null
  txType: TxType
  depositAmount: string
  withdrawAmount: string
  depositToNetwork: ChainType | null
  boostMode: boolean
  arrivalGas: string
  currentStep: number
  isTransactionFromStore: boolean
  txDifficulty: TxDifficulty
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
