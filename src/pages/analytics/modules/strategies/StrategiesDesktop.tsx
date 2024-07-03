import { useStrategies } from '@api/queries/useStrategies'
import type { StrategyStats } from '@codegen/graphql'
import { Table } from '@components/table'
import { IconWithLabelComponent } from '@components/token-icon'
import { Button } from '@components/ui/button'
import { Logo } from '@components/ui/logo'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import { formatAmountValue } from '@utils/formatValue'
import BigNumber from 'bignumber.js'
import { useNavigate } from 'react-router-dom'

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
          <Table.HeadCell className="w-48">Token</Table.HeadCell>
          <Table.HeadCell className="w-48">Chain</Table.HeadCell>
          <Table.HeadCell>Protocol</Table.HeadCell>
          <Table.HeadCell>Projected APY</Table.HeadCell>
          <Table.HeadCell className="w-48">TVL</Table.HeadCell>
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
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}
