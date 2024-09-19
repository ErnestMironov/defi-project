import { useProtocolMetrics } from '@api/queries/useProtocolMetrics'
import { useRebalanceVolume } from '@api/queries/useRebalanceVolume'

export const useTokenMetrics = (symbol: 'USDT' | 'USDC') => {
  const {
    data,
    isLoading: isProtocolMetricsLoading,
    error: protocolMetricsError,
    ...rest
  } = useProtocolMetrics({
    metrics_type: ['apy', 'tvl'],
    tokens: [symbol],
    from_timestamp: 1,
    protocols: [],
    chains: [],
  })
  const {
    data: rebalancingVolume,
    isLoading: isRebalancingVolumeLoading,
    error: rebalancingVolumeError,
  } = useRebalanceVolume()

  const tokenRebalancingVolume =
    rebalancingVolume?.[symbol?.toUpperCase() as 'USDT' | 'USDC'].volume

  const apy = data?.[symbol?.toUpperCase() as keyof typeof data]?.apy ?? 0
  const tvl = data?.[symbol?.toUpperCase() as keyof typeof data]?.tvl ?? 0

  return {
    apy,
    tvl,
    volume: tokenRebalancingVolume,
    ...rest,
    isLoading: isProtocolMetricsLoading || !!protocolMetricsError,
    volumeLoading: isRebalancingVolumeLoading || !!rebalancingVolumeError,
    error: protocolMetricsError || rebalancingVolumeError,
  }
}
