import type { StatusResponse } from '@lifi/sdk'
import { useQuery } from '@tanstack/react-query'
import type { AxiosPromise } from 'axios'
import type { Address } from 'viem'

import { lifiApiClient } from '../constants'

export function getStatus(txHash: Address): AxiosPromise<StatusResponse> {
  return lifiApiClient.get('status', { params: { txHash } })
}
export const useStatus = (txHash?: Address) => {
  return useQuery<StatusResponse, Error>({
    queryKey: ['quote', txHash],
    queryFn: async () => {
      if (!txHash) {
        throw new Error('Hash are required')
      }
      const { data } = await getStatus(txHash)
      return data
    },
    enabled: !!txHash,
  })
}
