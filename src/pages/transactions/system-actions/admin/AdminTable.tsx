import Sort from '@assets/icons/sort.svg'
import type { TableFiltersType } from '@components/filters/TableFilters'
import { TableFilters } from '@components/filters/TableFilters'
import { Pagination } from '@components/pagination/Pagination'
import { Table } from '@components/table'
import {
  SELECT_ADMIN_FROM,
  SELECT_ADMIN_FUNCTIONS,
  SELECT_CHAINS,
} from '@constants/select-constant'
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
  const renderBody = () => {
    return (
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Function</Table.HeadCell>
            <Table.HeadCell>From</Table.HeadCell>
            <Table.HeadCell>To</Table.HeadCell>
            <Table.HeadCell>Arguments</Table.HeadCell>
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
          {Array.from({ length: 7 })?.map((_, index) => <AdminTableRow key={index} />)}
        </Table.Body>
      </Table>
    )
  }

  return (
    <div className={cn('', className)} {...rest}>
      <TableFilters filters={filters} setFilters={setFilters} />
      {renderBody()}
      <Pagination
        className="mt-6"
        totalCount={100}
        currentPage={1}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
        size={10}
      />
    </div>
  )
}
