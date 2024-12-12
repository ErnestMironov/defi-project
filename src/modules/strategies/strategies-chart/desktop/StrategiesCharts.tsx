import type { StrategyData } from '@api/maat-finance/useStrategiesMetrics'
import ChainIcon from '@assets/icons/chain.svg'
import Filter from '@assets/icons/filter.svg'
import ProtocolIcon from '@assets/icons/protocol.svg'
import { FramesSelect } from '@components/frames-select/FramesSelect'
import { useFrameSelect } from '@components/frames-select/useFrameSelect'
import { MobileCheckboxSelect } from '@components/select/MobileCheckboxSelect'
import {
  DrawerIconTrigger,
  MobileFiltersDrawer,
} from '@components/select/MobileFiltersDrawer'
import { MultiSelect } from '@components/select/MultiSelect'
import type { OptionType } from '@components/select/Select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { SELECT_CHAINS, SELECT_PROTOCOLS } from '@constants/select-constant'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import type { StrategiesProperties } from '@modules/strategies/Strategies'
import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { cn } from '@utils/cn'
import { useState } from 'react'

import { StrategiesApyChart } from './StrategiesApyChart'
import { StrategiesApyChartMobile } from './StrategiesApyChartMobile'
import { StrategiesTvlChart } from './StrategiesTvlChart'

export type StrategiesMetricsChartData = {
  name: string
  timestamp: number
  values: (StrategyData | null)[]
}

export const StrategiesCharts = (props: StrategiesProperties) => {
  const { isBelowDesktop } = useDeviceWidth()
  return isBelowDesktop ? (
    <StrategiesChartsMobile {...props} />
  ) : (
    <StrategiesChartsDesktop {...props} />
  )
}

export const StrategiesChartsMobile = (props: StrategiesProperties) => {
  const { className, ...rest } = props
  const [selectedChain, setSelectedChain] = useState<OptionType[]>([])
  const [selectedProtocol, setSelectedProtocol] = useState<OptionType[]>([])
  const { currentFrame, frames, onFrameChange } = useFrameSelect('Week')
  return (
    <BaseContainer className={cn(className, 'rounded-2xl')} {...rest}>
      <div className="flex items-center justify-between gap-[0.38rem] border-b border-stroke-100 p-3">
        <FramesSelect
          className="w-full *:flex-1"
          frame={currentFrame}
          frames={frames}
          onFrameChange={onFrameChange}
        />
        <MobileFiltersDrawer
          resetFilters={() => {
            setSelectedProtocol([])
            setSelectedChain([])
          }}
          title="Filters"
          trigger={
            <DrawerIconTrigger
              Icon={Filter}
              active={selectedProtocol.length > 0 || selectedChain.length > 0}
            />
          }
        >
          <MobileCheckboxSelect
            options={SELECT_CHAINS}
            onChange={setSelectedChain}
            value={selectedChain}
            label="Chains"
            icon={<ChainIcon />}
            placeholder="All Chains"
          />
          <MobileCheckboxSelect
            options={SELECT_PROTOCOLS}
            onChange={setSelectedProtocol}
            value={selectedProtocol}
            label="Protocols"
            icon={<ProtocolIcon />}
            placeholder="All Protocols"
          />
        </MobileFiltersDrawer>
      </div>
      <Tabs className="divide-y divide-stroke-100" defaultValue="apy">
        <TabsList className="px-4 *:py-3 max-lg:gap-5">
          <TabsTrigger variant="underline" value="apy">
            APY
          </TabsTrigger>
          <TabsTrigger disabled variant="underline" value="tvl">
            TVL
          </TabsTrigger>
        </TabsList>
        <TabsContent value="apy">
          <StrategiesApyChartMobile frame={currentFrame} />
        </TabsContent>
        <TabsContent value="tvl">
          <StrategiesTvlChart />
        </TabsContent>
      </Tabs>
    </BaseContainer>
  )
}

export const StrategiesChartsDesktop = (props: StrategiesProperties) => {
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
        <TabsContent value="apy">
          <StrategiesApyChart />
        </TabsContent>
        <TabsContent value="tvl">
          <StrategiesTvlChart />
        </TabsContent>
      </Tabs>
    </BaseContainer>
  )
}
