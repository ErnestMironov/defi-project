/* eslint-disable react/jsx-no-useless-fragment */
import { useIncentives } from '@api/maat-finance/useIncentives'
import Sort from '@assets/icons/sort.svg'
import { getMultiSelectParameters } from '@components/filters/getMultiSelectParamsFromEntries'
import type { TableFiltersType } from '@components/filters/TableFilters'
import { TableFilters } from '@components/filters/TableFilters'
import { Pagination } from '@components/pagination/Pagination'
import { Table } from '@components/table'
import { usePages } from '@hooks/common/usePages'
import { useSort } from '@hooks/common/useSort'
import { cn } from '@utils/cn'
import { isHash } from '@utils/hash-or-address'
import type { ComponentProps } from 'react'
import { useState } from 'react'

import { IncentiveRow, IncentivesRowSkeleton } from './IncentiveRow'

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

  const handleFiltersChange = (newFilters: TableFiltersType) => {
    setFilters(newFilters)
    onPageChange(1)
  }

  const renderBody = () => {
    switch (true) {
      case isLoading:
      case isPlaceholderData:
      case !!error: {
        return Array.from({ length: size }).map((_, index) => (
          <IncentivesRowSkeleton key={index} />
        ))
      }
      case data?.items?.length === 0: {
        return <Table.EmptyState>No incentives data were found</Table.EmptyState>
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
    <>
      <div {...props} className={cn('', className)}>
        <TableFilters filters={filters} setFilters={handleFiltersChange} />
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell className="w-[29.75rem]">Action</Table.HeadCell>
              <Table.HeadCell
                className={cn('cursor-pointer w-[18.75rem]')}
                onClick={() => onSortChange('amount')}
              >
                <div className="flex items-center gap-[0.38rem]">
                  <span>Amount</span>
                  {sort === 'amount' && (
                    <Sort
                      className={cn(
                        'size-5 shrink-0',
                        orderBy === 'desc' && 'rotate-180',
                      )}
                    />
                  )}
                </div>
              </Table.HeadCell>
              <Table.HeadCell className="w-[18.75rem]">From</Table.HeadCell>
              <Table.HeadCell className="w-[18.75rem]">Chain</Table.HeadCell>
              <Table.HeadCell
                className={cn('cursor-pointer w-[15rem]')}
                onClick={() => onSortChange('creation_time')}
              >
                <div className="flex items-center gap-[0.38rem]">
                  <span>Created</span>
                  {sort === 'creation_time' && (
                    <Sort
                      className={cn(
                        'size-5 shrink-0',
                        orderBy === 'desc' && 'rotate-180',
                      )}
                    />
                  )}
                </div>
              </Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body className="[&_tr:last-child:after]:h-[calc(100%-6px)] [&_tr:last-child:after]:rounded-b-[1.25rem]">
            {renderBody()}
          </Table.Body>
        </Table>
      </div>
      {data && data.items?.length > 0 && (
        <Pagination
          className="absolute -bottom-16"
          currentPage={page}
          totalCount={data.total_items}
          onPageChange={onPageChange}
          size={size}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </>
  )
}
