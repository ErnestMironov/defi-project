import { getEvents } from '@api/maat-finance/useEvents'
import { getProtocolMetrics } from '@api/maat-finance/useProtocolMetrics'
import { getRebalanceVolume } from '@api/maat-finance/useRebalanceVolume'
import { getStrategies } from '@api/maat-finance/useStrategies'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQueries } from '@tanstack/react-query'

export const usePrefetchAnalyticsQueries = () => {
  const queries: UseQueryOptions[] = [
    {
      queryKey: ['protocolMetrics'],
      queryFn: () => getProtocolMetrics({}),
    },
    {
      queryKey: ['rebalanceVolume'],
      queryFn: () => getRebalanceVolume(),
    },
    {
      queryKey: ['strategies', { page: 1, size: 10, sort: 'apy', order_by: 'desc' }],
      queryFn: () =>
        getStrategies({
          page: 1,
          size: 10,
          sort: 'apy',
          order_by: 'desc',
        }),
    },
    {
      queryKey: [
        'events',
        {
          size: 10,
          page: 1,
          limit: 100,
          sort: 'creation_time',
          order_by: 'desc',
        },
      ],
      queryFn: () =>
        getEvents({
          size: 10,
          page: 1,
          limit: 100,
          sort: 'creation_time',
          order_by: 'desc',
        }),
    },
  ]

  useQueries({ queries })
}
