import { useStrategies } from '@api/queries/useStrategies'
import type { StrategyStats } from '@codegen/graphql'
import { Table } from '@components/table'
import { Button } from '@components/ui/button'
import { Logo } from '@components/ui/logo'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import { useNavigate } from 'react-router-dom'

import { StrategyRow } from './StrategiesDsktopRow'

export const StrategiesDesktop: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props,
) => {
  const navigate = useNavigate()
  const { data, loading, error } = useStrategies()
  const renderBody = () => {
    switch (true) {
      case loading:
      case !!error: {
        return <StrategySkeletonDesktop {...props} />
      }
      default: {
        return (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeadCell>Token</Table.HeadCell>
                <Table.HeadCell>Chain</Table.HeadCell>
                <Table.HeadCell>Protocol</Table.HeadCell>
                <Table.HeadCell>Projected APY</Table.HeadCell>
                <Table.HeadCell>TVL</Table.HeadCell>
                <Table.HeadCell>Strategy ID</Table.HeadCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {(data?.strategyStats as StrategyStats[])?.map((strategy, index) => {
                return <StrategyRow key={index} strategy={strategy} />
              })}
            </Table.Body>
          </Table>
        )
      }
    }
  }
  return (
    <div {...props} className={cn('flex flex-col gap-6', props.className)}>
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-6 text-[2.1875rem] font-normal uppercase not-italic leading-[100%]">
          <Logo />
          Strategies
        </h2>
        <Button onClick={() => navigate('/')}>DEPOSIT</Button>
      </div>
      {renderBody()}
    </div>
  )
}

const StrategySkeletonDesktop: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  _props,
) => {
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>Token</Table.HeadCell>
          <Table.HeadCell>Chain</Table.HeadCell>
          <Table.HeadCell>Protocol</Table.HeadCell>
          <Table.HeadCell>Projected APY</Table.HeadCell>
          <Table.HeadCell>TVL</Table.HeadCell>
          <Table.HeadCell>Strategy ID</Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {Array.from({ length: 4 })?.map((_, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>
                <Skeleton className="size-10 w-20" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="size-10 w-36" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="size-10 w-36" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-10 w-20" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-10 w-20" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-10 w-20" />
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}
