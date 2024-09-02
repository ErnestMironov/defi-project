import { useStrategies } from '@api/queries/useStrategies'
import Sort from '@assets/icons/sort.svg'
import type { StrategyStats } from '@codegen/graphql'
import { TableFilters } from '@components/filters/TableFilters'
import { Pagination } from '@components/pagination/Pagination'
import { SectionTitle } from '@components/section/SectionTitle'
import { Table } from '@components/table'
import { Button } from '@components/ui/button'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { StrategiesProperties } from './Strategies'
import { StrategyRow } from './StrategiesDesktopRow'

interface StrategiesDesktopProperties extends StrategiesProperties {}

export const StrategiesDesktop: React.FC<StrategiesDesktopProperties> = (props) => {
  const { filters: initialFilters, className, withLink = false } = props
  const [filters, setFilters] = useState(initialFilters)
  const navigate = useNavigate()
  const { data, loading, error } = useStrategies()

  const renderBody = () => {
    switch (true) {
      case loading:
      case !!error: {
        return <StrategySkeletonDesktop />
      }
      default: {
        return (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeadCell>Strategy ID</Table.HeadCell>
                <Table.HeadCell>Token</Table.HeadCell>
                <Table.HeadCell>Chain</Table.HeadCell>
                <Table.HeadCell>Protocol</Table.HeadCell>
                <Table.HeadCell>
                  <div className="inline-flex items-center gap-[0.79rem]">
                    <span>APY</span>
                    <Sort className="h-[1.06619rem] w-[0.66175rem] shrink-0" />
                  </div>
                </Table.HeadCell>
                <Table.HeadCell>
                  <div className="inline-flex items-center gap-[0.79rem]">
                    <span>TVL</span>
                    <Sort className="h-[1.06619rem] w-[0.66175rem] shrink-0" />
                  </div>
                </Table.HeadCell>
                <Table.HeadCell>Address</Table.HeadCell>
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
    <section {...props} className={cn('', className)}>
      <div className="flex items-center justify-between">
        <SectionTitle>Strategies</SectionTitle>
        {withLink && (
          <Button onClick={() => navigate('/strategies')}>Go to strategies</Button>
        )}
      </div>
      <TableFilters filters={filters} setFilters={setFilters} />
      {renderBody()}
      <Pagination
        className="mt-8"
        currentPage={1}
        totalCount={50}
        onPageChange={() => {}}
        perPage={10}
        onPerPageChange={() => {}}
      />
    </section>
  )
}

const StrategySkeletonDesktop: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  _props,
) => {
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>Strategy ID</Table.HeadCell>
          <Table.HeadCell>Token</Table.HeadCell>
          <Table.HeadCell>Chain</Table.HeadCell>
          <Table.HeadCell>Protocol</Table.HeadCell>
          <Table.HeadCell>APY</Table.HeadCell>
          <Table.HeadCell>TVL</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {Array.from({ length: 6 })?.map((_, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>
                <Skeleton className="h-9 w-[9.9rem]" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-9 w-36" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-9 w-36" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-9 w-20" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-9 w-20" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-9 w-20" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-9 w-[9.9rem]" />
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}
