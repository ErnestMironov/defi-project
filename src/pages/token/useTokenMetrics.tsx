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
    token: [symbol],
    from_timestamp: 1,
    protocol: [],
    chain: [],
  })
  const {
    data: rebalancingVolume,
    isLoading: isRebalancingVolumeLoading,
    error: rebalancingVolumeError,
  } = useRebalanceVolume()

  const tokenRebalancingVolume =
    rebalancingVolume?.[symbol?.toUpperCase() as 'USDT' | 'USDC'] ?? 0

  const apy = data?.history?.[symbol?.toUpperCase() as 'USDT' | 'USDC']?.apy ?? 0
  const tvl = data?.history?.[symbol?.toUpperCase() as 'USDT' | 'USDC']?.tvl ?? 0

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
