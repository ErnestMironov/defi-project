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
      symbol
    }
  }
  strategies {
    id
  }
  maatUserStats(address: $address) {
    balances {
      balance
      asset
    }
  }
  maatDeposited
  }
`)

export const useOverview = () => {
  const { address } = useAccount()
  // TODO: Обсудить с командой, что показать, если не подключен кошелек
  const { data, ...rest } = useQuery(GET_OVERVIEW, {
    variables: { address: address || ('0x' as string) },
    // skip: !address,
  })

  const tvl = (() => {
    const usdtTvl = data?.maatTvls.find((item) => item.token.symbol === 'USDT')
    const usdcTvl = data?.maatTvls.find((item) => item.token.symbol === 'USDC')
    return [usdtTvl, usdcTvl]
      .reduce(
        (accumulator, item) =>
          accumulator.plus(
            BigNumber(item?.staked).div(10 ** (item?.token.decimals || 6)),
          ),
        BigNumber(0),
      )
      .toString()
  })()
  const strategies = data?.strategies.length || '0'
  const deposited = data?.maatUserStats.balances
    .reduce((accumulator, item) => accumulator.plus(item.balance), BigNumber(0))
    .div(10 ** 6)
  // ! remove "* 5" when we have real data
  const lastApy = BigNumber(data?.apies[0].apy || '0')
    .multipliedBy(5)
    .toString()
  const yeald = lastApy
    ? deposited?.multipliedBy(lastApy).div(100).div(12).toFixed(2)
    : '0'
  const formattedData = {
    userOverview: {
      deposited: formatAmountValue(deposited?.toString(), 2),
      yeald,
      apy: formatAmountValue(lastApy, 2),
    },
    maatOverview: {
      tvl: formatAmountValue(tvl, 2),
      cumulativeEarnings: formatAmountValue(
        BigNumber(tvl)
          .minus(BigNumber(data?.maatDeposited || 0).div(10 ** 6))
          .toString(),
        2,
        false,
      ),
      strategies,
    },
  }
  return { data: formattedData, ...rest }
}
