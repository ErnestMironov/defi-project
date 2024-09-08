import { apiClient } from '@api/maat-finance/api-client'
import type {
  AdminActionType,
  AdminEvent,
  PaginationResponse,
  SortDirection,
  StatusType,
} from '@api/maat-finance/types'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

export type AdminActionsParameters = {
  limit?: number
  action_type?: AdminActionType
  page?: number
  size?: number
  sort?: 'creation_time' | 'amount'
  orderBy?: SortDirection
  status?: StatusType
  start_timestamp?: string
  end_timestamp?: string
}

const getAdminActions = (parameters: AdminActionsParameters) => {
  return apiClient.get<PaginationResponse<AdminEvent>>('/actions/admin', {
    params: parameters,
  })
}

export const useAdminActions = (parameters: AdminActionsParameters) => {
  return useQuery({
    queryKey: ['admin-actions', parameters],
    queryFn: async () => {
      const { data } = await getAdminActions(parameters)
      return data
    },
  })
}

export const useInfiniteAdminActions = (parameters: AdminActionsParameters) => {
  const { size, ...rest } = parameters
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, refetch, ...result } =
    useInfiniteQuery({
      queryKey: ['admin-actions', rest],
      queryFn: async ({ pageParam }) => {
        //! TODO: remove limit
        const response = await getAdminActions({
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
