import { useUserShares } from '@api/contracts/useGetUserShares'
import { useVaultAPY } from '@hooks/useVaultAPY'
import type { TokenData } from '@modules/portfolio/types'
import { useMemo } from 'react'
import { formatUnits } from 'viem'

export const useFormattedVaultData = (address?: `0x${string}`) => {
  const { data, isLoading: isUserSharesLoading } = useUserShares(address)
  const {
    bestUSDCAPy: usdcApy,
    bestUSDTAPy: usdtApy,
    isLoading: isStrategiesLoading,
  } = useVaultAPY()

  const balances = useMemo(() => {
    if (!data?.shares) return []

    return [...data.shares]
      .filter((token) => token.balance > 999_999)
      .sort((a, b) => Number(b.balance) - Number(a.balance))
  }, [data?.shares])
  console.log(balances)

  const formattedData = useMemo(() => {
    const formatted: TokenData[] = []

    balances.forEach((token) => {
      if (formatted.some((t) => t.symbol === token.stable)) {
        const index = formatted.findIndex((t) => t.symbol === token.stable)
        formatted[index].balance = (
          Number(formatted[index].balance) +
          Number(formatUnits(token.balance, token.decimals))
        ).toString()
      } else {
        formatted.push({
          balance: formatUnits(token.balance, token.decimals),
          decimals: token.decimals,
          symbol: token.stable,
          apy: token.stable === 'USDC' ? usdcApy : usdtApy,
        })
      }
    })

    return formatted.sort((a, b) => Number(b.balance) - Number(a.balance))
  }, [balances, usdcApy, usdtApy])

  return {
    formattedData,
    isLoading: isUserSharesLoading || isStrategiesLoading,
  }
}
