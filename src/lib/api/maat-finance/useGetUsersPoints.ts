import { useQuery } from '@tanstack/react-query'

import { apiClient } from './api-client'

interface GetUsersPointsResponse {
  items: Item[]
  page: number
  size: number
  total_items: number
  total_pages: number
}

interface Item {
  address: string
  totalRewards: number
  currentRewardMultiplier: number
  rewardsPerStaking: number
  rewardsPerActivity: number
}

function getUsersPoints({ page, size }: { page?: number; size?: number }) {
  return apiClient.get<GetUsersPointsResponse>(
    `rewards/info/users?page=${page}&size=${size}`,
  )
}

export const useGetUsersPoints = ({
  page = 1,
  size = 10,
}: { page?: number; size?: number } = {}) => {
  const query = useQuery({
    queryKey: ['users-points', page, size],
    queryFn: () => getUsersPoints({ page, size }),
  })

  return { ...query, data: query.data?.data }
}
