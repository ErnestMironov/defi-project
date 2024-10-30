import { apiClient } from '@api/maat-finance/api-client'
import type { PaginationResponse, SortDirection, Strategy } from '@api/maat-finance/types'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import qs from 'qs'
import { useInView } from 'react-intersection-observer'

export type StrategiesParameters = {
  page?: number
  size?: number
  strategy_ids?: string[]
  strategy_addresses?: string[]
  start_timestamp?: string
  end_timestamp?: string
  sort?: 'apy' | 'tvl'
  order_by?: SortDirection
  chain?: string[]
  protocol?: string[]
  token?: string[]
}

export const getStrategies = (parameters: StrategiesParameters) => {
  return apiClient.get<PaginationResponse<Strategy>>('/overview/strategies', {
    params: parameters,
    paramsSerializer: (parameters_) => {
      return qs.stringify(parameters_, { arrayFormat: 'repeat' })
    },
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
      queryKey: ['strategies-infinite', rest],
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

  const { ref, inView } = useInView({
    threshold: 0,
    onChange: (isInView) => {
      if (hasNextPage && !isFetchingNextPage && isInView) {
        fetchNextPage()
      }
    },
  })

  return {
    ref,
    inView,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data: data?.pages?.map((page) => page.items).flat() || [],
    totalCount: data?.pages[0].total_items,
    refetch,
    ...result,
  }
}
