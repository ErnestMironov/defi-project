/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client'
import { gql } from '@codegen/gql'
import type { RechartDataType } from '@components/chart/line-chart/LineChart'
import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'
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

    const stakedUsdc = tokensTvlApyData.find(
      (item) => item.token.symbol.toLowerCase() === 'usdc',
    )?.staked
    const stakedUsdt = tokensTvlApyData.find(
      (item) => item.token.symbol.toLowerCase() === 'usdt',
    )?.staked
    let lastUv = Number(
      BigNumber(stakedUsdc)
        .div(10 ** 6)
        .toString(),
    )
    let lastPv = Number(
      BigNumber(stakedUsdt)
        .div(10 ** 6)
        .toString(),
    )
    const tvlDataArray = [] as RechartDataType[]
    tokensTvlApyData.forEach((item: any) => {
      const { timestamp, staked, token } = item
      // TODO: remove lastUv and lastPv for null
      const formattedStaked = Number(
        BigNumber(staked)
          .div(10 ** 6)
          .toString(),
      )
      const uv = token.symbol.toLowerCase() === 'usdc' ? formattedStaked : lastUv
      const pv = token.symbol.toLowerCase() === 'usdt' ? formattedStaked : lastPv

      if (
        tvlDataArray.at(-1)?.timestamp &&
        dayjs(timestamp).diff(dayjs(tvlDataArray.at(-1)?.timestamp), 'minute') <= 10
      ) {
        tvlDataArray.pop()
      }

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
