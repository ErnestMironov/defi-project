import { useProtocolMetrics } from '@api/queries/useProtocolMetrics'
import { useRebalanceVolume } from '@api/queries/useRebalanceVolume'
import usdc from '@assets/images/usdc-3d.png'
import usdt from '@assets/images/usdt-3d.png'
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
  } = useProtocolMetrics()

  const usdcApy = protocolMetrics?.USDC?.apy
  const usdcTvl = protocolMetrics?.USDC?.tvl
  const usdtApy = protocolMetrics?.USDT?.apy
  const usdtTvl = protocolMetrics?.USDT?.tvl

  return (
    <section
      className={cn(
        className,
        'flex gap-8 max-lg:gap-2 max-lg:flex-col w-full max-lg:-mx-4',
      )}
      {...rest}
    >
      <TokenStatsContainer
        loading={isProtocolMetricsLoading || isLoading}
        error={protocolMetricsError || error}
        color="#3883EB"
        apy={usdcApy}
        tvl={usdcTvl}
        rebalancingVolume={data?.USDC.volume}
        tokenName="USDC"
        img={usdc}
        imageClassName="rotate-[5.207deg]"
      />
      <TokenStatsContainer
        loading={isProtocolMetricsLoading}
        error={protocolMetricsError}
        color="#4CD7B1"
        apy={usdtApy}
        tvl={usdtTvl}
        rebalancingVolume={data?.USDT.volume}
        tokenName="USDT"
        img={usdt}
        imageClassName="rotate-[-5.207deg] right-[-7.5rem]"
      />
    </section>
  )
}
