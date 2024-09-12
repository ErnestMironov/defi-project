import { apiClient } from '@api/maat-finance/api-client'
import type { VaultType } from '@api/maat-finance/types'
import { useQuery } from '@tanstack/react-query'

const getVaults = () => {
  return apiClient.get<VaultType[]>('/stats/vaults')
}

export const useVaults = () => {
  return useQuery({
    queryKey: ['vaults'],
    queryFn: async () => {
      const { data } = await getVaults()

      return data
    },
  })
}
