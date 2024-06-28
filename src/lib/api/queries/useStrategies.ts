import { gql, useQuery } from '@apollo/client'
// import { gql } from '@codegen/gql'

// export const GET_STRATEGIES = gql(`
//   query StrategyStats {
//     strategyStats {
//       apy
//       chainId
//       chainName
//       decimals
//       deposited
//       protocol
//       strategyId
//       tokenAddress
//       tokenSymbol
//     }
//   }
// `)
export const GET_STRATEGIES = gql`
  query MyQuery {
    strategyStats {
      apy
      chainId
      chainName
      decimals
      deposited
      protocol
      strategyId
      tokenAddress
      tokenSymbol
    }
  }
`

export const useStrategies = () => {
  const { data, ...rest } = useQuery(GET_STRATEGIES)
  return { data, ...rest }
}
