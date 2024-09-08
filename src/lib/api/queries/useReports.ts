import { apiClient } from '@api/maat-finance/api-client'
import type {
  PaginationResponse,
  ReportType,
  SortDirection,
  StatusType,
} from '@api/maat-finance/types'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

export type ReportParameters = {
  limit?: number
  sort?: 'creation_time' | 'amount'
  orderBy?: SortDirection
  status?: StatusType
  actions_type?: string[]
  chain?: (
    | 'bsc'
    | 'arbitrum'
    | 'optimism'
    | 'base'
    | 'polygon'
    | 'avalanche'
    | 'metis'
    | 'mantle'
    | 'sei'
  )[]
  token?: ('USDT' | 'USDC')[]
  page?: number
  size?: number
  start_timestamp?: string
  end_timestamp?: string
}

const getReports = (parameters: ReportParameters) => {
  return apiClient.get<PaginationResponse<ReportType>>('/actions/oracle', {
    params: parameters,
  })
}

export const useReports = (parameters: ReportParameters) => {
  return useQuery({
    queryKey: ['reports', parameters],
    queryFn: async () => {
      const { data } = await getReports(parameters)
      return data
    },
  })
}

export const useInfiniteReports = (parameters: ReportParameters) => {
  const { size, ...rest } = parameters
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, refetch, ...result } =
    useInfiniteQuery({
      queryKey: ['reports', rest],
      queryFn: async ({ pageParam }) => {
        const response = await getReports({
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
