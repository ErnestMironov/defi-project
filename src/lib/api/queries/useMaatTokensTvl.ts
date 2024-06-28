/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client'
import { gql } from '@codegen/gql'
import type { RechartDataType } from '@components/chart/line-chart/LineChart'
import { useMemo } from 'react'

export const queryMaatTokensTvlData = gql(`
  query MaatTokensTvl($from: Float!) {
    maatTvls(where: {timestamp_gt: $from}) {
    id
    staked
    timestamp
    token {
      addresses
      decimals
      id
      name
      symbol
    }
  }
  }
`)

export const useMaatTokensTvl = ({ from }: { from: number }) => {
  const { data, ...rest } = useQuery(queryMaatTokensTvlData, { variables: { from } })

  const chartData = useMemo(() => {
    const tokensTvlApyData = data?.maatTvls
    if (!tokensTvlApyData) return
    let lastUv = 0
    let lastPv = 0
    const tvlDataArray = [] as RechartDataType[]
    tokensTvlApyData.forEach((item: any) => {
      const { timestamp, staked, token } = item
      // TODO: remove lastUv and lastPv for null
      const uv = token.symbol.toLowerCase() === 'usdc' ? Number(staked) : lastUv
      const pv = token.symbol.toLowerCase() === 'usdt' ? Number(staked) : lastPv
      tvlDataArray.push({
        name: token,
        timestamp: Number(timestamp),
        uv,
        pv,
      })
      lastUv = uv
      lastPv = pv
    })
    return tvlDataArray
  }, [data])

  return { data: chartData, ...rest }
}
