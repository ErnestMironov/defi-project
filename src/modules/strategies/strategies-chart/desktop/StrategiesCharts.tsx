import type { StrategyData } from '@api/maat-finance/useStrategiesMetrics'
import ChainIcon from '@assets/icons/chain.svg'
import ProtocolIcon from '@assets/icons/protocol.svg'
import { MultiSelect } from '@components/select/MultiSelect'
import type { OptionType } from '@components/select/Select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { SELECT_CHAINS, SELECT_PROTOCOLS } from '@constants/select-constant'
import type { StrategiesProperties } from '@modules/strategies/Strategies'
import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { cn } from '@utils/cn'
import { useState } from 'react'

import { StrategiesApyChart } from './StrategiesApyChart'
import { StrategiesTvlChart } from './StrategiesTvlChart'

export type StrategiesMetricsChartData = {
  name: string
  timestamp: number
  values: (StrategyData | null)[]
}

export const StrategiesCharts = (props: StrategiesProperties) => {
  const { className, ...rest } = props
  const [selectedChain, setSelectedChain] = useState<OptionType[]>([])
  const [selectedProtocol, setSelectedProtocol] = useState<OptionType[]>([])

  return (
    <BaseContainer className={cn(className, '')} {...rest}>
      <div className="flex h-[4.5rem] items-center gap-2 border-b border-stroke-100 px-6">
        <MultiSelect
          options={SELECT_CHAINS}
          value={selectedChain}
          onChange={setSelectedChain}
          placeholder="All Chains"
          className="w-[12.5rem]"
          icon={<ChainIcon />}
        />
        <MultiSelect
          options={SELECT_PROTOCOLS}
          value={selectedProtocol}
          onChange={setSelectedProtocol}
          placeholder="All Protocols"
          className="w-[12.5rem]"
          icon={<ProtocolIcon />}
        />
      </div>
      <Tabs className="mt-3 divide-y divide-stroke-100" defaultValue="apy">
        <TabsList className="gap-5 px-8 *:mb-[-0.05rem] *:pb-3 *:text-sm">
          <TabsTrigger variant="underline" value="apy">
            APY
          </TabsTrigger>
          <TabsTrigger disabled variant="underline" value="tvl">
            TVL
          </TabsTrigger>
        </TabsList>
        <TabsContent value="apy" className="mt-0">
          <StrategiesApyChart />
        </TabsContent>
        <TabsContent value="tvl" className="mt-0">
          <StrategiesTvlChart />
        </TabsContent>
      </Tabs>
    </BaseContainer>
  )
}
