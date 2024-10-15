import { create } from 'zustand'

interface useHideHeaderStoreState {
  hidden: boolean
  setHidden: (by: boolean) => void
}

export const useHideHeaderStore = create<useHideHeaderStoreState>()((set) => ({
  hidden: false,
  setHidden: (hideHeader) => set({ hidden: hideHeader }),
}))
