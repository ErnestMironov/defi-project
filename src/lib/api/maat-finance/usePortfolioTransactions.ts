import { apiClient } from '@api/maat-finance/api-client'
import type { Event, StatusType } from '@api/maat-finance/types'
import { useQuery } from '@tanstack/react-query'
import qs from 'qs'

type PortfolioTransactionsParameters = {
  status?: StatusType[]
}

type PortfolioTransactions = Event[]

const getPortfolioTransactions = (
  address: string,
  parameters: PortfolioTransactionsParameters,
) => {
  return apiClient.get<PortfolioTransactions>(
    `analytics/portfolio/transactions/${address}`,
    {
      params: parameters,
      paramsSerializer: (parameters_) => {
        return qs.stringify(parameters_, { arrayFormat: 'repeat' })
      },
    },
  )
}

export const usePortfolioTransactions = (
  address: string,
  parameters: PortfolioTransactionsParameters,
) => {
  return useQuery({
    queryKey: ['PortfolioTransactions', address, parameters],
    queryFn: async () => {
      const { data } = await getPortfolioTransactions(address, parameters)
      return data
    },
  })
}
