/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client'
import { gql } from '@codegen/gql'
import type { RechartDataType } from '@components/chart/line-chart/LineChart'
import { useMemo } from 'react'

export const maatTokensApy = gql(`
  query MaatTokensApy($from: Float!) {
    apies(where: { protocol: { id_eq: "maat" }, timestamp_gt: $from }) {
      timestamp
      token
      id
      apy
    }
    tokens {
      addresses
      decimals
      id
      name
      symbol
    }
  }
`)

export const useMaatTokensApy = ({ from }: { from: number }) => {
  const { data, ...rest } = useQuery(maatTokensApy, { variables: { from } })
  console.log('asd', data)

  const chartData = useMemo(() => {
    const apyData = data?.apies
    if (!apyData) return
    let lastUv = 0
    let lastPv = 0
    const apyDataArray = [] as RechartDataType[]
    apyData.forEach((item) => {
      const { timestamp, apy, token } = item
      const symbol = data?.tokens?.find((_token) => _token.addresses[0] === token)
        ?.symbol as string
      const uv = symbol.toLowerCase() === 'usdc' ? Number(apy) : lastPv
      const pv = symbol.toLowerCase() === 'usdt' ? Number(apy) : lastUv
      apyDataArray.push({
        name: symbol,
        timestamp: Number(timestamp),
        uv,
        pv,
      })
      lastUv = uv
      lastPv = pv
    })
    return apyDataArray
  }, [data])

  return { data: chartData, ...rest }
}
