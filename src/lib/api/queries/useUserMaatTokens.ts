/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client'
import { gql } from '@codegen/gql'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'

export const GET_USER_MAAT_TOKENS = gql(`
  query maatUserTokens($address: Address) {
    maatUserStats(address: $address) {
      balances {
        asset
        balance
        lpBalance
      }
    }
`)

export const useUserMaatTokens = () => {
  const { address } = useAccount()

  const { data, ...rest } = useQuery(GET_USER_MAAT_TOKENS, { variables: { address } })

  const chartData = useMemo(() => {
    console.log('useUserMaatTokens', data)
  }, [data])

  return { data: chartData, ...rest }
}
