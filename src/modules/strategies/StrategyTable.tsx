import type { Strategy } from '@api/maat-finance/types'
import Sort from '@assets/icons/sort.svg'
import { Table } from '@components/table'
import { Skeleton } from '@components/ui/skeleton'

import { StrategyRow } from './StrategiesDesktopRow'

export interface StrategyTableProperties extends React.HTMLAttributes<HTMLDivElement> {
  strategies?: Strategy[]
  loading?: boolean
  error?: any
}

export const StrategyTable: React.FC<StrategyTableProperties> = (props) => {
  const { strategies, loading, error } = props
  const renderBody = () => {
    switch (true) {
      case loading:
      case !!error: {
        return <StrategySkeletonDesktop length={strategies?.length} />
      }
      default: {
        return (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeadCell>Strategy ID</Table.HeadCell>
                <Table.HeadCell>Token</Table.HeadCell>
                <Table.HeadCell>Chain</Table.HeadCell>
                <Table.HeadCell>Protocol</Table.HeadCell>
                <Table.HeadCell>
                  <div className="inline-flex items-center gap-[0.79rem]">
                    <span>APY</span>
                    <Sort className="h-[1.06619rem] w-[0.66175rem] shrink-0" />
                  </div>
                </Table.HeadCell>
                <Table.HeadCell>
                  <div className="inline-flex items-center gap-[0.79rem]">
                    <span>TVL</span>
                    <Sort className="h-[1.06619rem] w-[0.66175rem] shrink-0" />
                  </div>
                </Table.HeadCell>
                <Table.HeadCell>Address</Table.HeadCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {strategies?.map((strategy, index) => {
                return <StrategyRow key={index} strategy={strategy} />
              })}
            </Table.Body>
          </Table>
        )
      }
    }
  }

  return renderBody()
}

interface StrategySkeletonDesktopProperties extends React.HTMLAttributes<HTMLDivElement> {
  length?: number
}

const StrategySkeletonDesktop: React.FC<StrategySkeletonDesktopProperties> = (props) => {
  const { length } = props
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>Strategy ID</Table.HeadCell>
          <Table.HeadCell>Token</Table.HeadCell>
          <Table.HeadCell>Chain</Table.HeadCell>
          <Table.HeadCell>Protocol</Table.HeadCell>
          <Table.HeadCell>APY</Table.HeadCell>
          <Table.HeadCell>TVL</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {Array.from({ length: length ?? 6 })?.map((_, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>
                <Skeleton className="h-9 w-[9.9rem]" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-9 w-36" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-9 w-36" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-9 w-20" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-9 w-20" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-9 w-20" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-9 w-[9.9rem]" />
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}
