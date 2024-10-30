import { apiClient } from '@api/maat-finance/api-client'
import type { SortDirection } from '@api/maat-finance/types'
import { useQuery } from '@tanstack/react-query'
import qs from 'qs'

type StrategiesMetricsParameters = {
  strategy_id?: string[]
  from_timestamp?: string
  to_timestamp?: string
  sort?: 'apy' | 'tvl' | 'protocol' | 'chain' | 'token'
  order_by?: SortDirection
  exclude_metrics?: string[]
}

export type StrategyData = {
  strategy_id: string
  token: string
  chain: null
  apy: number | null
  tvl: number | null
  tokens_stats: null | {
    tvl: {
      [key: string]: number
    }
    apy: {
      [key: string]: number
    }
  }
}

type TimestampData = {
  [strategy_id: string]: StrategyData
}

type DataStructure = {
  [timestamp: string]: TimestampData
}

const getStrategiesMetrics = (parameters: StrategiesMetricsParameters) => {
  return apiClient.get<DataStructure>('analytics/stats/strategies/metrics', {
    params: parameters,
    paramsSerializer: (parameters_) => {
      return qs.stringify(parameters_, { arrayFormat: 'repeat' })
    },
  })
}

export const useStrategiesMetrics = (
  parameters: StrategiesMetricsParameters,
  enabled = true,
) => {
  return useQuery({
    queryKey: ['strategies', parameters],
    queryFn: async () => {
      const { data } = await getStrategiesMetrics(parameters)
      return data
    },
    enabled: enabled && !!parameters.strategy_id?.length,
  })
}
