/* eslint-disable react/jsx-no-useless-fragment */
import type { Strategy } from '@api/maat-finance/types'
import type { StrategiesParameters } from '@api/maat-finance/useStrategies'
import Sort from '@assets/icons/sort.svg'
import { Table } from '@components/table'
import { cn } from '@utils/cn'

import { StrategyRow, StrategyRowSkeleton } from './StrategiesDesktopRow'

export interface StrategyTableProperties extends React.HTMLAttributes<HTMLDivElement> {
  strategies?: Strategy[]
  loading?: boolean
  error?: any
  currentSort?: StrategiesParameters
  onSortChange?: (sort: 'apy' | 'tvl') => void
  size?: number
}

export const StrategyTable: React.FC<StrategyTableProperties> = (props) => {
  const { strategies, size = 10, loading, error, currentSort, onSortChange } = props
  const renderBody = () => {
    switch (true) {
      case loading:
      case !!error: {
        return Array.from({ length: size }).map((_, index) => (
          <StrategyRowSkeleton key={index} className="h-[6.25rem]" />
        ))
      }
      case strategies?.length === 0: {
        return <Table.EmptyState>No strategies were found</Table.EmptyState>
      }
      default: {
        return (
          <>
            {strategies?.map((strategy, index) => {
              return <StrategyRow key={index} strategy={strategy} />
            })}
          </>
        )
      }
    }
  }

  return (
    <Table>
      <Table.Head>
        <Table.Row className="text-text-2100 *:py-4 *:first:pl-7 *:last:pr-7">
          <Table.HeadCell>Strategy</Table.HeadCell>
          <Table.HeadCell className="min-w-[12.1rem]">Token</Table.HeadCell>
          <Table.HeadCell className="min-w-[12.1rem]">Chain</Table.HeadCell>
          <Table.HeadCell
            className="min-w-[12.1rem] cursor-pointer"
            onClick={() => onSortChange?.('apy')}
          >
            <div className="inline-flex items-center gap-[0.38rem]">
              <span>APY</span>
              {currentSort?.sort === 'apy' && (
                <Sort
                  className={cn(
                    'size-5 shrink-0',
                    currentSort?.order_by === 'desc' && 'rotate-180',
                  )}
                />
              )}
            </div>
          </Table.HeadCell>
          <Table.HeadCell
            className="min-w-[12.1rem] cursor-pointer"
            onClick={() => onSortChange?.('tvl')}
          >
            <div className="inline-flex items-center gap-[0.38rem]">
              <span>TVL</span>
              {currentSort?.sort === 'tvl' && (
                <Sort
                  className={cn(
                    'size-5 shrink-0',
                    currentSort?.order_by === 'desc' && 'rotate-180',
                  )}
                />
              )}
            </div>
          </Table.HeadCell>
          <Table.HeadCell className="min-w-[12.1rem]">Address</Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>{renderBody()}</Table.Body>
    </Table>
  )
}
