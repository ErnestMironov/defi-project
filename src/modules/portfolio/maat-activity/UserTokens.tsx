import { usePortfolioYield } from '@api/queries/usePortfolioYield'
import { useProtocolMetrics } from '@api/queries/useProtocolMetrics'
import { useUserShares } from '@hooks/useGetUserShares'
import { cn } from '@utils/cn'
import { type ComponentProps, useMemo } from 'react'
import type { Address } from 'viem'
import { useAccount } from 'wagmi'

import { AllAssets } from '../all-assets/AllAssets'
import { VaultTokenItem, VaultTokenItemSkeleton } from './VaultTokenItem'

interface UserTokensProperties extends ComponentProps<'div'> {}

export const UserTokens = (props: UserTokensProperties) => {
  const { className, ...rest } = props
  const { address } = useAccount()

  const { shares, isLoading: isUserSharesLoading } = useUserShares(address)
  const { data: yieldData } = usePortfolioYield(address as Address)

  const balances = useMemo(() => {
    if (!shares) return []

    return [...shares]
      .filter((token) => token.balance > 999_999)
      .sort((a, b) => Number(b.balance) - Number(a.balance))
  }, [shares])

  const {
    data: protocolMetrics,
    isLoading: isProtocolMetricsLoading,
    error: protocolMetricsError,
  } = useProtocolMetrics({})

  const usdcApy = protocolMetrics?.history?.USDC?.apy
  const usdtApy = protocolMetrics?.history?.USDT?.apy

  const formattedVaultData = useMemo(() => {
    return Object.entries(balances).map(([symbol, value]) => {
      return {
        symbol,
        value,
        apy: (symbol === 'USDC' ? usdcApy : usdtApy) as number,
        yield: (yieldData?.[value.stable] as number) ?? 0,
      }
    })
  }, [balances, usdcApy, usdtApy, yieldData])

  const renderTokens = () => {
    if (isUserSharesLoading || isProtocolMetricsLoading || protocolMetricsError)
      return (
        <div className="user-assets flex flex-col gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <VaultTokenItemSkeleton key={i} />
          ))}
        </div>
      )

    return (
      <div className="user-assets flex flex-col gap-6">
        {formattedVaultData
          .sort((a, b) => Number(b.value) - Number(a.value))
          .map((item, i) => (
            <VaultTokenItem key={i} {...item} />
          ))}
      </div>
    )
  }

  return (
    <div className={cn('space-y-6', className)} {...rest}>
      {renderTokens()}
      <AllAssets className="mt-6" />
    </div>
  )
}
