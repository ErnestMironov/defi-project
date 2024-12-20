import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import type { ChainType, DepositChainType } from '@constants/chains'
import type { TxType } from '@constants/txTypes'
import { TX_TYPE } from '@constants/txTypes'
import type { LiFiStep } from '@lifi/sdk'
import { convertBigIntToString } from '@utils/formatValue'
import type { Address } from 'viem'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import type { STEP_STATUS } from '../deposit/interfaces'
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
  vaultDepositTokenAddress: Address | undefined
  setVaultDepositTokenAddress: (by: Address | undefined) => void

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
  collapseTxInfo: boolean
  setCollapseTxInfo: (value: boolean) => void

  // Transaction-related information
  isTransactionFromStore: boolean
  setTransactionFromStore: (value: boolean) => void
  setTransactionData: (transaction: IPendingTransactionData) => void
  transactionHash: string | null
  setTransactionHash: (hash: string | null) => void

  // Additional features
  arrivalGas: string
  setArrivalGas: (value: string) => void

  // LiFi route information
  swapRoute: LiFiStep | undefined
  setSwapRoute: (route: LiFiStep | undefined) => void

  // Timer and animation
  timerDuration: number
  setTimerDuration: (duration: number) => void
  animationStatus: 'idle' | 'playing' | 'error'
  setAnimationStatus: (status: 'idle' | 'playing' | 'error') => void

  // Error
  intermediateError: string | null
  setIntermediateError: (error: string | null) => void
  transactionError: string | null
  setTransactionError: (error: string | null) => void
  inputError: string | null
  setInputError: (error: string | null) => void

  // Easter egg
  brakeBalance: boolean
  setBrakeBalance: (value: boolean) => void
  scalesClickCount: number
  setScalesClickCount: (value: number) => void

  // Utility functions
  getFullState: () => Partial<SelectedAssetState>
  resetStore: () => void

  // Transaction statuses
  networkSwitchStatus: STEP_STATUS
  approvalStatus: STEP_STATUS
  transactionStatus: STEP_STATUS

  // Actions
  setNetworkSwitchStatus: (status: STEP_STATUS) => void
  setApprovalStatus: (status: STEP_STATUS) => void
  setTransactionStatus: (status: STEP_STATUS) => void

  withdrawToAnotherChain: boolean
  setWithdrawToAnotherChain: (value: boolean) => void
}

export const useTxStore = create<SelectedAssetState>()(
  devtools(
    (set) => ({
      // Transaction type and difficulty
      txType: TX_TYPE.DEPOSIT,
      setTxType: (by) => set({ txType: by, inputValue: '' }),
      txDifficulty: 'on_chain',
      setTxDifficulty: (value) => set({ txDifficulty: value }),
      isTxZAP: false,
      setIsTxZAP: (value) => set({ isTxZAP: value }),

      // Asset and network information
      depositAsset: null,
      setDepositAsset: (by) => set({ depositAsset: convertBigIntToString(by) }),
      depositFromNetwork: null,
      setDepositFromNetwork: (by) => set({ depositFromNetwork: by }),
      depositToNetwork: null,
      setDepositToNetwork: (by) => set({ depositToNetwork: by }),
      withdrawFromNetwork: null,
      setWithdrawFromNetwork: (by) => set({ withdrawFromNetwork: by }),
      withdrawToNetwork: null,
      setWithdrawToNetwork: (by) => set({ withdrawToNetwork: by }),

      // Vault information
      vault: undefined,
      setVault: (by) => set({ vault: by }),
      vaultAddress: undefined,
      setVaultAddress: (by) => set({ vaultAddress: by }),
      vaultDepositTokenAddress: undefined,
      setVaultDepositTokenAddress: (by) => set({ vaultDepositTokenAddress: by }),

      // Withdraw Token information
      mtToken: null,
      setMToken: (by) => set({ mtToken: convertBigIntToString(by) }),

      // Input values and amounts
      inputValue: '',
      setInputValue: (by) => set({ inputValue: by }),
      inputValueInUSD: '',
      setInputValueInUSD: (by) => set({ inputValueInUSD: by }),
      depositTotalInUSD: '',
      setDepositTotalInUSD: (by) => set({ depositTotalInUSD: by }),
      depositTotalAmount: '',
      setDepositTotalAmount: (by) => set({ depositTotalAmount: by }),
      depositAmount: '',
      setDepositAmount: (by) => set({ depositAmount: by }),
      withdrawAmount: '',
      setWithdrawAmount: (by) => set({ withdrawAmount: by }),

      // Modal and UI state
      currentModal: null,
      setCurrentModal: (by) => set({ currentModal: by }),
      currentStep: 1,
      setCurrentStep: (by) => set({ currentStep: by }),
      isTransactionCanBeCollapsed: false,
      setTransactionCanBeCollapsed: (value) =>
        set({ isTransactionCanBeCollapsed: value }),
      collapseTxInfo: false,
      setCollapseTxInfo: (value) => set({ collapseTxInfo: value }),

      // Transaction-related information
      isTransactionFromStore: false,
      setTransactionFromStore: (value) => set({ isTransactionFromStore: value }),
      setTransactionData: (transaction: IPendingTransactionData) =>
        set((state) => ({
          ...state,
          ...transaction,
        })),
      transactionHash: null,
      setTransactionHash: (hash) => set({ transactionHash: hash }),

      // Additional features
      arrivalGas: '',
      setArrivalGas: (by) => set({ arrivalGas: by }),

      // LiFi route information
      swapRoute: undefined,
      setSwapRoute: (route) => set({ swapRoute: route }),

      // Timer and animation
      timerDuration: 120,
      setTimerDuration: (duration) => set({ timerDuration: duration }),
      animationStatus: 'idle',
      setAnimationStatus: (status) => set({ animationStatus: status }),

      // Error handling
      intermediateError: null,
      setIntermediateError: (by) => set({ intermediateError: by }),
      transactionError: null,
      setTransactionError: (by) => set({ transactionError: by }),
      inputError: null,
      setInputError: (error) => set({ inputError: error }),

      // Easter egg
      brakeBalance: false,
      setBrakeBalance: (value) => set({ brakeBalance: value }),
      scalesClickCount: 0,
      setScalesClickCount: (value) => set({ scalesClickCount: value }),

      // Transaction statuses
      networkSwitchStatus: 'idle',
      approvalStatus: 'idle',
      transactionStatus: 'idle',
      setNetworkSwitchStatus: (status) => set({ networkSwitchStatus: status }),
      setApprovalStatus: (status) => set({ approvalStatus: status }),
      setTransactionStatus: (status) => set({ transactionStatus: status }),

      // Additional settings
      withdrawToAnotherChain: false,
      setWithdrawToAnotherChain: (value) => set({ withdrawToAnotherChain: value }),

      // Utility functions
      getFullState: (): Partial<SelectedAssetState> => {
        const fullState = useTxStore.getState()
        return Object.fromEntries(
          Object.entries(fullState).filter(([_, value]) => typeof value !== 'function'),
        ) as Partial<SelectedAssetState>
      },

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
          collapseTxInfo: false,
          currentModal: null,
          depositAmount: '',
          withdrawAmount: '',
          depositToNetwork: null,
          arrivalGas: '',
          currentStep: 1,
          isTransactionCanBeCollapsed: false,
          isTransactionFromStore: false,
          transactionHash: null,
          txDifficulty: 'on_chain',
          swapRoute: undefined,
          animationStatus: 'idle',
          isTxZAP: false,
          intermediateError: null,
          transactionError: null,
          withdrawToAnotherChain: false,
        }),
    }),
    {
      name: 'TxStore',
      enabled: true,
    },
  ),
)

export const selectFullState = (state: SelectedAssetState) => state
