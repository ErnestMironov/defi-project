import { apiClient } from '@api/maat-finance/api-client'
import type { MaatStat } from '@api/maat-finance/types'
import { useQuery } from '@tanstack/react-query'

type MaatStatParameters = {
  from_timestamp?: number
}

const getMaatStats = (parameters: MaatStatParameters) => {
  return apiClient.get<MaatStat>('/getMaatStats', {
    params: parameters,
  })
}

export const useMaatStats = (parameters: MaatStatParameters) => {
  return useQuery({
    queryKey: ['maatStat', parameters],
    queryFn: async () => {
      const { data } = await getMaatStats(parameters)
      return data
    },
  })
}
