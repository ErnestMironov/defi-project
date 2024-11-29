import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { type ComponentProps } from 'react'

import { TokenStatsContainerDesktop } from './TokenStatsContainerDesktop'
import { TokenStatsContainerMobile } from './TokenStatsContainerMobile'

export interface TokenStatsContainerProperties extends ComponentProps<'div'> {
  color: string
  tokenName: string
  apy?: number
  tvl?: number
  rebalancingVolume?: number
  loading?: boolean
  error?: any
  loadingVolume?: boolean
  errorVolume?: any
}

export const TokenStatsContainer = (props: TokenStatsContainerProperties) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <TokenStatsContainerMobile {...props} />
  }
  return <TokenStatsContainerDesktop {...props} />
}
