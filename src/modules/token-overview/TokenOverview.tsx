import usdc from '@assets/images/usdc-3d.png'
import usdt from '@assets/images/usdt-3d.png'
import { cn } from '@utils/cn'
import { type ComponentProps } from 'react'

import { TokenStatsContainer } from './TokenStatsContainer'

interface TokenOverviewProperties extends ComponentProps<'div'> {}

export const TokenOverview = (props: TokenOverviewProperties) => {
  const { className, ...rest } = props
  return (
    <section
      className={cn(
        className,
        'flex gap-8 max-lg:gap-2 max-lg:flex-col w-full max-lg:-mx-4',
      )}
      {...rest}
    >
      <TokenStatsContainer
        color="#3883EB"
        apy="3.34"
        tvl="567.83"
        rebalancingVolume="4586.74"
        tokenName="USDC"
        img={usdc}
        imageClassName="rotate-[5.207deg]"
      />
      <TokenStatsContainer
        color="#4CD7B1"
        apy="3.34"
        tvl="567.83"
        rebalancingVolume="4586.74"
        tokenName="USDT"
        img={usdt}
        imageClassName="rotate-[-5.207deg] right-[-7.5rem]"
      />
    </section>
  )
}
