import { apiClient } from '@api/maat-finance/api-client'
import type {
  ActionType,
  Event,
  PaginationResponse,
  SortDirection,
  StatusType,
} from '@api/maat-finance/types'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

export type EventsParameters = {
  limit?: number
  action_type: ActionType
  page?: number
  size?: number
  sort?: SortDirection
  status?: StatusType
  start?: string
  end?: string
}

const getEvents = (parameters: EventsParameters) => {
  return apiClient.get<PaginationResponse<Event>>('/actions/last', {
    params: parameters,
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
      queryKey: ['events', rest],
      queryFn: async ({ pageParam }) => {
        //! TODO: remove limit
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
