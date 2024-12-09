import type { Strategy } from '@api/maat-finance/types'
import { CopyButton } from '@components/copy/CopyButton'
import { ScanLink } from '@components/scan-link/ScanLink'
import { Table } from '@components/table'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { ROUTES } from '@routes/routes'
import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue'
import { shortenAddress } from '@utils/transform'
import type { ComponentProps } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  StrategyRowOptions,
  TableRowOptionsTrigger,
} from './components/StrategyRowOptions'

interface StrategyRowProperties {
  strategy: Strategy
}

export const StrategyRow: React.FC<StrategyRowProperties> = ({ strategy }) => {
  const navigate = useNavigate()
  return (
    <Table.Row
      className="group cursor-pointer *:px-7 *:py-4"
      onClick={() => navigate(`${ROUTES.STRATEGIES}/${strategy.id}`)}
    >
      <Table.Cell>
        <div className="flex items-center gap-4">
          <TokenIconComponent symbol={strategy.protocol} className="size-8" />
          <div>
            <div className="flex items-center gap-2">
              <p className="text-base/[1.5rem]">{shortenAddress(strategy.id)}</p>
              <CopyButton text={strategy.id} className="size-4 shrink-0" />
            </div>
            <p className="text-sm/[1rem] text-text-2100">{strategy.protocol}</p>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell>
        <IconWithLabelComponent symbol={strategy?.token.symbol} />
      </Table.Cell>
      <Table.Cell>
        <IconWithLabelComponent symbol={strategy?.chain_id} />
      </Table.Cell>
      <Table.Cell>
        {formatAmount(strategy.apy, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}
        <span className="text-text-260">%</span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-text-260">$</span>
        {formatAmount(strategy.tvl, {
          notation: 'compact',
          maximumFractionDigits: 2,
        })}
      </Table.Cell>
      <Table.Cell className="">
        <div className="flex w-full items-center">
          <p className="min-w-24">{shortenAddress(strategy.address)}</p>
          <CopyButton text={strategy.address} className="size-4 shrink-0" />
          <ScanLink
            chainId={strategy.chain_id}
            address={strategy.address}
            className="ml-3 size-4 shrink-0"
          />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex justify-end">
          <StrategyRowOptions strategy={strategy} />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}
export const StrategyRowSkeleton = (props: ComponentProps<'tr'>) => {
  const { className } = props
  return (
    <Table.Row className={cn('group cursor-pointer *:px-7 *:py-4', className)}>
      <Table.Cell>
        <Skeleton className="h-6 w-52" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-6 w-40" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-6 w-40" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-6 w-40" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-6 w-40" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-6 w-40" />
      </Table.Cell>
      <Table.Cell>
        <div className="flex justify-end">
          <TableRowOptionsTrigger />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}
