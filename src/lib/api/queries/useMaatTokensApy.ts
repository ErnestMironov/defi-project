/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client'
import { gql } from '@codegen/gql'
import type { RechartDataType } from '@components/chart/line-chart/LineChart'
import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'
import { useMemo } from 'react'

function divideIntoGroups<T>(array: T[], groupLength = 10): T[][] {
  const groups: T[][] = []
  let temporaryGroup: T[] = []

  for (const element of array) {
    temporaryGroup.push(element)
    if (temporaryGroup.length === groupLength) {
      groups.push(temporaryGroup)
      temporaryGroup = []
    }
  }

  // Add any remaining elements
  if (temporaryGroup.length > 0) {
    groups.push(temporaryGroup)
  }

  return groups
}

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
    const apyDataArrayWithBothLines = apyDataArray.filter(
      (item) => !!item.pv && !!item.uv,
    )
    if (dayjs().subtract(1, 'month').valueOf() >= from) {
      return divideIntoGroups(apyDataArrayWithBothLines).map((group) =>
        group.reduce(
          (accumulator, current) => {
            return {
              ...accumulator,
              uv: Number(accumulator.uv) + Number(current.uv) / group.length,
              pv: Number(accumulator.pv) + Number(current.pv) / group.length,
              timestamp: accumulator.timestamp + current.timestamp / group.length,
              name: current.name,
            }
          },
          { pv: 0, uv: 0, timestamp: 0, name: '' },
        ),
      )
    }
    return apyDataArrayWithBothLines
  }, [data, from])

  return { data: chartData, ...rest }
}
