import { apiClient } from '@api/maat-finance/api-client'
import type {
  Event,
  PaginationResponse,
  SortDirection,
  StatusType,
  TokenParameters,
} from '@api/maat-finance/types'
import type { LAST_EVENT_ACTION_TYPE } from '@constants/action-type'
import type { CHAIN_IDS_BY_BACKEND_NAMES } from '@constants/chains'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import qs from 'qs'

export type EventsParameters = {
  limit?: number
  action_type?: (keyof typeof LAST_EVENT_ACTION_TYPE)[]
  transaction_type?: 'maat' | 'trigger' | 'handler'
  chain?: (keyof typeof CHAIN_IDS_BY_BACKEND_NAMES)[]
  page?: number
  size?: number
  orderBy?: SortDirection
  sort?: 'creation_time' | 'amount'
  status?: StatusType
  start?: string
  end?: string
  token?: TokenParameters[]
}

export const getEvents = (parameters: EventsParameters) => {
  return apiClient.get<PaginationResponse<Event>>('/actions/last', {
    params: parameters,
    paramsSerializer: (parameters_) => {
      return qs.stringify(parameters_, { arrayFormat: 'repeat' })
    },
  })
}

export const useEvents = (parameters: EventsParameters) => {
  return useQuery({
    queryKey: ['events', parameters],
    queryFn: async () => {
      const { data } = await getEvents(parameters)
      return data
    },
  })
}

export const useInfiniteEvents = (parameters: EventsParameters) => {
  const { size, ...rest } = parameters
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, refetch, ...result } =
    useInfiniteQuery({
      queryKey: ['events-infinite', rest],
      queryFn: async ({ pageParam }) => {
        const response = await getEvents({ size, page: pageParam, ...rest })
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
