import type { ITokenData } from '@api/tokens-balance/api'
import type { TxType } from '@constants/txTypes'
import { TX_TYPE } from '@constants/txTypes'
import { Chains } from '@covalenthq/client-sdk'
import { create } from 'zustand'

type ModalState = 'review' | 'deposit' | 'withdraw' | 'done' | 'error'
type Vault = 'USDT' | 'USDC'
interface SelectedAssetState {
  // TODO: Define the state
  depositAsset: ITokenData | null
  setDepositAsset: (by: ITokenData | null) => void

  depositNetwork: Chains | null
  setDepositNetwork: (by: Chains | null) => void

  withdrawNetwork: Chains | null
  setWithdrawNetwork: (by: Chains | null) => void

  vault: Vault
  setVault: (by: Vault) => void

  txType: TxType
  setTxType: (by: TxType) => void

  inputValue: string
  setInputValue: (value: string) => void

  currentModal: ModalState | null
  setCurrentModal: (by: ModalState | null) => void
}

export const useTxStore = create<SelectedAssetState>()((set) => ({
  inputValue: '',
  setInputValue: (by) => set({ inputValue: by }),
  // asset
  depositAsset: null,
  setDepositAsset: (by) => set({ depositAsset: by }),
  // network
  depositNetwork: null,
  setDepositNetwork: (by) => set({ depositNetwork: by }),
  withdrawNetwork: Chains.ARBITRUM_MAINNET,
  setWithdrawNetwork: (by) => set({ withdrawNetwork: by }),
  // vault
  vault: 'USDT',
  setVault: (by) => set({ vault: by }),
  // tx type
  txType: TX_TYPE.DEPOSIT,
  setTxType: (by) => set({ txType: by, inputValue: '' }),

  // modal
  currentModal: null,
  setCurrentModal: (by) => set({ currentModal: by }),
}))
