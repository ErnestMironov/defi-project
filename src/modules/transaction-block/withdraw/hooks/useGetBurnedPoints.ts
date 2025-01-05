import { apiClient } from '@api/maat-finance/api-client'
import { useGetUserBadges } from '@api/maat-finance/refferal-system/useGetUserBadges'
import type { BurnedPointsResponse } from '@api/maat-finance/types'
import { useQuery } from '@tanstack/react-query'
import type { Address } from 'viem'

type GetBurnedPointsParameters = {
  address: Address
  withdrawAmount: number
}

const getBurnedPoints = async (parameters: GetBurnedPointsParameters) => {
  try {
    const response = await apiClient.get<BurnedPointsResponse>(
      'rewards/preview/withdraw',
      {
        params: {
          address: parameters.address,
          withdraw_amount: parameters.withdrawAmount,
        },
      },
    )

    console.log(response)
    return response.data
  } catch (error) {
    console.error('Error fetching burned points:', error)
    throw error
  }
}

export const useGetBurnedPoints = (parameters: GetBurnedPointsParameters) => {
  const { data: badgesInfo } = useGetUserBadges(parameters.address)

  return useQuery({
    queryKey: ['burned-points', parameters, badgesInfo?.userRewards.totalPoints],
    queryFn: async () => {
      const burnedPoints = await getBurnedPoints(parameters)
      const currentPoints = badgesInfo?.userRewards.totalPoints || 0
      const pointsAfterWithdraw = burnedPoints.totalPoints || 0

      const pointsToBurn = currentPoints - pointsAfterWithdraw

      return {
        pointsToBurn,
        currentPoints,
        pointsAfterWithdraw,
      }
    },
    enabled: !!badgesInfo && parameters.withdrawAmount > 0,
  })
}
