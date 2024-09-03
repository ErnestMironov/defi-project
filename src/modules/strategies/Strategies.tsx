import {
  SELECT_CHAINS,
  SELECT_PROTOCOLS,
  SELECT_TOKENS,
} from '@constants/select-constant'
import useDeviceWidth from '@hooks/common/useDeviceWidth'

import { StrategiesDesktop } from './StrategiesDesktop'
import { StrategiesMobile } from './StrategiesMobile'

export interface StrategiesProperties extends React.HTMLAttributes<HTMLDivElement> {}

export const Strategies: React.FC<StrategiesProperties> = (props) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <StrategiesMobile {...props} />
  }
  return (
    <StrategiesDesktop
      {...props}
      filters={{
        search: { value: '', placeholder: 'Name / Address / ID' },
        token: { items: SELECT_TOKENS, value: [], placeholder: 'All Tokens' },
        chain: { items: SELECT_CHAINS, value: [], placeholder: 'All Chains' },
        protocol: { items: SELECT_PROTOCOLS, value: [], placeholder: 'All Protocols' },
      }}
    />
  )
}
