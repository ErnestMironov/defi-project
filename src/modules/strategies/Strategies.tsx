import Asset from '@assets/icons/asset.svg'
import Chain from '@assets/icons/chain.svg'
import Protocol from '@assets/icons/protocol.svg'
import {
  SELECT_CHAINS,
  SELECT_PROTOCOLS,
  SELECT_TOKENS,
} from '@constants/select-constant'
import useDeviceWidth from '@hooks/common/useDeviceWidth'

import { StrategiesDesktop } from './StrategiesDesktop'
import { StrategiesMobile } from './StrategiesMobile'

export type StrategyFilters = 'tokens' | 'protocols' | 'chains'

export interface StrategiesProperties extends React.HTMLAttributes<HTMLDivElement> {
  withLink?: boolean
  filters?: StrategyFilters[]
}

export const Strategies: React.FC<StrategiesProperties> = (props) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <StrategiesMobile {...props} />
  }
  return (
    <StrategiesDesktop
      {...props}
      filters={{
        search: { value: '', placeholder: 'Name, address or ID' },
        chain: {
          items: SELECT_CHAINS,
          value: [],
          placeholder: 'All Chains',
          icon: <Chain />,
        },
        token: {
          items: SELECT_TOKENS,
          value: [],
          placeholder: 'All Tokens',
          icon: <Asset />,
        },
        protocol: {
          items: SELECT_PROTOCOLS,
          value: [],
          placeholder: 'All Protocols',
          icon: <Protocol />,
        },
      }}
    />
  )
}
