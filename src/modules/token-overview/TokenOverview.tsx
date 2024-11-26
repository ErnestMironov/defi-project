import { useProtocolMetrics } from '@api/maat-finance/useProtocolMetrics'
import { useRebalanceVolume } from '@api/maat-finance/useRebalanceVolume'
import { cn } from '@utils/cn'
import { type ComponentProps } from 'react'

import { TokenStatsContainer } from './TokenStatsContainer'

interface TokenOverviewProperties extends ComponentProps<'div'> {}

export const TokenOverview = (props: TokenOverviewProperties) => {
  const { className, ...rest } = props
  const { data, isLoading, error } = useRebalanceVolume()
  const {
    data: protocolMetrics,
    isLoading: isProtocolMetricsLoading,
    error: protocolMetricsError,
  } = useProtocolMetrics({})

  const usdcApy = protocolMetrics?.history?.USDC?.apy
  const usdcTvl = protocolMetrics?.history?.USDC?.tvl
  const usdtApy = protocolMetrics?.history?.USDT?.apy
  const usdtTvl = protocolMetrics?.history?.USDT?.tvl
  const usdcVolume = data?.USDC
  const usdtVolume = data?.USDT

  return (
    <section
      className={cn(
        'flex gap-4 max-lg:flex-col w-full divide-x divide-stroke-100 *:flex-1',
        className,
      )}
      {...rest}
    >
      <TokenStatsContainer
        loading={isProtocolMetricsLoading || !!protocolMetricsError}
        loadingVolume={isLoading || !!error}
        color="#3883EB"
        apy={usdcApy}
        tvl={usdcTvl}
        rebalancingVolume={usdcVolume}
        tokenName="USDC"
      />
      <TokenStatsContainer
        loading={isProtocolMetricsLoading || !!protocolMetricsError}
        loadingVolume={isLoading || !!error}
        color="#4CD7B1"
        apy={usdtApy}
        tvl={usdtTvl}
        rebalancingVolume={usdtVolume}
        tokenName="USDT"
      />
    </section>
  )
}
