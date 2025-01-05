import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface TokenData {
  address: string
  chainId: number
  symbol: string
  decimals: number
  name: string
  coinKey: string
  logoURI: string
  priceUSD: string
}

type ApiResponseData = TokenData[]

const CHAIN = 42_161
const API_URL = 'https://li.quest/v1/token'

const getTokensRate = async (tokenNames: string[]): Promise<ApiResponseData> => {
  const requests = tokenNames.map((tokenName) =>
    axios.get(API_URL, {
      params: {
        chain: CHAIN,
        token: tokenName,
      },
    }),
  )
  const responses = await Promise.all(requests)
  console.log(responses)
  return responses.map((response) => response.data)
}

export const useGetTokensRate = (tokenNames: string[]) => {
  return useQuery({
    queryKey: ['tokens-rate', tokenNames],
    queryFn: () => getTokensRate(tokenNames),
    staleTime: 60_000,
    gcTime: 300_000,
  })
}
