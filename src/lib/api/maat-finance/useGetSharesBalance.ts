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
      const response = await apiClient.get<SharesBalanceResponse>(
        'analytics/user/balances',
        {
          params: { address },
        },
      )
      const parsedData: ParsedSharesBalanceResponse = {
        balances: response.data.balances.flatMap(({ balances }) =>
          balances.map((balance) => ({ ...balance, ...balance.token })),
        ),
      }
      return { data: parsedData, status: response.status }
    },
  })
}
