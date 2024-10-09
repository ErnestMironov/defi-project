import { apiClient } from '@api/maat-finance/api-client'
import { useQuery } from '@tanstack/react-query'
import type { Address } from 'viem'

type PortfolioAssets = {
  [key in 'USDC' | 'USDT']: number
}

const getPortfolioAssets = (address: Address) => {
  return apiClient.get<PortfolioAssets>(`/portfolio/assets/${address}`)
}

export const usePortfolioAssets = (address: Address) => {
  return useQuery({
    queryKey: ['PortfolioAssets', address],
    queryFn: async () => {
      const { data } = await getPortfolioAssets(address)
      return data
    },
    enabled: !!address,
  })
}
