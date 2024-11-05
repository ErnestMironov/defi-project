import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { Address } from 'viem'

import { referralApiClient } from './referral-api-client'

type IsRegisteredParameters = {
  address: Address
  signature: string
}

function isRegistered({ address, signature }: IsRegisteredParameters) {
  if (!signature) {
    throw new Error('Signature is required')
  }

  return referralApiClient.get<{ is_registered: boolean }>(`is-registered/${address}`, {
    params: {
      address,
      signature,
    },
  })
}

interface ErrorResponse {
  detail: string
}

export const useIsRegistered = ({
  address,
  signature,
  enabled,
}: IsRegisteredParameters & { enabled: boolean }) => {
  const query = useQuery<{ data: { is_registered: boolean } }, AxiosError<ErrorResponse>>(
    {
      queryKey: ['is-registered', address],
      queryFn: () => isRegistered({ address, signature }),
      enabled,
      retry: false,
    },
  )

  return {
    ...query,
    isRegistered: query.data?.data.is_registered,
  }
}
