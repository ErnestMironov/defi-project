import { usePortfolioAssets } from '@api/maat-finance/usePortfolioAssets'
import { usePortfolioYield } from '@api/maat-finance/usePortfolioYield'
import { useEffect } from 'react'
import type { Address } from 'viem'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useActiveAccount } from '@hooks/useActiveAccount'

// Define the store state type
interface PortfolioState {
  assets: Record<string, number>
  yield: Record<string, number>
  setAssets: (assets: Record<string, number>) => void
  setYield: (yieldData: Record<string, number>) => void
}

// Create the store
const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      assets: {},
      yield: {},
      setAssets: (assets) => set({ assets }),
      setYield: (yieldData) => set({ yield: yieldData }),
    }),
    {
      name: 'portfolio-storage',
    },
  ),
)

// Create a hook to fetch and update the store
export const usePortfolioData = () => {
  const { address } = useActiveAccount()
  const { assets, yield: yieldData, setAssets, setYield } = usePortfolioStore()

  const { data: assetsData, isLoading: isLoadingAssets } = usePortfolioAssets(
    address as Address,
  )
  const { data: portfolioYieldData, isLoading: isLoadingYield } = usePortfolioYield(
    address as Address,
  )

  useEffect(() => {
    if (assetsData && typeof assetsData === 'object') {
      setAssets(assetsData as Record<string, number>)
    }
  }, [assetsData, setAssets])

  useEffect(() => {
    if (portfolioYieldData) {
      setYield(portfolioYieldData)
    }
  }, [portfolioYieldData, setYield])

  return {
    assets,
    yield: yieldData,
    isLoadingAssets: isLoadingAssets && !assets,
    isLoadingYield: isLoadingYield && !yieldData,
  }
}
