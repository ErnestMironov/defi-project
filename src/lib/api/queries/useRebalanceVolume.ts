import { apiClient } from '@api/maat-finance/api-client'
import type { RebalanceVolume } from '@api/maat-finance/types'
import { useQuery } from '@tanstack/react-query'

const getRebalanceVolume = () => {
  return apiClient.get<RebalanceVolume>('/stats/rebalance-volume')
}

export const useRebalanceVolume = () => {
  return useQuery({
    queryKey: ['rebalanceVolume'],
    queryFn: async () => {
      const { data } = await getRebalanceVolume()

      return data
    },
  })
}
