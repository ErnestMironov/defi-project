import type { RouteResponse } from '@0xsquid/sdk/dist/types'
import type { ITokenData } from '@api/tokens-balance/api'
import type { ChainType, DepositChainType } from '@constants/chains'
import type { TxType } from '@constants/txTypes'
import { TX_TYPE } from '@constants/txTypes'
import { convertBigIntToString } from '@utils/formatValue'
import type { Address } from 'viem'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import type { UseGetMTokenInfoReturn } from '../withdraw/hooks/useGetMTokenInfo'
import type { IPendingTransactionData } from './usePendingTransactionsStore'

export type Vault = 'USDT' | 'USDC'

export type TxDifficulty = 'on_chain' | 'cross_chain'

export type ModalState = 'review' | 'deposit' | 'withdraw' | 'done' | 'error'
export interface SelectedAssetState {
  // Transaction type and difficulty
  txType: TxType
  setTxType: (by: TxType) => void
  txDifficulty: TxDifficulty
  setTxDifficulty: (value: TxDifficulty) => void
  isTxZAP: boolean
  setIsTxZAP: (value: boolean) => void

  // Asset and network information
  depositAsset: ITokenData | null
  setDepositAsset: (by: ITokenData | null) => void
  depositFromNetwork: DepositChainType | null
  setDepositFromNetwork: (by: DepositChainType | null) => void
  depositToNetwork: ChainType | null
  setDepositToNetwork: (by: ChainType | null) => void
  withdrawFromNetwork: ChainType | null
  setWithdrawFromNetwork: (by: ChainType | null) => void
  withdrawToNetwork: ChainType | null
  setWithdrawToNetwork: (by: ChainType | null) => void

  // Vault information
  vault?: Vault
  setVault: (by: Vault) => void
  vaultAddress: Address | undefined
  setVaultAddress: (by: Address | undefined) => void

  // Withdraw Token information
  mtToken: UseGetMTokenInfoReturn | null
  setMToken: (by: UseGetMTokenInfoReturn) => void

  // Input values and amounts
  inputValue: string
  setInputValue: (value: string) => void
  inputValueInUSD: string
  setInputValueInUSD: (value: string) => void
  depositTotalInUSD: string
  setDepositTotalInUSD: (value: string) => void
  depositTotalAmount: string
  setDepositTotalAmount: (value: string) => void
  depositAmount: string
  setDepositAmount: (value: string) => void
  withdrawAmount: string
  setWithdrawAmount: (value: string) => void

  // Modal and UI state
  currentModal: ModalState | null
  setCurrentModal: (by: ModalState | null) => void
  currentStep: number
  setCurrentStep: (by: number) => void
  isTransactionCanBeCollapsed: boolean
  setTransactionCanBeCollapsed: (value: boolean) => void

  // Transaction-related information
  isTransactionFromStore: boolean
  setTransactionFromStore: (value: boolean) => void
  setTransactionData: (transaction: IPendingTransactionData) => void
  transactionHash: string | null
  setTransactionHash: (hash: string | null) => void

  // Additional features
  boostMode: boolean
  setBoostMode: (by: boolean) => void
  arrivalGas: string
  setArrivalGas: (value: string) => void

  // Squid route information
  squidRoute: RouteResponse['route'] | undefined
  setSquidRoute: (route: RouteResponse['route'] | undefined) => void

  // Timer
  timerDuration: number
  setTimerDuration: (duration: number) => void

  // Utility functions
  getFullState: () => Partial<SelectedAssetState>
  resetStore: () => void
}

export const useTxStore = create<SelectedAssetState>()(
  devtools(
    (set) => ({
      inputValue: '',
      setInputValue: (by) => set({ inputValue: by }),
      inputValueInUSD: '',
      setInputValueInUSD: (by) => set({ inputValueInUSD: by }),

      depositTotalInUSD: '',
      setDepositTotalInUSD: (by) => set({ depositTotalInUSD: by }),

      // asset
      depositAsset: null,
      setDepositAsset: (by) => set({ depositAsset: convertBigIntToString(by) }),
      // network
      depositFromNetwork: null,
      setDepositFromNetwork: (by) => set({ depositFromNetwork: by }),
      // representation tokens chain
      depositToNetwork: null,
      setDepositToNetwork: (by) => set({ depositToNetwork: by }),

      withdrawFromNetwork: null,
      setWithdrawFromNetwork: (by) => set({ withdrawFromNetwork: by }),

      withdrawToNetwork: null,
      setWithdrawToNetwork: (by) => set({ withdrawToNetwork: by }),

      vault: undefined,
      setVault: (by) => set({ vault: by }),

      vaultAddress: undefined,
      setVaultAddress: (by) => set({ vaultAddress: by }),

      depositTotalAmount: '',
      setDepositTotalAmount: (by) => set({ depositTotalAmount: by }),

      // mtToken
      mtToken: null,
      setMToken: (by) => set({ mtToken: convertBigIntToString(by) }),
      // tx type
      txType: TX_TYPE.DEPOSIT,
      setTxType: (by) => set({ txType: by, inputValue: '' }),

      // modal
      currentModal: null,
      setCurrentModal: (by) => set({ currentModal: by }),

      // deposit amount
      depositAmount: '',
      setDepositAmount: (by) => set({ depositAmount: by }),

      // withdraw amount
      withdrawAmount: '',
      setWithdrawAmount: (by) => set({ withdrawAmount: by }),

      // boost mode
      boostMode: false,
      setBoostMode: (by) => set({ boostMode: by }),

      // arrival gas
      arrivalGas: '',
      setArrivalGas: (by) => set({ arrivalGas: by }),

      currentStep: 1,
      setCurrentStep: (by) => set({ currentStep: by }),

      isTransactionCanBeCollapsed: false,
      setTransactionCanBeCollapsed: (value) =>
        set({ isTransactionCanBeCollapsed: value }),

      isTransactionFromStore: false,
      setTransactionFromStore: (value) => set({ isTransactionFromStore: value }),

      setTransactionData: (transaction: IPendingTransactionData) =>
        set((state) => ({
          ...state,
          ...transaction,
        })),

      getFullState: (): Partial<SelectedAssetState> => {
        const fullState = useTxStore.getState()
        return Object.fromEntries(
          Object.entries(fullState).filter(([_, value]) => typeof value !== 'function'),
        ) as Partial<SelectedAssetState>
      },

      transactionHash: null,
      setTransactionHash: (hash) => set({ transactionHash: hash }),

      squidRoute: undefined,
      setSquidRoute: (route) => set({ squidRoute: route }),

      txDifficulty: 'on_chain',
      setTxDifficulty: (value) => set({ txDifficulty: value }),

      isTxZAP: false,
      setIsTxZAP: (value) => set({ isTxZAP: value }),

      timerDuration: 120, // По умолчанию 2 минуты
      setTimerDuration: (duration) => set({ timerDuration: duration }),

      resetStore: () =>
        set({
          inputValue: '',
          inputValueInUSD: '',
          depositTotalInUSD: '',
          depositTotalAmount: '',
          depositAsset: null,
          depositFromNetwork: null,
          withdrawFromNetwork: null,
          withdrawToNetwork: null,
          mtToken: null,
          txType: TX_TYPE.DEPOSIT,
          currentModal: null,
          depositAmount: '',
          withdrawAmount: '',
          depositToNetwork: null,
          boostMode: false,
          arrivalGas: '',
          currentStep: 1,
          isTransactionCanBeCollapsed: false,
          isTransactionFromStore: false,
          transactionHash: null,
          txDifficulty: 'on_chain',
          squidRoute: undefined,
          isTxZAP: false,
        }),
    }),
    {
      name: 'TxStore',
      enabled: true,
    },
  ),
)

export const selectFullState = (state: SelectedAssetState) => state
