import { CHAIN_IDS_BY_NAME, LIFI_CHAIN_IDS } from '@constants/chains'
import type { TokensResponse } from '@lifi/sdk'
import { useQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import { lifiApiClient } from '../constants'

export function getTokens(): Promise<AxiosResponse<TokensResponse, any>> {
  return lifiApiClient.get('tokens', {
    params: {
      chains: Object.values([
        LIFI_CHAIN_IDS[CHAIN_IDS_BY_NAME.Ethereum],
        LIFI_CHAIN_IDS[CHAIN_IDS_BY_NAME.Bsc],
        LIFI_CHAIN_IDS[CHAIN_IDS_BY_NAME.Arbitrum],
        LIFI_CHAIN_IDS[CHAIN_IDS_BY_NAME.Base],
        LIFI_CHAIN_IDS[CHAIN_IDS_BY_NAME.Avalanche],
        LIFI_CHAIN_IDS[CHAIN_IDS_BY_NAME.Polygon],
      ]).join(','),
    },
  })
}

export function useGetTokens() {
  return useQuery({
    queryKey: ['get-tokens'],
    queryFn: getTokens,
  })
}
