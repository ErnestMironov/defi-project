/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Table } from '@components/table'
import { Button } from '@components/ui/button'
import { Logo } from '@components/ui/logo'
import useDeviceWidth from '@hooks/useDeviceWidth'
import { cn } from '@utils/cn'

import { StrategyMobileCard } from './StrategyMobileCard'

export type StrategyType = {
  token: string
  chain: string
  protocol: string
  projectedApy: string | number
  tvl: string | number
}

const defaultData: StrategyType[] = [
  {
    token: 'USDT',
    chain: 'Ethereum',
    protocol: 'Compound',
    projectedApy: 5,
    tvl: 100,
  },
  {
    token: 'USDT',
    chain: 'Base',
    protocol: 'Aave',
    projectedApy: 3,
    tvl: 200,
  },
  {
    token: 'USDC',
    chain: 'Arbitrum',
    protocol: 'Yearn',
    projectedApy: 7,
    tvl: 30_000_102,
  },
]

export const Strategies: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <StrategiesMobile {...props} />
  }
  return <StrategiesDesktop {...props} />
}

export const StrategiesMobile: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props,
) => {
  return (
    <div {...props} className={cn('flex flex-col gap-6', props.className)}>
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-4 text-2xl uppercase">
          <Logo className="h-[1.625rem] w-[2.0625rem] overflow-visible" />
          Strategies
        </h2>
      </div>
      <div className="rounded-3xl bg-cards px-5 py-6">
        {defaultData.map((strategy, index, array) => (
          <StrategyMobileCard
            key={index}
            strategy={strategy}
            isLast={index === array.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

export const StrategiesDesktop: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props,
) => {
  return (
    <div {...props} className={cn('flex flex-col gap-6', props.className)}>
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-6 text-[2.1875rem] font-normal uppercase not-italic leading-[100%]">
          <Logo />
          Strategies
        </h2>
        <Button>DEPOSIT</Button>
      </div>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell className="w-48">Token</Table.HeadCell>
            <Table.HeadCell className="w-48">Chain</Table.HeadCell>
            <Table.HeadCell>Protocol</Table.HeadCell>
            <Table.HeadCell>Projected APY</Table.HeadCell>
            <Table.HeadCell className="w-48">TVL</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {defaultData.map((strategy, index) => (
            <Table.Row key={index}>
              <Table.Cell>{strategy.token}</Table.Cell>
              <Table.Cell>{strategy.chain}</Table.Cell>
              <Table.Cell>{strategy.protocol}</Table.Cell>
              <Table.Cell>{strategy.projectedApy}</Table.Cell>
              <Table.Cell>{strategy.tvl}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
