/* eslint-disable react/jsx-no-useless-fragment */
import { useIncentives } from '@api/maat-finance/useIncentives'
import Sort from '@assets/icons/sort.svg'
import { getMultiSelectParameters } from '@components/filters/getMultiSelectParamsFromEntries'
import type { TableFiltersType } from '@components/filters/TableFilters'
import { TableFilters } from '@components/filters/TableFilters'
import { Pagination } from '@components/pagination/Pagination'
import { Table } from '@components/table'
import { Skeleton } from '@components/ui/skeleton'
import { usePages } from '@hooks/common/usePages'
import { useSort } from '@hooks/common/useSort'
import { cn } from '@utils/cn'
import { isHash } from '@utils/hash-or-address'
import type { ComponentProps } from 'react'
import { useState } from 'react'

import { IncentiveRow } from './IncentiveRow'

interface IncentivesHistoryProperties extends ComponentProps<'div'> {
  filters: TableFiltersType
}

export const IncentivesHistoryDesktop: React.FC<IncentivesHistoryProperties> = (
  props,
) => {
  const { filters: initialFilters, className } = props
  const [filters, setFilters] = useState(initialFilters)
  const { search, ...selectFilters } = filters
  const { onPageChange, page, size, onPageSizeChange } = usePages()
  const { sort, orderBy, onSortChange } = useSort(['creation_time', 'amount'], {
    orderBy: 'desc',
    sort: 'creation_time',
  })
  const { data, isLoading, error, isPlaceholderData } = useIncentives({
    size,
    page,
    limit: 100,
    sort,
    hash: isHash(search?.value) ? search?.value : undefined,
    order_by: orderBy,
    ...getMultiSelectParameters(selectFilters),
  })

  const renderBody = () => {
    switch (true) {
      case isLoading:
      case isPlaceholderData:
      case !!error: {
        return Array.from({ length: size }).map((_, index) => (
          <TransactionsHistoryDesktopSkeleton key={index} count={size} {...props} />
        ))
      }

      default: {
        return (
          <>
            {data?.items?.map((event, index) => (
              <IncentiveRow key={index} event={event} />
            ))}
          </>
        )
      }
    }
  }
  return (
    <div {...props} className={cn('', className)}>
      <TableFilters filters={filters} setFilters={setFilters} />
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Action</Table.HeadCell>
            <Table.HeadCell>From</Table.HeadCell>
            <Table.HeadCell
              className={cn('cursor-pointer')}
              onClick={() => onSortChange('amount')}
            >
              <div className="flex items-center gap-[0.79rem]">
                <span>Amount</span>
                {sort === 'amount' && (
                  <Sort
                    className={cn('size-5 shrink-0', orderBy === 'desc' && 'rotate-180')}
                  />
                )}
              </div>
            </Table.HeadCell>
            <Table.HeadCell>Chain</Table.HeadCell>
            <Table.HeadCell>Tx Hash</Table.HeadCell>
            <Table.HeadCell
              className={cn('cursor-pointer')}
              onClick={() => onSortChange('creation_time')}
            >
              <div className="flex items-center gap-[0.79rem]">
                <span>Created</span>
                {sort === 'creation_time' && (
                  <Sort
                    className={cn('size-5 shrink-0', orderBy === 'desc' && 'rotate-180')}
                  />
                )}
              </div>
            </Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>{renderBody()}</Table.Body>
      </Table>
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
> = (_props) => {
  return (
    <Table.Row>
      <Table.Cell>
        <Skeleton className="h-10 w-full rounded-xl" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-10 w-full rounded-xl" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-10 w-full rounded-xl" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-10 w-full rounded-xl" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-10 w-full rounded-xl" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-10 w-full rounded-xl" />
      </Table.Cell>
    </Table.Row>
  )
}
