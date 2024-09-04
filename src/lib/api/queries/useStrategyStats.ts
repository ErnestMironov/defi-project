import { apiClient } from '@api/maat-finance/api-client'
import type { PaginationResponse, Strategy } from '@api/maat-finance/types'
import { useQuery } from '@tanstack/react-query'

type StrategyStatsParameters = {
  from_timestamp?: string
  to_timestamp?: string
}

const getStrategyStats = (parameters: StrategyStatsParameters) => {
  return apiClient.post<PaginationResponse<Strategy>>('/overview/strategies/metrics', {
    params: parameters,
  })
}

export const useStrategyStats = (parameters: StrategyStatsParameters) => {
  return useQuery({
    queryKey: ['strategyStats', parameters],
    queryFn: async () => {
      const { data } = await getStrategyStats(parameters)
      return data
    },
  })
}
