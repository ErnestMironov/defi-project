import type { Strategy } from '@api/maat-finance/types'
import { CopyButton } from '@components/copy/CopyButton'
import { ScanLink } from '@components/scan-link/ScanLink'
import { Table } from '@components/table'
import { IconWithLabelComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { ROUTES } from '@routes/routes'
import { formatPercentValue, formatUsdValue } from '@utils/formatValue'
import { shortenAddress } from '@utils/transform'
import { formatUnits } from 'ethers'
import type { ComponentProps } from 'react'
import { useNavigate } from 'react-router-dom'

interface StrategyRowProperties {
  strategy: Strategy
}

export const StrategyRow: React.FC<StrategyRowProperties> = ({ strategy }) => {
  const navigate = useNavigate()

  return (
    <Table.Row
      className="cursor-pointer"
      onClick={() => navigate(`${ROUTES.STRATEGIES}/${strategy.id}`)}
    >
      <Table.Cell className="px-10 py-6">
        <div className="flex items-center gap-2">
          <p className="min-w-[8.5rem]">{shortenAddress(strategy.id, 5)}</p>
          <CopyButton text={strategy.id} />
        </div>
      </Table.Cell>
      <Table.Cell>
        <IconWithLabelComponent
          symbol={strategy?.token.symbol}
          className="size-9 gap-4"
        />
      </Table.Cell>
      <Table.Cell>
        <IconWithLabelComponent symbol={strategy?.chain_id} className="size-9 gap-4" />
      </Table.Cell>
      <Table.Cell>
        <IconWithLabelComponent symbol={strategy.protocol} className="size-9 gap-4" />
      </Table.Cell>
      <Table.Cell className="font-bold">{formatPercentValue(strategy.apy)}</Table.Cell>
      <Table.Cell>
        {formatUsdValue(formatUnits(BigInt(strategy.tvl), strategy.token.decimals), {
          notation: 'compact',
          maximumFractionDigits: 2,
        })}
      </Table.Cell>
      <Table.Cell className="max-w-[12.1rem]">
        <div className="flex w-full items-center">
          <p className="min-w-[7.5rem]">{shortenAddress(strategy.address, 5)}</p>
          <CopyButton text={strategy.address} className="ml-4 size-6 shrink-0" />
          <ScanLink
            chainId={strategy.chain_id}
            address={strategy.address}
            className="ml-3 size-5 shrink-0"
          />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}
export const StrategyRowSkeleton = (_props: ComponentProps<'tr'>) => {
  return (
    <Table.Row>
      <Table.Cell className="px-10 py-6">
        <Skeleton className="h-6 w-full" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-6 w-full" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-6 w-full" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-6 w-full" />
      </Table.Cell>
      <Table.Cell className="font-bold">
        <Skeleton className="h-6 w-full" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-6 w-full" />
      </Table.Cell>
      <Table.Cell className="max-w-[12.1rem]">
        <Skeleton className="h-6 w-full" />
      </Table.Cell>
    </Table.Row>
  )
}
