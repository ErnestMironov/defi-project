import { useQuery } from '@tanstack/react-query'
import type { Address } from 'viem'

import { apiClient } from './api-client'
import type { UserPointsResponse } from './types'

async function getUserPoints(address: Address) {
  const response = await apiClient.get<UserPointsResponse>(`rewards/info/user/${address}`)
  return response.data
}

export const useGetUserPoints = (address: Address) => {
  return useQuery({
    queryKey: ['user-points', address],
    queryFn: () => getUserPoints(address),
  })
}
