import { useTxHistoryDesktop } from '@api/queries/useTxHistoryDesktop'
import Sort from '@assets/icons/sort.svg'
import { TableFilters } from '@components/filters/TableFilters'
import { Pagination } from '@components/pagination/Pagination'
import { SectionTitle } from '@components/section/SectionTitle'
import { Table } from '@components/table'
import { Skeleton } from '@components/ui/skeleton'
import { PER_PAGE_ARRAY } from '@constants/per-page-array'
import { cn } from '@utils/cn'
import { useEffect, useState } from 'react'

import type { EventsProperties } from './Events'
import { TransactionHistoryRow } from './TransactionHistoryRow'

export const TransactionsHistoryDesktop = (props: EventsProperties) => {
  const { filters: initialFilters, className } = props
  const [filters, setFilters] = useState(initialFilters)

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState<(typeof PER_PAGE_ARRAY)[number]>(
    PER_PAGE_ARRAY[0],
  )

  const { data, loading, error, totalCount } = useTxHistoryDesktop({
    perPage,
    page: currentPage,
  })
  const [totalCountMemo, setTotalCountMemo] = useState<number | undefined>()
  useEffect(() => {
    if (totalCount === undefined) {
      return
    }
    setTotalCountMemo(totalCount)
  }, [totalCount])

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }
  const onPerPageChange = (_perPage: (typeof PER_PAGE_ARRAY)[number]) => {
    setCurrentPage(1)
    setPerPage(_perPage)
  }

  const renderBody = () => {
    switch (true) {
      case loading:
      case !!error: {
        return <TransactionsHistoryDesktopSkeleton count={perPage} {...props} />
      }
      default: {
        return (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeadCell>Action</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>
                  <div className="flex items-center gap-[0.79rem]">
                    <span>Amount</span>
                    <Sort className="h-[1.06619rem] w-[0.66175rem] shrink-0" />
                  </div>
                </Table.HeadCell>
                <Table.HeadCell>Chain</Table.HeadCell>
                <Table.HeadCell>From</Table.HeadCell>
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
              {data?.map((tx, index) => (
                <TransactionHistoryRow key={index} transaction={tx} />
              ))}
            </Table.Body>
          </Table>
        )
      }
    }
  }
  return (
    <div {...props} className={cn('', className)}>
      <SectionTitle>Events</SectionTitle>
      <TableFilters filters={filters} setFilters={setFilters} />
      {renderBody()}
      {totalCountMemo && (
        <Pagination
          className="mt-6"
          currentPage={currentPage}
          totalCount={totalCountMemo}
          onPageChange={onPageChange}
          perPage={perPage}
          onPerPageChange={onPerPageChange}
        />
      )}
    </div>
  )
}

const TransactionsHistoryDesktopSkeleton: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { count?: number }
> = (props) => {
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>Action</Table.HeadCell>
          <Table.HeadCell>Amount</Table.HeadCell>
          <Table.HeadCell>Strategy / Weekly APY / TVL</Table.HeadCell>
          <Table.HeadCell>From</Table.HeadCell>
          <Table.HeadCell>Tx Hash</Table.HeadCell>
          <Table.HeadCell>Created</Table.HeadCell>
          <Table.HeadCell>Nonce</Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {Array.from({ length: props.count || 4 })?.map((_, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <Skeleton className="h-12 w-40 rounded-xl" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton className="h-12 w-20 rounded-xl" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton className="h-12 w-60 rounded-xl" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton className="w-30 h-12 rounded-xl" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton className="w-30 h-12 rounded-xl" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton className="h-12 w-24 rounded-xl" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton className="h-10 w-20 rounded-xl" />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
