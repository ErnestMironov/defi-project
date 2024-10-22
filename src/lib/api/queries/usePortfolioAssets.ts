import { apiClient } from '@api/maat-finance/api-client'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { Address } from 'viem'

type PortfolioAssets = {
  [key in 'USDC' | 'USDT']: number
}

const getPortfolioAssets = (address: Address) => {
  return apiClient.get<PortfolioAssets>(`/portfolio/assets/${address}`)
}

export const usePortfolioAssets = (address: Address, options?: UseQueryOptions) => {
  return useQuery({
    ...options,
    queryKey: ['PortfolioAssets', address],
    queryFn: async () => {
      const { data } = await getPortfolioAssets(address)
      return data
    },
    enabled: !!address,
  })
}
