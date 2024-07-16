/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client'
import { gql } from '@codegen/gql'
import type { RechartDataType } from '@components/chart/line-chart/LineChart'
import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'
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

  // ! remove "* 5" when we have real data
  const chartData = useMemo(() => {
    const apyData = data?.apies.map((apy) => ({
      ...apy,
      apy: BigNumber(apy.apy).multipliedBy(5).toString(),
    }))
    if (!apyData) return
    const usdc = data?.tokens?.find((_token) => _token.symbol === 'USDC')
      ?.addresses[0] as string
    const usdt = data?.tokens?.find((_token) => _token.symbol === 'USDT')
      ?.addresses[0] as string
    let lastUv: null | number =
      Number(apyData.find((apy) => apy.token === usdc)?.apy) ?? null
    let lastPv: null | number =
      Number(apyData.find((apy) => apy.token === usdt)?.apy) ?? null
    const apyDataArray = [] as RechartDataType[]
    apyData.forEach((item) => {
      const { timestamp, apy, token } = item
      if (
        BigNumber(apy)
          .div(BigNumber(lastPv || apy))
          .isGreaterThan(5) ||
        BigNumber(apy)
          .div(BigNumber(lastUv || apy))
          .isGreaterThan(5)
      ) {
        return
      }
      const symbol = data?.tokens?.find((_token) => _token.addresses.includes(token))
        ?.symbol
      const uv = symbol?.toLowerCase() === 'usdc' ? Number(apy) : lastUv
      const pv = symbol?.toLowerCase() === 'usdt' ? Number(apy) : lastPv

      if (
        apyDataArray.at(-1)?.timestamp &&
        dayjs(timestamp).diff(dayjs(apyDataArray.at(-1)?.timestamp), 'minute') <= 10
      ) {
        apyDataArray.pop()
      }

      apyDataArray.push({
        name: symbol || '',
        timestamp: Number(timestamp),
        uv,
        pv,
      })
      lastUv = uv
      lastPv = pv
    })
    return apyDataArray.filter((item) => !!item.pv && !!item.uv)
  }, [data])

  return { data: chartData, ...rest }
}
