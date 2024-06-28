import { useQuery } from '@apollo/client'
import { gql } from '@codegen/gql'
import { formatAmountValue } from '@utils/formatValue'
import BigNumber from 'bignumber.js'
import { useAccount } from 'wagmi'

export const GET_OVERVIEW = gql(`
  query Overview($address: String!) {
    apies(where: { protocol: { id_eq: "maat" } }, limit: 1, orderBy: id_DESC) {
      apy
    }
    maatTvls(orderBy: id_DESC) {
    staked
    token {
      decimals
    }
  }
  strategies {
    id
  }
  maatUserStats(address: $address) {
    balances {
      balance
      vault
    }
  }
  maatEarnings
  }
`)

export const useOverview = () => {
  const { address } = useAccount()
  // TODO: Обсудить с командой, что показать, если не подключен кошелек
  const { data, ...rest } = useQuery(GET_OVERVIEW, {
    variables: { address: address || ('0x' as string) },
    // skip: !address,
  })

  const tvl = data?.maatTvls
    .reduce(
      (accumulator, item) =>
        accumulator.plus(BigNumber(item.staked).div(10 ** item.token.decimals)),
      BigNumber(0),
    )
    .toString()
  const strategies = data?.strategies.length || '0'
  const deposited = data?.maatUserStats.balances
    .reduce((accumulator, item) => accumulator.plus(item.balance), BigNumber(0))
    .div(10 ** 6)
  const yeald = data?.apies[0].apy
    ? deposited
        ?.multipliedBy(data?.apies[0].apy)
        .div(100)
        .div(12)
        .toFixed(2)
    : '0'
  const formattedData = {
    userOverview: {
      deposited: formatAmountValue(deposited?.toString(), 2),
      yeald,
      apy: formatAmountValue(data?.apies[0].apy, 2),
    },
    maatOverview: {
      tvl: formatAmountValue(tvl, 2),
      cumulativeEarnings: formatAmountValue(data?.maatEarnings, 2, false),
      strategies,
    },
  }
  return { data: formattedData, ...rest }
}
