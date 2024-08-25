import Sort from '@assets/icons/sort.svg'
import type { TableFiltersType } from '@components/filters/TableFilters'
import { TableFilters } from '@components/filters/TableFilters'
import { Pagination } from '@components/pagination/Pagination'
import { Table } from '@components/table'
import {
  SELECT_CHAINS,
  SELECT_PPS,
  SELECT_TOKENS,
} from '@pages/analytics/constants/select-constant'
import { cn } from '@utils/cn'
import { type ComponentProps, useState } from 'react'

import { ReportsTableRow } from './ReportsTableRow'

interface ReportsTableProperties extends ComponentProps<'div'> {}

export const ReportsTable = (props: ReportsTableProperties) => {
  const { className, ...rest } = props
  const [filters, setFilters] = useState<TableFiltersType>({
    search: { value: '', placeholder: 'Nonce / Tx Hash' },
    token: { items: SELECT_TOKENS, value: SELECT_TOKENS[0] },
    pps: { items: SELECT_PPS, value: SELECT_PPS[0] },
    chain: { items: SELECT_CHAINS, value: SELECT_CHAINS[0] },
  })
  const renderBody = () => {
    return (
      <Table>
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
        <Table.Body>
          {Array.from({ length: 7 })?.map((_, index) => <ReportsTableRow key={index} />)}
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
