import { useProtocolMetrics } from '@api/queries/useProtocolMetrics'
import { useRebalanceVolume } from '@api/queries/useRebalanceVolume'
import { useMemo } from 'react'

import type { RechartDataType } from './TokenChartMobile'

export const useTokenMetrics = (symbol: 'USDT' | 'USDC') => {
  const {
    data,
    isLoading: isProtocolMetricsLoading,
    error: protocolMetricsError,
    ...rest
  } = useProtocolMetrics()
  const {
    data: rebalancingVolume,
    isLoading: isRebalancingVolumeLoading,
    error: rebalancingVolumeError,
  } = useRebalanceVolume()

  const tokenRebalancingVolume =
    rebalancingVolume?.[symbol?.toUpperCase() as 'USDT' | 'USDC'].volume
  const formattedData = useMemo(() => {
    if (!data) return { apy: [], tvl: [] }

    const formatted = Object.entries(
      data[symbol?.toUpperCase() as 'USDT' | 'USDC'].history,
    ).map(([key, value]) => ({
      name: key,
      timestamp: Number(key) * (key.length === 10 ? 1000 : 1),
      apy: {
        name: key,
        timestamp: Number(key) * (key.length === 10 ? 1000 : 1),
        value: value.apy,
      },
      tvl: {
        name: key,
        timestamp: Number(key) * (key.length === 10 ? 1000 : 1),
        value: value.tvl,
      },
    }))
    return {
      apy: formatted.map((item) => item.apy),
      tvl: formatted.map((item) => item.tvl),
    }
  }, [data, symbol]) as { apy: RechartDataType[]; tvl: RechartDataType[] }

  const apy = data?.[symbol?.toUpperCase() as keyof typeof data].apy
  const tvl = data?.[symbol?.toUpperCase() as keyof typeof data].tvl

  return {
    apyData: formattedData.apy,
    tvlData: formattedData.tvl,
    apy,
    tvl,
    volume: tokenRebalancingVolume,
    ...rest,
    isLoading: isProtocolMetricsLoading || !!protocolMetricsError,
    volumeLoading: isRebalancingVolumeLoading || !!rebalancingVolumeError,
    error: protocolMetricsError || rebalancingVolumeError,
  }
}
