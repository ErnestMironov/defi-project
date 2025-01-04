import { useUserShares } from '@api/contracts/useGetUserShares'
import { useVaultAPY } from '@hooks/useVaultAPY'
import type { TokenData } from '@modules/portfolio/types'
import { useMemo } from 'react'
import { formatUnits } from 'viem'

export const useFormattedVaultData = (address?: `0x${string}`) => {
  const { data, isLoading: isUserSharesLoading } = useUserShares(address)
  const {
    bestUSDCApy: usdcApy,
    bestUSDTApy: usdtApy,
    isLoading: isStrategiesLoading,
  } = useVaultAPY()

  const balances = useMemo(() => {
    if (!data?.shares) return []

    return [...data.shares]
      .filter((token) => token.balance > 999_999)
      .sort((a, b) => Number(b.balance) - Number(a.balance))
  }, [data?.shares])

  const formattedData = useMemo(() => {
    const formatted: TokenData[] = []

    balances.forEach((token) => {
      if (formatted.some((t) => t.symbol === token.stable)) {
        const index = formatted.findIndex((t) => t.symbol === token.stable)

        formatted[index].balance = (
          Number(formatted[index].balance) +
          Number(formatUnits(token.balance, token.decimals))
        ).toString()

        const normalizedPrice =
          token.decimals === formatted[index].decimals
            ? token.stableBalance
            : token.stableBalance *
              BigInt(10 ** (formatted[index].decimals - token.decimals))

        formatted[index].price += normalizedPrice
      } else {
        formatted.push({
          symbol: token.stable,
          price: formatUnits(token.balance, token.decimals),
          apy: token.stable === 'USDC' ? usdcApy : usdtApy,
          balance: formatUnits(token.stableBalance, token.decimals),
          decimals: token.decimals,
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
