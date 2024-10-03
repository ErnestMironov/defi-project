/* eslint-disable react/jsx-no-useless-fragment */
import { useReports } from '@api/queries/useReports'
import Sort from '@assets/icons/sort.svg'
import { getMultiSelectParameters } from '@components/filters/getMultiSelectParamsFromEntries'
import type { TableFiltersType } from '@components/filters/TableFilters'
import { TableFilters } from '@components/filters/TableFilters'
import { Pagination } from '@components/pagination/Pagination'
import { Table } from '@components/table'
import { SELECT_CHAINS, SELECT_TOKENS } from '@constants/select-constant'
import { usePages } from '@hooks/common/usePages'
import { useSort } from '@hooks/common/useSort'
import { cn } from '@utils/cn'
import { type ComponentProps, useState } from 'react'

import { ReportsTableRow, ReportsTableRowSkeleton } from './ReportsTableRow'

interface ReportsTableProperties extends ComponentProps<'div'> {}

export const ReportsTable = (props: ReportsTableProperties) => {
  const { className, ...rest } = props
  const [filters, setFilters] = useState<TableFiltersType>({
    search: { value: '', placeholder: 'Nonce / Tx Hash' },
    token: { items: SELECT_TOKENS, value: [], placeholder: 'All Tokens' },
    chain: { items: SELECT_CHAINS, value: [], placeholder: 'All Chains' },
  })
  const { search: _search, ...selectFilters } = filters
  const { page, size, onPageChange, onPageSizeChange } = usePages()
  const { sort, orderBy, onSortChange } = useSort(['creation_time'], {
    orderBy: 'desc',
    sort: 'creation_time',
  })
  const { data, isLoading, error, isPlaceholderData } = useReports({
    page,
    size,
    order_by: orderBy,
    sort,
    ...getMultiSelectParameters(selectFilters),
  })

  const renderBody = () => {
    if (isLoading || error) {
      return (
        <>
          {Array.from({ length: size }).map((_, index) => (
            <ReportsTableRowSkeleton key={index} />
          ))}
        </>
      )
    }
    return (
      <>{data?.items?.map((report, i) => <ReportsTableRow report={report} key={i} />)}</>
    )
  }
  return (
    <div className={cn('', className)} {...rest}>
      <TableFilters filters={filters} setFilters={setFilters} />
      <Table className={cn(isPlaceholderData && 'animate-pulse')}>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>From</Table.HeadCell>
            <Table.HeadCell>Token</Table.HeadCell>
            <Table.HeadCell>PPS</Table.HeadCell>
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
          totalCount={data?.total_items}
          currentPage={page}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          size={size}
        />
      )}
    </div>
  )
}
