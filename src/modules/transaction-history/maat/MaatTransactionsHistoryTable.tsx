import { useEvents } from '@api/queries/useEvents'
import Sort from '@assets/icons/sort.svg'
import type { TableFiltersType } from '@components/filters/TableFilters'
import { TableFilters } from '@components/filters/TableFilters'
import { Pagination } from '@components/pagination/Pagination'
import { Table } from '@components/table'
import { Skeleton } from '@components/ui/skeleton'
import { usePages } from '@hooks/common/usePages'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { useState } from 'react'

import { MaatTransactionHistoryRow } from './MaatTransactionHistoryRow'

interface TransactionsHistoryProperties extends ComponentProps<'div'> {
  filters: TableFiltersType
}

export const MaatTransactionsHistoryTable: React.FC<TransactionsHistoryProperties> = (
  props,
) => {
  const { filters: initialFilters, className } = props
  const [filters, setFilters] = useState(initialFilters)

  const { onPageChange, page, size, onPageSizeChange } = usePages()
  const { data, isLoading, error, isPlaceholderData } = useEvents({
    size,
    page,
    action_type: null,
    limit: 100,
  })

  const renderBody = () => {
    switch (true) {
      case isLoading:
      case isPlaceholderData:
      case !!error: {
        return <TransactionsHistoryDesktopSkeleton count={size} {...props} />
      }
      default: {
        return (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeadCell>Action</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>
                  <div className="flex items-center gap-[0.79rem]">
                    <span>Amount</span>
                    <Sort className="h-[1.06619rem] w-[0.66175rem] shrink-0" />
                  </div>
                </Table.HeadCell>
                <Table.HeadCell>Chain</Table.HeadCell>
                <Table.HeadCell>Tx Hash</Table.HeadCell>
                <Table.HeadCell>
                  <div className="flex items-center gap-[0.79rem]">
                    <span>Created</span>
                    <Sort className="h-[1.06619rem] w-[0.66175rem] shrink-0" />
                  </div>
                </Table.HeadCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {data?.items?.map((event, index) => (
                <MaatTransactionHistoryRow key={index} event={event} />
              ))}
            </Table.Body>
          </Table>
        )
      }
    }
  }
  return (
    <div {...props} className={cn('', className)}>
      <TableFilters filters={filters} setFilters={setFilters} />
      {renderBody()}
      {data && (
        <Pagination
          className="mt-6"
          currentPage={page}
          totalCount={data.total_items}
          onPageChange={onPageChange}
          size={size}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  )
}

const TransactionsHistoryDesktopSkeleton: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { count?: number }
> = (props) => {
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>Action</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>
            <div className="flex items-center gap-[0.79rem]">
              <span>Amount</span>
              <Sort className="h-[1.06619rem] w-[0.66175rem] shrink-0" />
            </div>
          </Table.HeadCell>
          <Table.HeadCell>Chain</Table.HeadCell>
          <Table.HeadCell>Tx Hash</Table.HeadCell>
          <Table.HeadCell>
            <div className="flex items-center gap-[0.79rem]">
              <span>Created</span>
              <Sort className="h-[1.06619rem] w-[0.66175rem] shrink-0" />
            </div>
          </Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {Array.from({ length: props.count || 4 })?.map((_, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <Skeleton className="h-10 w-40 rounded-xl" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton className="h-10 w-20 rounded-xl" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton className="h-10 w-60 rounded-xl" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton className="w-30 h-10 rounded-xl" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton className="h-10 w-24 rounded-xl" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton className="h-10 w-20 rounded-xl" />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
