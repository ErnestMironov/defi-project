import { apiClient } from '@api/maat-finance/api-client'
import { useQuery } from '@tanstack/react-query'
import qs from 'qs'

type CurrencyType = 'maat' | 'USDT' | 'USDC'

type ProtocolMetricsParameters = {
  chains?: string[]
  protocols?: string[]
  from_timestamp?: number
  tokens?: ('USDT' | 'USDC')[]
  metrics_type?: ('apy' | 'tvl')[]
}

type ProtocolMetrics = {
  [currency in CurrencyType]: {
    apy: number
    tvl: number
    history: {
      [timestamp: string]: {
        apy: number
        tvl: number
      }
    }
  }
}

export const getProtocolMetrics = (parameters: ProtocolMetricsParameters) => {
  return apiClient.get<ProtocolMetrics>('/stats/protocol/metrics', {
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
