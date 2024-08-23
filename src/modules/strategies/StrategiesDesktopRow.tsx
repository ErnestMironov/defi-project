import Scan from '@assets/icons/scan.svg'
import type { StrategyStats } from '@codegen/graphql'
import { CopyButton } from '@components/copy/CopyButton'
import { Table } from '@components/table'
import { IconWithLabelComponent } from '@components/token-icon'
import { formatPercentValue, formatUsdValue } from '@utils/formatValue'
import { shortenString } from '@utils/transform'
import { useNavigate } from 'react-router-dom'
import { formatUnits } from 'viem'

interface StrategyRowProperties {
  strategy: StrategyStats
}

export const StrategyRow: React.FC<StrategyRowProperties> = ({ strategy }) => {
  const navigate = useNavigate()
  return (
    <Table.Row
      className="cursor-pointer"
      onClick={() => navigate(`/strategies/${strategy.strategyId}`)}
    >
      <Table.Cell className="px-10 py-6">
        <div className="flex items-center">
          <p className="w-[7.9rem]">{shortenString(strategy.strategyId, 5)}</p>
          <CopyButton text={strategy.strategyId} />
        </div>
      </Table.Cell>
      <Table.Cell>
        <IconWithLabelComponent symbol={strategy?.tokenSymbol} className="size-9 gap-4" />
      </Table.Cell>
      <Table.Cell>
        <IconWithLabelComponent symbol={strategy?.chainName} className="size-9 gap-4" />
      </Table.Cell>
      <Table.Cell>
        <IconWithLabelComponent symbol={strategy.protocol} className="size-9 gap-4" />
      </Table.Cell>
      {/* // ! TODO: remove "* 5" when we have real data */}
      <Table.Cell className="font-bold">
        {formatPercentValue(strategy.apy * 5)}
      </Table.Cell>
      <Table.Cell>
        {formatUsdValue(formatUnits(strategy.deposited, strategy.decimals), {
          notation: 'compact',
          maximumFractionDigits: 2,
        })}
      </Table.Cell>
      <Table.Cell className="max-w-[12.1rem]">
        <div className="flex w-full items-center">
          <p className="w-[6.9rem]">{shortenString(strategy.strategyId, 5)}</p>
          <CopyButton text={strategy.strategyId} className="ml-4 size-6 shrink-0" />
          <Scan className="ml-3 size-5 shrink-0" />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}
