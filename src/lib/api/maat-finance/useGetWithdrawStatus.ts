import { useQuery } from '@tanstack/react-query'
import type { Address } from 'viem'

import { apiClient } from './api-client'
import type { ApiResponse, WithdrawStatusResponse } from './types'

export const fetchWithdrawStatus = async (
  txHash: Address,
): Promise<ApiResponse<WithdrawStatusResponse>> => {
  const response = await apiClient.get<WithdrawStatusResponse>('/actions/status', {
    params: { txHash },
  })
  return { data: response.data, status: response.status }
}

export const useGetWithdrawStatus = (txHash: Address) => {
  return useQuery<ApiResponse<WithdrawStatusResponse>, Error>({
    queryKey: ['withdrawStatus', txHash],
    queryFn: () => fetchWithdrawStatus(txHash),
  })
}
