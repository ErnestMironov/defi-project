import { useQuery } from '@tanstack/react-query'
import type { Address } from 'viem'

import { apiClient } from '../api-client'
import type { UserBadgesResponse } from '../types'

export const getUserBadges = async (address: Address) => {
  const { data } = await apiClient.get<UserBadgesResponse>(
    `rewards/user/badges/info?address=${address}`,
  )
  return data
}

export const useGetUserBadges = (address?: Address) => {
  return useQuery({
    queryKey: ['user-badges', address],
    queryFn: () => getUserBadges(address as Address),
    enabled: !!address,
    retry: false,
  })
}
