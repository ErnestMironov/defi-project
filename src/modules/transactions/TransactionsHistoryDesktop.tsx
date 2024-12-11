/* eslint-disable react/jsx-no-useless-fragment */
import type { EventsParameters } from '@api/maat-finance/useEvents'
import { useEvents } from '@api/maat-finance/useEvents'
import Sort from '@assets/icons/sort.svg'
import { getMultiSelectParameters } from '@components/filters/getMultiSelectParamsFromEntries'
import type { TableFiltersType } from '@components/filters/TableFilters'
import { TableFilters } from '@components/filters/TableFilters'
import { Pagination } from '@components/pagination/Pagination'
import { Table } from '@components/table'
import { usePages } from '@hooks/common/usePages'
import { useSort } from '@hooks/common/useSort'
import { cn } from '@utils/cn'
import { isHashOrAddress } from '@utils/hash-or-address'
import { useState } from 'react'

import {
  TransactionHistoryRow,
  TransactionHistoryRowSkeleton,
} from './TransactionHistoryRow'
import type { EventsProperties } from './Transactions'

interface TransactionsHistoryDesktopProperties extends EventsProperties {
  filters: TableFiltersType
  parameters?: EventsParameters
}

export const TransactionsHistoryDesktop = (
  props: TransactionsHistoryDesktopProperties,
) => {
  const { filters: initialFilters, className, parameters } = props
  const [filters, setFilters] = useState(initialFilters)
  const { search, ...selectFilters } = filters
  const { onPageChange, page, size, onPageSizeChange } = usePages()
  const { sort, orderBy, onSortChange } = useSort(['creation_time', 'amount'], {
    orderBy: 'desc',
    sort: 'creation_time',
  })

  const { data, isLoading, error, isPlaceholderData } = useEvents({
    size,
    page,
    sort,
    order_by: orderBy,
    hash_or_address: isHashOrAddress(search?.value)
      ? [search?.value as string]
      : undefined,
    ...getMultiSelectParameters(selectFilters),
    ...parameters,
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
          <TransactionHistoryRowSkeleton key={index} className="h-[5.4rem]" />
        ))
      }
      case data?.items?.length === 0: {
        return <Table.EmptyState>No transactions found</Table.EmptyState>
      }
      default: {
        return (
          <>
            {data?.items?.map((event, index) => (
              <TransactionHistoryRow key={index} event={event} />
            ))}
          </>
        )
      }
    }
  }
  return (
    <>
      <TableFilters filters={filters} setFilters={handleFiltersChange} />
      <Table className={cn('', className)}>
        <Table.Head>
          <Table.Row className="text-text-2100 *:py-4 *:first:pl-7 *:last:pr-7">
            <Table.HeadCell className="w-[23.5rem]">Action</Table.HeadCell>
            <Table.HeadCell
              className={cn('cursor-pointer w-[18.75rem]')}
              onClick={() => onSortChange('amount')}
            >
              <div className="flex items-center gap-[0.38rem]">
                <span>Amount</span>
                {sort === 'amount' && (
                  <Sort
                    className={cn('size-5 shrink-0', orderBy === 'desc' && 'rotate-180')}
                  />
                )}
              </div>
            </Table.HeadCell>
            <Table.HeadCell className="w-[18.75rem]">Chain</Table.HeadCell>
            <Table.HeadCell className="w-[16.25rem]">Status</Table.HeadCell>
            <Table.HeadCell className="w-[16.25rem]">From</Table.HeadCell>
            <Table.HeadCell
              className={cn('cursor-pointer w-[12.5rem]')}
              onClick={() => onSortChange('creation_time')}
            >
              <div className="flex items-center gap-[0.38rem]">
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
      {data && data.items?.length > 0 && (
        <Pagination
          className="absolute inset-x-0 -bottom-16"
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
