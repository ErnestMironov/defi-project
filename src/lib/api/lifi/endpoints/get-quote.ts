import type { ContractCallsQuoteRequest, LiFiStep } from '@lifi/sdk'
import { useQuery } from '@tanstack/react-query'
import type { AxiosPromise } from 'axios'

import { lifiApiClient } from '../constants'

export function getQuote(parameters: ContractCallsQuoteRequest): AxiosPromise<LiFiStep> {
  return lifiApiClient.post('quote/contractCalls', parameters)
}

export const useGetQuote = (parameters?: ContractCallsQuoteRequest) => {
  return useQuery({
    queryKey: ['quote', parameters],
    queryFn: () => {
      if (!parameters) {
        throw new Error('Parameters are required')
      }
      return getQuote(parameters)
    },
    enabled: !!parameters,
  })
}
