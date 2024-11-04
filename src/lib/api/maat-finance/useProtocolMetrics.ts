import { apiClient } from '@api/maat-finance/api-client'
import { useQuery } from '@tanstack/react-query'
import qs from 'qs'

type CurrencyType = 'maat' | 'USDT' | 'USDC'

type ProtocolMetricsParameters = {
  chain?: string[]
  protocol?: string[]
  from_timestamp?: number
  token?: ('USDT' | 'USDC')[]
  metrics_type?: ('apy' | 'tvl')[]
}

type ProtocolMetrics = {
  history: {
    [currency in CurrencyType]: {
      apy: number
      tvl: number
      timestamps: {
        [timestamp: string]: {
          apy: number
          tvl: number
          chain: string
          protocol: string
          token: string
          token_stats: null
          strategy_id: string
        }
      }
    }
  }
}

export const getProtocolMetrics = (parameters: ProtocolMetricsParameters) => {
  return apiClient.get<ProtocolMetrics>('analytics/stats/protocol/metrics', {
    params: parameters,
    paramsSerializer: (parameters_) => {
      return qs.stringify(parameters_, { arrayFormat: 'repeat' })
    },
  })
}

export const useProtocolMetrics = (parameters: ProtocolMetricsParameters) => {
  return useQuery({
    queryKey: ['protocolMetrics', parameters],
    queryFn: async () => {
      const { data } = await getProtocolMetrics(parameters)

      return data
    },
  })
}
