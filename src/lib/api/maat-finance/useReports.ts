import { apiClient } from '@api/maat-finance/api-client'
import type {
  ChainParameters,
  PaginationResponse,
  ReportType,
  SortDirection,
  StatusType,
} from '@api/maat-finance/types'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import qs from 'qs'

export type ReportParameters = {
  hash?: string
  limit?: number
  sort?: 'creation_time' | 'amount'
  order_by?: SortDirection
  status?: StatusType
  actions_type?: string[]
  chain?: ChainParameters[]
  token?: string[]
  page?: number
  size?: number
  start_timestamp?: string
  end_timestamp?: string
}

const getReports = (parameters: ReportParameters) => {
  return apiClient.get<PaginationResponse<ReportType>>('analytics/actions/oracle', {
    params: parameters,
    paramsSerializer: (parameters_) => {
      return qs.stringify(parameters_, { arrayFormat: 'repeat' })
    },
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
