import { useQuery } from '@tanstack/react-query'
import type { Address } from 'viem'

import { apiClient } from './api-client'
import type { TxInfoResponse } from './types'

export const useGetTransactionInfo = (tx_hash: Address) => {
  return useQuery<TxInfoResponse>({
    queryKey: ['transactionInfo', tx_hash],
    queryFn: async () => {
      const response = await apiClient.get<TxInfoResponse>('/actions/related', {
        params: { tx_hash },
      })

      return response.data
    },
  })
}
