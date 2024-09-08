import { apiClient } from '@api/maat-finance/api-client'
import type { IncentiveEvent, PaginationResponse } from '@api/maat-finance/types'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

export type IncentiveParameters = {
  limit?: number
  page?: number
  size?: number
  start_timestamp?: string
  end_timestamp?: string
}

const getIncentives = (parameters: IncentiveParameters) => {
  return apiClient.get<PaginationResponse<IncentiveEvent>>('/actions/incentives', {
    params: parameters,
  })
}

export const useIncentives = (parameters: IncentiveParameters) => {
  return useQuery({
    queryKey: ['incentives', parameters],
    queryFn: async () => {
      const { data } = await getIncentives(parameters)
      return data
    },
  })
}

export const useInfiniteIncentives = (parameters: IncentiveParameters) => {
  const { size, ...rest } = parameters
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, refetch, ...result } =
    useInfiniteQuery({
      queryKey: ['events', rest],
      queryFn: async ({ pageParam }) => {
        //! TODO: remove limit
        const response = await getIncentives({
          size,
          page: pageParam,
          limit: 100,
          ...rest,
        })
        return response.data
      },
      getNextPageParam: (lastPage) => {
        return lastPage.page < lastPage.total_pages
          ? Number(lastPage.page) + 1
          : undefined
      },
      initialPageParam: 1,
    })

  return {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data: data?.pages?.map((page) => page.items).flat() || [],
    totalCount: data?.pages[0].total_items,
    refetch,
    ...result,
  }
}
