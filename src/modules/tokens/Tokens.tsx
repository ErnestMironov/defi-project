import ChainIcon from '@assets/icons/chain.svg'
import ProtocolIcon from '@assets/icons/protocol.svg'
import { MultiSelect } from '@components/select/MultiSelect'
import type { OptionType } from '@components/select/Select'
import { SELECT_CHAINS, SELECT_PROTOCOLS } from '@constants/select-constant'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { cn } from '@utils/cn'
import { type ComponentProps, useState } from 'react'

import { ApyTokensChartDesktop } from './charts/ApyTokensChartDesktop'
import { TokensChartMobile } from './charts/TokensChartMobile'
import { TvlTokensChartDesktop } from './charts/TvlTokensChartDesktop'

interface TokensProperties extends ComponentProps<'div'> {}

export const TokenCharts = (props: TokensProperties) => {
  const { className, ...rest } = props
  const [selectedChain, setSelectedChain] = useState<OptionType[]>([])
  const [selectedProtocol, setSelectedProtocol] = useState<OptionType[]>([])

  const { isBelowDesktop } = useDeviceWidth()

  if (isBelowDesktop) return <TokensChartMobile {...props} />

  return (
    <BaseContainer className={cn(className, '')} {...rest}>
      <div className="flex h-[4.5rem] items-center gap-2 border-b border-stroke-100 px-6">
        <MultiSelect
          variant="outline"
          options={SELECT_CHAINS}
          value={selectedChain}
          onChange={setSelectedChain}
          placeholder="All Chains"
          className="w-[12.5rem]"
          icon={<ChainIcon />}
        />
        <MultiSelect
          variant="outline"
          options={SELECT_PROTOCOLS}
          value={selectedProtocol}
          onChange={setSelectedProtocol}
          placeholder="All Protocols"
          className="w-[12.5rem]"
          icon={<ProtocolIcon />}
        />
      </div>

      <div className="grid grid-cols-2 divide-x divide-stroke-100 *:py-8">
        <ApyTokensChartDesktop
          selectedChain={selectedChain}
          selectedProtocol={selectedProtocol}
        />
        <TvlTokensChartDesktop
          selectedChain={selectedChain}
          selectedProtocol={selectedProtocol}
        />
      </div>
    </BaseContainer>
  )
}
