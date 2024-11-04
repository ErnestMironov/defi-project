import { apiClient } from '@api/maat-finance/api-client'
import type { Event } from '@api/maat-finance/types'
import { useQuery } from '@tanstack/react-query'

export type LastRebalancesType = Record<string, Event[]>

export const getLastRebalances = () => {
  return apiClient.get<LastRebalancesType>('analytics/actions/last/rebalances')
}

export const useLastRebalances = () => {
  return useQuery({
    queryKey: ['last-rebalances'],
    queryFn: async () => {
      const { data } = await getLastRebalances()

      return data
    },
  })
}
