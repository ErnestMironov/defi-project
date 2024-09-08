import { apiClient } from '@api/maat-finance/api-client'
import { useQuery } from '@tanstack/react-query'

type CurrencyType = 'maat' | 'USDT' | 'USDC'

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

const getProtocolMetrics = () => {
  return apiClient.get<ProtocolMetrics>('/stats/protocol/metrics')
}

export const useProtocolMetrics = () => {
  return useQuery({
    queryKey: ['protocolMetrics'],
    queryFn: async () => {
      const { data } = await getProtocolMetrics()

      return data
    },
  })
}
