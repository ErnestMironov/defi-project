import { useQuery } from '@tanstack/react-query'

import { apiClient } from './api-client'
import type { ApiResponse, WithdrawChainsResponse } from './types'

export const useGetWithdrawChains = () => {
  return useQuery<ApiResponse<WithdrawChainsResponse>>({
    queryKey: ['withdrawChains'],
    queryFn: async () => {
      const response = await apiClient.get<WithdrawChainsResponse>(
        '/user/chain-ids-to-withdraw',
      )

      return { data: response.data, status: response.status }
    },
  })
}
