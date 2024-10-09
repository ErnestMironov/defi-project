import { usePortfolioAssets } from '@api/queries/usePortfolioAssets'
import { useProtocolMetrics } from '@api/queries/useProtocolMetrics'
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
  const { data, isLoading, error } = usePortfolioAssets(address as Address)
  const {
    data: protocolMetrics,
    isLoading: isProtocolMetricsLoading,
    error: protocolMetricsError,
  } = useProtocolMetrics({})

  const usdcApy = protocolMetrics?.history?.USDC?.apy
  const usdtApy = protocolMetrics?.history?.USDT?.apy

  const formattedVaultData = useMemo(() => {
    return Object.entries(data ?? {}).map(([symbol, value]) => {
      return {
        symbol,
        value,
        apy: (symbol === 'USDC' ? usdcApy : usdtApy) as number,
      }
    })
  }, [data, usdcApy, usdtApy])

  const renderTokens = () => {
    if (isLoading || error || isProtocolMetricsLoading || protocolMetricsError)
      return (
        <>
          {Array.from({ length: 2 }).map((_, i) => (
            <VaultTokenItemSkeleton key={i} />
          ))}
        </>
      )

    return (
      <>
        {formattedVaultData
          .sort((a, b) => b.value - a.value)
          .map((item) => (
            <VaultTokenItem key={item.symbol} {...item} />
          ))}
      </>
    )
  }

  return (
    <div className={cn('space-y-6', className)} {...rest}>
      {renderTokens()}
      <AllAssets className="mt-6" />
    </div>
  )
}
