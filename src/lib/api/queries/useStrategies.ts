import { apiClient } from '@api/maat-finance/api-client'
import type { PaginationResponse, Strategy } from '@api/maat-finance/types'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

type StrategiesParameters = {
  page?: number
  size?: number
  strategy_id?: string
  start_timestamp?: string
  end_timestamp?: string
}

const getStrategies = (parameters: StrategiesParameters) => {
  return apiClient.get<PaginationResponse<Strategy>>('/overview/strategies', {
    params: parameters,
  })
}

export const useStrategies = (parameters: StrategiesParameters) => {
  return useQuery({
    queryKey: ['strategies', parameters],
    queryFn: async () => {
      const { data } = await getStrategies(parameters)
      return data
    },
  })
}

export const useInfiniteStrategies = (parameters: StrategiesParameters) => {
  const { size, ...rest } = parameters
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, refetch, ...result } =
    useInfiniteQuery({
      queryKey: ['strategies', rest],
      queryFn: async ({ pageParam }) => {
        const response = await getStrategies({ size, page: pageParam, ...rest })
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
