/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client'
import { gql } from '@codegen/gql'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'

export const GET_MAAT_USER_TOKENS = gql(`
  query MaatUserTokens($address: String!) {
  maatUserStats(address: $address) {
    balances {
      asset
      balance
      lpBalance
    }
  }
  }
`)

export const useMaatUserTokens = () => {
  const { address } = useAccount()

  const { data, ...rest } = useQuery(GET_MAAT_USER_TOKENS, {
    variables: { address: address || '0x' },
  })

  const userTokens = useMemo(() => {
    console.log('useMaatUserTokens', data?.maatUserStats?.balances)
    return data?.maatUserStats?.balances || []
  }, [data])

  return { data: userTokens, ...rest }
}
