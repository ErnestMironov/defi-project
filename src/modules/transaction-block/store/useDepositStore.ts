import type { ITokenData } from '@api/tokens-balance/api'
import type { ChainType } from '@constants/chains'
import { CHAINS } from '@constants/chains'
import type { TxType } from '@constants/txTypes'
import { TX_TYPE } from '@constants/txTypes'
import { create } from 'zustand'

import type { UserMTokenInfo } from '../interface'

type Vault = 'USDT' | 'USDC'

type ModalState = 'review' | 'deposit' | 'withdraw' | 'done' | 'error'
interface SelectedAssetState {
  // TODO: Define the state
  depositAsset: ITokenData | null
  setDepositAsset: (by: ITokenData | null) => void

  depositNetwork: ChainType | null
  setDepositNetwork: (by: ChainType | null) => void

  withdrawNetwork: ChainType | null
  setWithdrawNetwork: (by: ChainType | null) => void

  vault: Vault
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
}

export const useTxStore = create<SelectedAssetState>()((set) => ({
  inputValue: '',
  setInputValue: (by) => set({ inputValue: by }),
  inputValueInUSD: '0',
  setInputValueInUSD: (by) => set({ inputValueInUSD: by }),
  // asset
  depositAsset: null,
  setDepositAsset: (by) => set({ depositAsset: by }),
  // network
  depositNetwork: null,
  setDepositNetwork: (by) => set({ depositNetwork: by }),
  withdrawNetwork: CHAINS[0],
  setWithdrawNetwork: (by) => set({ withdrawNetwork: by }),
  // vault
  vault: 'USDT',
  setVault: (by) => set({ vault: by }),
  // mtToken
  mtToken: null,
  setMToken: (by) => set({ mtToken: by }),
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
}))
