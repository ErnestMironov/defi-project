import { getEvents } from '@api/queries/useEvents'
import { getProtocolMetrics } from '@api/queries/useProtocolMetrics'
import { getRebalanceVolume } from '@api/queries/useRebalanceVolume'
import { getStrategies } from '@api/queries/useStrategies'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQueries } from '@tanstack/react-query'

export const usePrefetchAnalyticsQueries = () => {
  const queries: UseQueryOptions[] = [
    {
      queryKey: ['protocolMetrics'],
      queryFn: () => getProtocolMetrics(),
    },
    {
      queryKey: ['rebalanceVolume'],
      queryFn: () => getRebalanceVolume(),
    },
    {
      queryKey: ['strategies'],
      queryFn: () => getStrategies({}),
    },
    {
      queryKey: ['events'],
      queryFn: () => getEvents({}),
    },
  ]

  useQueries({ queries })
}
