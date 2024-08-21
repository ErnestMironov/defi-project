import type { ITokenData } from '@api/tokens-balance/api'
import type { ChainType } from '@constants/chains'
import { CHAINS } from '@constants/chains'
import type { TxType } from '@constants/txTypes'
import { TX_TYPE } from '@constants/txTypes'
import { convertBigIntToString } from '@utils/formatValue'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import type { UserMTokenInfo } from '../interface'
import type { IPendingTransactionData } from './usePendingTransactionsStore'

export type Vault = 'USDT' | 'USDC'

export type ModalState = 'review' | 'deposit' | 'withdraw' | 'done' | 'error'
interface SelectedAssetState {
  depositAsset: ITokenData | null
  setDepositAsset: (by: ITokenData | null) => void

  depositNetwork: ChainType | null
  setDepositNetwork: (by: ChainType | null) => void

  withdrawNetwork: ChainType | null
  setWithdrawNetwork: (by: ChainType | null) => void

  vault?: Vault
  setVault: (by: Vault) => void

  mtToken: UserMTokenInfo | null
  setMToken: (by: UserMTokenInfo) => void

  txType: TxType
  setTxType: (by: TxType) => void

  inputValue: string
  setInputValue: (value: string) => void

  inputValueInUSD: string
  setInputValueInUSD: (value: string) => void

  currentModal: ModalState | null
  setCurrentModal: (by: ModalState | null) => void

  depositAmount: string
  setDepositAmount: (value: string) => void

  withdrawAmount: string
  setWithdrawAmount: (value: string) => void

  representationTokensChain: ChainType | null
  setRepresentationTokensChain: (by: ChainType | null) => void

  boostMode: boolean
  setBoostMode: (by: boolean) => void

  arrivalGas: string
  setArrivalGas: (value: string) => void

  currentStep: number
  setCurrentStep: (by: number) => void

  isTransactionCanBeCollapsed: boolean
  setTransactionCanBeCollapsed: (value: boolean) => void

  isTransactionFromStore: boolean
  setTransactionFromStore: (value: boolean) => void

  setTransactionData: (transaction: IPendingTransactionData) => void

  getFullState: () => Partial<SelectedAssetState>

  transactionHash: string | null
  setTransactionHash: (hash: string | null) => void

  txDifficulty: 'simple' | 'withSwap'
  setTxDifficulty: (value: 'simple' | 'withSwap') => void

  resetStore: () => void
}

export const useTxStore = create<SelectedAssetState>()(
  devtools(
    (set) => ({
      inputValue: '',
      setInputValue: (by) => set({ inputValue: by }),
      inputValueInUSD: '',
      setInputValueInUSD: (by) => set({ inputValueInUSD: by }),
      // asset
      depositAsset: null,
      setDepositAsset: (by) => set({ depositAsset: convertBigIntToString(by) }),
      // network
      depositNetwork: null,
      setDepositNetwork: (by) => set({ depositNetwork: by }),
      withdrawNetwork: CHAINS[0],
      setWithdrawNetwork: (by) => set({ withdrawNetwork: by }),
      // vault
      vault: undefined,
      setVault: (by) => set({ vault: by }),
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

      // representation tokens chain
      representationTokensChain: null,
      setRepresentationTokensChain: (by) => set({ representationTokensChain: by }),

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

      txDifficulty: 'simple',
      setTxDifficulty: (value) => set({ txDifficulty: value }),

      resetStore: () =>
        set({
          inputValue: '',
          inputValueInUSD: '',
          depositAsset: null,
          depositNetwork: null,
          withdrawNetwork: CHAINS[0],
          mtToken: null,
          txType: TX_TYPE.DEPOSIT,
          currentModal: null,
          depositAmount: '',
          withdrawAmount: '',
          representationTokensChain: null,
          boostMode: false,
          arrivalGas: '',
          currentStep: 1,
          isTransactionCanBeCollapsed: false,
          isTransactionFromStore: false,
          transactionHash: null,
          txDifficulty: 'simple',
        }),
    }),
    {
      name: 'TxStore',
      enabled: true,
    },
  ),
)

export const selectFullState = (state: SelectedAssetState) => state
