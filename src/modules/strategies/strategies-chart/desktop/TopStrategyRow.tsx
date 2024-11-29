import { Table } from '@components/table'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue'
import type { ComponentProps } from 'react'

import type { StrategyWithColor } from '../mobile/useMobileStrategiesChartStore'

interface TopStrategyRowProperties {
  strategy: StrategyWithColor
  i: number
}

export const TopStrategyRow = (props: TopStrategyRowProperties) => {
  const { strategy, i } = props
  return (
    <Table.Row className="*:px-5 *:py-8">
      <Table.Cell>
        <div className="flex items-center gap-[0.38rem]">
          <TokenIconComponent
            symbol={strategy.strategy.token.symbol}
            className="size-4"
          />
          <p>{strategy.strategy.token.symbol}</p>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center gap-[0.38rem]">
          <TokenIconComponent
            symbol={strategy.strategy.token.chain_id}
            className="size-4"
          />
          <p>
            {
              CHAIN_NAMES_BY_ID[
                strategy.strategy.token.chain_id as keyof typeof CHAIN_NAMES_BY_ID
              ]
            }
          </p>
        </div>
      </Table.Cell>
      <Table.Cell>
        {formatAmount(strategy.strategy.apy, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        <span className="text-text-260">%</span>
      </Table.Cell>
      <Table.Cell>
        <IconWithLabelComponent symbol={strategy.strategy.protocol} />
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center gap-[0.38rem]">
          <p className="font-medium text-text-260">#{i + 1}</p>
          <div
            className="size-2 rounded-full"
            style={{ backgroundColor: strategy.color }}
          />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}

export const TopStrategyRowSkeleton = (props: ComponentProps<'tr'>) => {
  const { className, ...rest } = props
  return (
    <Table.Row className={cn('*:px-5 *:py-8', className)} {...rest}>
      <Table.Cell>
        <Skeleton className="h-4 w-14" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-4 w-14" />
      </Table.Cell>

      <Table.Cell>
        <Skeleton className="h-4 w-14" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-4 w-14" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-4 w-5" />
      </Table.Cell>
    </Table.Row>
  )
}
