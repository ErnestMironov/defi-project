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

  return (
    <section
      className={cn(
        className,
        'flex gap-8 max-lg:gap-2 max-lg:flex-col w-full max-lg:-mx-4',
      )}
      {...rest}
    >
      <TokenStatsContainer
        loading={isLoading}
        error={error}
        color="#3883EB"
        apy="3.34"
        tvl="567.83"
        rebalancingVolume={data?.USDC.volume}
        tokenName="USDC"
        img={usdc}
        imageClassName="rotate-[5.207deg]"
      />
      <TokenStatsContainer
        loading={isLoading}
        error={error}
        color="#4CD7B1"
        apy="3.34"
        tvl="567.83"
        rebalancingVolume={data?.USDT.volume}
        tokenName="USDT"
        img={usdt}
        imageClassName="rotate-[-5.207deg] right-[-7.5rem]"
      />
    </section>
  )
}
