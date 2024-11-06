import { apiClient } from '@api/maat-finance/api-client'
import type {
  Event,
  PaginationResponse,
  SortDirection,
  StatusType,
  TokenParameters,
} from '@api/maat-finance/types'
import type { ANALYTICS_PAGE_EVENT_ACTION_TYPE } from '@constants/action-type'
import type { CHAIN_IDS_BY_BACKEND_NAMES } from '@constants/chains'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import qs from 'qs'

export type EventsParameters = {
  limit?: number
  actions_type?: (keyof typeof ANALYTICS_PAGE_EVENT_ACTION_TYPE)[]
  transaction_type?: 'maat' | 'trigger' | 'handler'
  chain?: (keyof typeof CHAIN_IDS_BY_BACKEND_NAMES)[]
  page?: number
  size?: number
  order_by?: SortDirection
  sort?: 'creation_time' | 'amount'
  status?: StatusType[]
  start?: string
  end?: string
  token?: TokenParameters[]
  hash_or_address?: string[]
  strategy_ids?: string[]
}

export const getEvents = (parameters: EventsParameters) => {
  return apiClient.get<PaginationResponse<Event>>('analytics/actions/last', {
    params: parameters,
    paramsSerializer: (parameters_) => {
      return qs.stringify(parameters_, { arrayFormat: 'repeat' })
    },
  })
}

export const useEvents = (parameters: EventsParameters) => {
  console.log('🚀 ~ useEvents ~ parameters:', parameters)
  return useQuery({
    queryKey: ['events', parameters],
    queryFn: async () => {
      const { data } = await getEvents({ ...parameters, limit: 100 })
      return data
    },
  })
}

export const useInfiniteEvents = (parameters: EventsParameters) => {
  const { size, ...rest } = parameters
  console.log('🚀 ~ useInfiniteEvents ~ parameters:', parameters)
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, refetch, ...result } =
    useInfiniteQuery({
      queryKey: ['events', parameters],
      queryFn: async ({ pageParam }) => {
        const response = await getEvents({ size, page: pageParam, limit: 100, ...rest })
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
