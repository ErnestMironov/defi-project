import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { type ComponentProps } from 'react'

import { TokenStatsContainerDesktop } from './TokenStatsContainerDesktop'
import { TokenStatsContainerMobile } from './TokenStatsContainerMobile'

export interface TokenStatsContainerProperties extends ComponentProps<'div'> {
  color: string
  tokenName: string
  apy?: string
  tvl?: string
  rebalancingVolume?: number
  img: string
  imageClassName?: string
  withLink?: boolean
  loading?: boolean
  error?: any
}

export const TokenStatsContainer = (props: TokenStatsContainerProperties) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <TokenStatsContainerMobile {...props} />
  }
  return <TokenStatsContainerDesktop {...props} />
}
