import type { ContractCallsQuoteRequest } from '@lifi/sdk'
import { useQuery } from '@tanstack/react-query'

import { lifiApiClient } from '../constants'

export function getQuote(parameters: ContractCallsQuoteRequest) {
  return lifiApiClient.post('quote/contractCalls', parameters)
}

export const useGetQuote = (parameters?: ContractCallsQuoteRequest) => {
  return useQuery({
    queryKey: ['quote', Object.values(parameters ?? {}).join('-')],
    queryFn: () => {
      if (!parameters) {
        throw new Error('Parameters are required')
      }
      return getQuote(parameters)
    },
    enabled: !!parameters,
  })
}
