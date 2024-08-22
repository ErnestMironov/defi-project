import Sort from '@assets/icons/sort.svg'
import type { TableFiltersType } from '@components/filters/TableFilters'
import { TableFilters } from '@components/filters/TableFilters'
import { Pagination } from '@components/pagination/Pagination'
import { Table } from '@components/table'
import {
  SELECT_ADMIN_FROM,
  SELECT_ADMIN_FUNCTIONS,
  SELECT_CHAINS,
} from '@pages/analytics/constants/select-constant'
import { cn } from '@utils/cn'
import { type ComponentProps, useState } from 'react'

import { IncentivesTableRow } from './IncentivesTableRow'

interface IncentivesTableProperties extends ComponentProps<'div'> {}

export const IncentivesTable = (props: IncentivesTableProperties) => {
  const { className, ...rest } = props
  const [filters, setFilters] = useState<TableFiltersType>({
    search: { value: '', placeholder: 'Tx Hash' },
    functions: { items: SELECT_ADMIN_FUNCTIONS, value: SELECT_ADMIN_FUNCTIONS[0] },
    from: { items: SELECT_ADMIN_FROM, value: SELECT_ADMIN_FROM[0] },
    chain: { items: SELECT_CHAINS, value: SELECT_CHAINS[0] },
  })
  const renderBody = () => {
    return (
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Action</Table.HeadCell>
            <Table.HeadCell>From</Table.HeadCell>
            <Table.HeadCell>
              <div className="flex items-center gap-[0.79rem]">
                <span>Amount</span>
                <Sort className="h-[1.06619rem] w-[0.66175rem] shrink-0" />
              </div>
            </Table.HeadCell>
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
          {Array.from({ length: 7 })?.map((_, index) => (
            <IncentivesTableRow key={index} />
          ))}
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
        onPerPageChange={() => {}}
        perPage={10}
      />
    </div>
  )
}
