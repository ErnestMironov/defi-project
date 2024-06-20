import type { NetworkType } from '@constants/networks'
import type { TxType } from '@constants/txTypes'
import { TX_TYPE } from '@constants/txTypes'
import { create } from 'zustand'

export type Asset = {
  name: string
  symbol: string
  network: string
}

type TxStatus = 'pending' | 'loading' | 'success' | 'error'

interface SelectedAssetState {
  // TODO: Define the state
  depositAsset: Asset | null
  setDepositAsset: (by: Asset | null) => void
  depositNetwork: NetworkType | null
  setDepositNetwork: (by: NetworkType | null) => void
  withdrawNetwork: NetworkType
  setWithdrawNetwork: (by: NetworkType) => void
  vault: string
  setVault: (by: string) => void
  status: TxStatus
  setStatus: (by: TxStatus) => void
  txType: TxType
  setTxType: (by: TxType) => void
}

export const useDepositStore = create<SelectedAssetState>()((set) => ({
  // asset
  depositAsset: null,
  setDepositAsset: (by) => set({ depositAsset: by }),
  // network
  depositNetwork: null,
  setDepositNetwork: (by) => set({ depositNetwork: by }),
  withdrawNetwork: 'Optimism',
  setWithdrawNetwork: (by) => set({ withdrawNetwork: by }),
  // vault
  vault: 'USDT',
  setVault: (by) => set({ vault: by }),
  // tx status
  status: 'pending',
  setStatus: (by) => set({ status: by }),
  // tx type
  txType: TX_TYPE.DEPOSIT,
  setTxType: (by) => set({ txType: by }),
}))
