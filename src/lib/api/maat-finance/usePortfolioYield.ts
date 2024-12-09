import { apiClient } from '@api/maat-finance/api-client'
import { useQuery } from '@tanstack/react-query'
import type { Address } from 'viem'

type PortfolioYield = {
  [key in 'USDC' | 'USDT']: number
}

const getPortfolioYield = (address: Address) => {
  return apiClient.get<PortfolioYield>(`analytics/portfolio/assets/${address}`)
}

export const usePortfolioYield = (address: Address) => {
  return useQuery({
    queryKey: ['PortfolioYield', address],
    queryFn: async () => {
      const { data } = await getPortfolioYield(address)
      return data
    },
    enabled: !!address,
  })
}
