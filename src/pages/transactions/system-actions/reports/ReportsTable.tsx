/* eslint-disable react/jsx-no-useless-fragment */
import { useReports } from '@api/queries/useReports'
import Sort from '@assets/icons/sort.svg'
import type { TableFiltersType } from '@components/filters/TableFilters'
import { TableFilters } from '@components/filters/TableFilters'
import { Pagination } from '@components/pagination/Pagination'
import { Table } from '@components/table'
import { SELECT_CHAINS, SELECT_PPS, SELECT_TOKENS } from '@constants/select-constant'
import { usePages } from '@hooks/common/usePages'
import { cn } from '@utils/cn'
import { type ComponentProps, useState } from 'react'

import { ReportsTableRow, ReportsTableRowSkeleton } from './ReportsTableRow'

interface ReportsTableProperties extends ComponentProps<'div'> {}

export const ReportsTable = (props: ReportsTableProperties) => {
  const { className, ...rest } = props
  const [filters, setFilters] = useState<TableFiltersType>({
    search: { value: '', placeholder: 'Nonce / Tx Hash' },
    token: { items: SELECT_TOKENS, value: [], placeholder: 'All Tokens' },
    pps: { items: SELECT_PPS, value: [], placeholder: 'PPS' },
    chain: { items: SELECT_CHAINS, value: [], placeholder: 'All Chains' },
  })
  const { page, size, onPageChange, onPageSizeChange } = usePages()
  const { data, isLoading, error, isPlaceholderData } = useReports({
    page,
    size,
    orderBy: 'desc',
    sort: 'creation_time',
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
            <Table.HeadCell>
              <span className="inline-block align-middle">Created</span>
              <Sort className="ml-[0.79rem] inline-block h-[1.06619rem] w-[0.66175rem] shrink-0" />
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
