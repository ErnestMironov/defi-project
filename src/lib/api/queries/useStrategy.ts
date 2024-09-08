import { apiClient } from '@api/maat-finance/api-client'
import type { Strategy } from '@api/maat-finance/types'
import { useQuery } from '@tanstack/react-query'

const getStrategy = (strategy_id: string) => {
  return apiClient.get<Strategy>(`/overview/strategies/id/${strategy_id}`, {
    params: {
      strategy_info: true,
    },
  })
}

export const useStrategy = (strategy_id?: string) => {
  return useQuery({
    queryKey: ['strategies', strategy_id],
    queryFn: async () => {
      const { data } = await getStrategy(strategy_id ?? '')
      return data
    },
    enabled: !!strategy_id,
  })
}
