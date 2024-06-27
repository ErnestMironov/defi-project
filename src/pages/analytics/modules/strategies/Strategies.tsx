/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useStrategies } from '@api/queries/getStrategies'
import type { StrategyStats } from '@codegen/graphql'
import { Table } from '@components/table'
import { IconWithLabelComponent } from '@components/token-icon'
import { Button } from '@components/ui/button'
import { Logo } from '@components/ui/logo'
import useDeviceWidth from '@hooks/useDeviceWidth'
import { cn } from '@utils/cn'
import { formatAmountValue } from '@utils/formatValue'
import BigNumber from 'bignumber.js'

import { StrategyMobileCard } from './StrategyMobileCard'

export type StrategyType = {
  token: string
  chain: string
  protocol: string
  projectedApy: string | number
  tvl: string | number
}

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
  const { data, loading, error } = useStrategies()
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  return (
    <div {...props} className={cn('flex flex-col gap-6', props.className)}>
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-4 text-2xl uppercase">
          <Logo className="h-[1.625rem] w-[2.0625rem] overflow-visible" />
          Strategies
        </h2>
      </div>
      <div className="rounded-3xl bg-cards px-5 py-6">
        {(data?.strategyStats as StrategyStats[]).map((strategy, index, array) => (
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
  const { data, loading, error } = useStrategies()
  if (loading) return '...'
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

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
          {(data?.strategyStats as StrategyStats[])?.map((strategy, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <IconWithLabelComponent
                    symbol={strategy?.tokenSymbol}
                    className="size-10"
                  />
                </Table.Cell>
                <Table.Cell>
                  <IconWithLabelComponent
                    symbol={strategy?.chainName}
                    className="size-10"
                  />
                </Table.Cell>
                <Table.Cell>
                  <IconWithLabelComponent
                    symbol={strategy.protocol}
                    className="size-10"
                  />
                </Table.Cell>
                <Table.Cell>{strategy.apy.toFixed(2)}%</Table.Cell>
                <Table.Cell>
                  $
                  {formatAmountValue(
                    BigNumber(strategy.deposited)
                      .div(10 ** strategy.decimals)
                      ?.toString(),
                    2,
                  )}
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}
