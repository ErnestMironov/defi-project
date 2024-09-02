import { useQuery } from '@tanstack/react-query'
import type { Address } from 'viem'

import { apiClient } from './api-client'
import type {
  ApiResponse,
  ParsedSharesBalanceResponse,
  SharesBalanceResponse,
} from './types'

export const useGetSharesBalance = (address?: Address) => {
  return useQuery<ApiResponse<ParsedSharesBalanceResponse>>({
    queryKey: ['sharesBalance', address],
    queryFn: async () => {
      const response = await apiClient.get<SharesBalanceResponse>('/getSharesBalance', {
        params: { address },
      })
      const parsedData: ParsedSharesBalanceResponse = {
        balances: response.data.balances.flatMap(({ chain, balances }) =>
          balances.map((balance) => ({ chain, ...balance })),
        ),
      }
      return { data: parsedData, status: response.status }
    },
  })
}
