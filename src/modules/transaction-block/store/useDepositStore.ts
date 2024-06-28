import type { ITokenData } from '@api/tokens-balance/api'
import type { TxType } from '@constants/txTypes'
import { TX_TYPE } from '@constants/txTypes'
import { Chains } from '@covalenthq/client-sdk'
import { create } from 'zustand'

type TxStatus = 'pending' | 'loading' | 'success' | 'error'

interface SelectedAssetState {
  // TODO: Define the state
  depositAsset: ITokenData | null
  setDepositAsset: (by: ITokenData | null) => void
  depositNetwork: Chains | null
  setDepositNetwork: (by: Chains | null) => void
  withdrawNetwork: Chains
  setWithdrawNetwork: (by: Chains) => void
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
  withdrawNetwork: Chains.OPTIMISM_MAINNET,
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
