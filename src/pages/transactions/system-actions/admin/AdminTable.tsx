/* eslint-disable react/jsx-no-useless-fragment */
import { useAdminActions } from '@api/queries/useAdminActions'
import Sort from '@assets/icons/sort.svg'
import type { TableFiltersType } from '@components/filters/TableFilters'
import { TableFilters } from '@components/filters/TableFilters'
import { Pagination } from '@components/pagination/Pagination'
import { Table } from '@components/table'
import { Skeleton } from '@components/ui/skeleton'
import {
  SELECT_ADMIN_FROM,
  SELECT_ADMIN_FUNCTIONS,
  SELECT_CHAINS,
} from '@constants/select-constant'
import { usePages } from '@hooks/common/usePages'
import { cn } from '@utils/cn'
import { type ComponentProps, useState } from 'react'

import { AdminTableRow } from './AdminTableRow'

interface AdminTableProperties extends ComponentProps<'div'> {}

export const AdminTable = (props: AdminTableProperties) => {
  const { className, ...rest } = props
  const [filters, setFilters] = useState<TableFiltersType>({
    search: { value: '', placeholder: 'Tx Hash / Arguments' },
    functions: { items: SELECT_ADMIN_FUNCTIONS, value: [], placeholder: 'All Functions' },
    from: { items: SELECT_ADMIN_FROM, value: [], placeholder: 'From...' },
    chain: { items: SELECT_CHAINS, value: [], placeholder: 'All Chains' },
  })
  const { page, size, onPageChange, onPageSizeChange } = usePages()
  const { data, isLoading, error } = useAdminActions({ page, size })
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
    return (
      <>
        {data?.items?.map((item) => <AdminTableRow key={item.hash} adminEvent={item} />)}
      </>
    )
  }

  return (
    <div className={cn('', className)} {...rest}>
      <TableFilters filters={filters} setFilters={setFilters} />
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Function</Table.HeadCell>
            <Table.HeadCell>From</Table.HeadCell>
            <Table.HeadCell>To</Table.HeadCell>
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
        <Table.Body>{renderBody()}</Table.Body>
      </Table>
      {data && (
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
