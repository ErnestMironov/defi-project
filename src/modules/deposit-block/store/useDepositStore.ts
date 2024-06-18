import { create } from 'zustand'

export type Asset = {
  name: string
  symbol: string
  network: string
}

interface SelectedAssetState {
  // TODO: Define the state
  asset: Asset | null
  setAsset: (by: Asset | null) => void
  network: string | null
  setNetwork: (by: string | null) => void
  vault: string
  setVault: (by: string) => void
}

export const useDepositStore = create<SelectedAssetState>()((set) => ({
  asset: null,
  setAsset: (by) => set({ asset: by }),
  network: null,
  setNetwork: (by) => set({ network: by }),
  vault: 'USDT',
  setVault: (by) => set({ vault: by }),
}))
