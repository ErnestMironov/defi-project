/* eslint-disable react/jsx-no-useless-fragment */
import type { EventsParameters } from '@api/queries/useEvents'
import { useEvents } from '@api/queries/useEvents'
import Sort from '@assets/icons/sort.svg'
import { getMultiSelectParameters } from '@components/filters/getMultiSelectParamsFromEntries'
import type { TableFiltersType } from '@components/filters/TableFilters'
import { TableFilters } from '@components/filters/TableFilters'
import { Pagination } from '@components/pagination/Pagination'
import { SectionTitle } from '@components/section/SectionTitle'
import { Table } from '@components/table'
import { usePages } from '@hooks/common/usePages'
import { useSort } from '@hooks/common/useSort'
import { cn } from '@utils/cn'
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
  const { search: _search, ...selectFilters } = filters

  const { onPageChange, page, size, onPageSizeChange } = usePages()
  const { sort, orderBy, onSortChange } = useSort(['creation_time', 'amount'], {
    orderBy: 'desc',
    sort: 'creation_time',
  })

  const { data, isLoading, error, isPlaceholderData } = useEvents({
    size,
    page,
    sort,
    orderBy,
    ...getMultiSelectParameters(selectFilters),
    ...parameters,
  })

  console.log('🚀 ~ isLoading:', isLoading)
  console.log('🚀 ~ isPlaceholderData:', isPlaceholderData)
  console.log('🚀 ~ error:', error)

  const renderBody = () => {
    switch (true) {
      case isLoading:
      case isPlaceholderData:
      case !!error: {
        return Array.from({ length: size }).map((_, index) => (
          <TransactionHistoryRowSkeleton key={index} />
        ))
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
    <div {...props} className={cn('', className)}>
      <SectionTitle>Events</SectionTitle>
      <TableFilters filters={filters} setFilters={setFilters} />
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Action</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
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
            <Table.HeadCell>From</Table.HeadCell>
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
