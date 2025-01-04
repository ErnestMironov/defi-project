import { useQuery } from '@tanstack/react-query'

import { apiClient } from './api-client'
import type { CurrentStakersCountResponse } from './types'

const getCurrentStakersCount = async () => {
  const response = await apiClient.get<CurrentStakersCountResponse>(
    'analytics/users/unique-users',
  )
  return response.data
}

export const useCurrentStakersCount = () => {
  return useQuery({
    queryKey: ['current-stakers-count'],
    queryFn: () => getCurrentStakersCount(),
  })
}
