/* eslint-disable react/jsx-no-useless-fragment */
import { useReports } from '@api/maat-finance/useReports'
import AssetIcon from '@assets/icons/asset.svg'
import ChainIcon from '@assets/icons/chain.svg'
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
import { isHash } from '@utils/hash-or-address'
import { type ComponentProps, useState } from 'react'

import { ReportsTableRow, ReportsTableRowSkeleton } from './ReportsTableRow'

interface ReportsTableProperties extends ComponentProps<'div'> {}

export const ReportsTable = (props: ReportsTableProperties) => {
  const { className, ...rest } = props
  const [filters, setFilters] = useState<TableFiltersType>({
    search: { value: '', placeholder: 'Tx Hash' },
    chain: {
      items: SELECT_CHAINS,
      value: [],
      placeholder: 'All Chains',
      icon: <ChainIcon />,
    },
    token: {
      items: SELECT_TOKENS,
      value: [],
      placeholder: 'All Tokens',
      icon: <AssetIcon />,
    },
  })
  const { search, ...selectFilters } = filters
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
    hash: isHash(search?.value) ? search?.value : undefined,
    ...getMultiSelectParameters(selectFilters),
  })

  const handleFiltersChange = (newFilters: TableFiltersType) => {
    setFilters(newFilters)
    onPageChange(1)
  }

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
    if (data?.total_items === 0) {
      return <Table.EmptyState>No data was found</Table.EmptyState>
    }
    return (
      <>{data?.items?.map((report, i) => <ReportsTableRow report={report} key={i} />)}</>
    )
  }
  return (
    <>
      <div className={cn('', className)} {...rest}>
        <TableFilters filters={filters} setFilters={handleFiltersChange} />
        <Table className={cn(isPlaceholderData && 'animate-pulse')}>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell className="min-w-[12.1rem]">From</Table.HeadCell>
              <Table.HeadCell className="min-w-[12.1rem]">Token</Table.HeadCell>
              <Table.HeadCell className="min-w-[12.1rem]">PPS</Table.HeadCell>
              <Table.HeadCell className="min-w-[12.1rem]">Chain</Table.HeadCell>
              <Table.HeadCell
                className={cn('cursor-pointer')}
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
          <Table.Body className="[&_tr:last-child:after]:rounded-b-[1.25rem]">
            {renderBody()}
          </Table.Body>
        </Table>
      </div>
      {data && (
        <Pagination
          className="absolute -bottom-16"
          totalCount={data?.total_items}
          currentPage={page}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          size={size}
        />
      )}
    </>
  )
}
