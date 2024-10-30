import { apiClient } from '@api/maat-finance/api-client'
import type {
  ChainParameters,
  IncentiveEvent,
  PaginationResponse,
  SortDirection,
  StatusType,
  TokenParameters,
} from '@api/maat-finance/types'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import qs from 'qs'

export type IncentiveParameters = {
  limit?: number
  page?: number
  size?: number
  start_timestamp?: string
  end_timestamp?: string
  search?: string
  actions_type?: string[]
  token?: TokenParameters[]
  status?: StatusType[]
  chain?: ChainParameters[]
  sort?: 'creation_time' | 'amount'
  order_by?: SortDirection
  hash?: string
}

const getIncentives = (parameters: IncentiveParameters) => {
  return apiClient.get<PaginationResponse<IncentiveEvent>>(
    'analytics/actions/incentives',
    {
      params: parameters,
      paramsSerializer: (parameters_) => {
        return qs.stringify(parameters_, { arrayFormat: 'repeat' })
      },
    },
  )
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
      queryKey: ['incentives', rest],
      queryFn: async ({ pageParam }) => {
        const response = await getIncentives({
          size,
          page: pageParam,
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
