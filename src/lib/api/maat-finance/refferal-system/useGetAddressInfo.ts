import { useQuery } from '@tanstack/react-query'
import type { AxiosPromise } from 'axios'
import type { Address } from 'viem'

import { referralApiClient } from './referral-api-client'

interface IParameters {
  address: Address
  signature: string
}

interface IAddressInfo {
  address: string
  parent_referral_code: string
  referee_addresses: (null | string)[]
  created_referral_codes: {
    code: string
    is_valid: boolean
  }[]
  registered_at: string
}

function getAddressInfo(parameters: IParameters): AxiosPromise<IAddressInfo> {
  return referralApiClient.get(`info/user/${parameters.address}`, {
    params: {
      signature: parameters.signature,
    },
  })
}

export const useGetAddressInfo = (address: IParameters) => {
  const query = useQuery({
    queryKey: ['addressInfo', address],
    queryFn: () => getAddressInfo(address),
  })

  return {
    ...query,
    addressInfo: query.data?.data,
  }
}
