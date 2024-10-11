import type { StatusResponse } from '@lifi/sdk'
import { useQuery } from '@tanstack/react-query'
import type { Address } from 'viem'

import { lifiApiClient } from '../constants'

export function getStatus(txHash: Address): Promise<StatusResponse> {
  return lifiApiClient.post('status', txHash)
}

export const useStatus = (txHash?: Address) => {
  return useQuery<StatusResponse, Error>({
    queryKey: ['quote', txHash],
    queryFn: () => {
      if (!txHash) {
        throw new Error('Hash are required')
      }
      return getStatus(txHash)
    },
    enabled: !!txHash,
  })
}
