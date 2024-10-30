/* eslint-disable react/jsx-no-useless-fragment */
import { useAdminActions } from '@api/queries/useAdminActions'
import Sort from '@assets/icons/sort.svg'
import { getMultiSelectParameters } from '@components/filters/getMultiSelectParamsFromEntries'
import type { TableFiltersType } from '@components/filters/TableFilters'
import { TableFilters } from '@components/filters/TableFilters'
import { Pagination } from '@components/pagination/Pagination'
import { Table } from '@components/table'
import { Skeleton } from '@components/ui/skeleton'
import { SELECT_ADMIN_ACTION_TYPES, SELECT_CHAINS } from '@constants/select-constant'
import { usePages } from '@hooks/common/usePages'
import { useSort } from '@hooks/common/useSort'
import { cn } from '@utils/cn'
import { isHash } from '@utils/hash-or-address'
import { type ComponentProps, useState } from 'react'

import { AdminTableRow } from './AdminTableRow'

interface AdminTableProperties extends ComponentProps<'div'> {}

export const AdminTable = (props: AdminTableProperties) => {
  const { className, ...rest } = props
  const [filters, setFilters] = useState<TableFiltersType>({
    search: { value: '', placeholder: 'Tx Hash' },
    actions_type: {
      items: SELECT_ADMIN_ACTION_TYPES,
      value: [],
      placeholder: 'All Actions',
    },
    // from: { items: SELECT_ADMIN_FROM, value: [], placeholder: 'From...' },
    chain: { items: SELECT_CHAINS, value: [], placeholder: 'All Chains' },
  })
  const { search, ...selectFilters } = filters
  const { page, size, onPageChange, onPageSizeChange } = usePages()
  const { sort, orderBy, onSortChange } = useSort(['creation_time', 'amount'], {
    orderBy: 'desc',
    sort: 'creation_time',
  })
  const { data, isLoading, error, isPlaceholderData } = useAdminActions({
    page,
    size,
    order_by: orderBy,
    sort,
    hash: isHash(search?.value) ? search?.value : undefined,
    ...getMultiSelectParameters(selectFilters),
  })

  const handleFiltersChange = (newFilters: TableFiltersType) => {
    setFilters(newFilters)
    onPageChange(1)
  }

  const renderBody = () => {
    if (isLoading || !!error) {
      return (
        <>
          {Array.from({ length: size })?.map((_, index) => (
            <AdminTableRowSkeleton key={index} />
          ))}
        </>
      )
    }
    if (data?.total_items === 0) {
      return <Table.EmptyState>No data was found</Table.EmptyState>
    }
    return (
      <>
        {data?.items?.map((item) => <AdminTableRow key={item.hash} adminEvent={item} />)}
      </>
    )
  }

  return (
    <div className={cn('', className)} {...rest}>
      <TableFilters filters={filters} setFilters={handleFiltersChange} />
      <Table className={cn('', isPlaceholderData && 'animate-pulse')}>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Function</Table.HeadCell>
            <Table.HeadCell>From</Table.HeadCell>
            <Table.HeadCell>To</Table.HeadCell>
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
      {data && data?.total_items > 0 && (
        <Pagination
          className="mt-6"
          totalCount={data.total_items}
          currentPage={page}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          size={size}
        />
      )}
    </div>
  )
}

const AdminTableRowSkeleton = () => {
  return (
    <Table.Row>
      <Table.Cell>
        <Skeleton className="h-10 w-40 rounded-xl" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-10 w-40 rounded-xl" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-10 w-40 rounded-xl" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-10 w-40 rounded-xl" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-10 w-40 rounded-xl" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-10 w-40 rounded-xl" />
      </Table.Cell>
    </Table.Row>
  )
}
