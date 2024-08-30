import { SELECT_CHAINS, SELECT_PROTOCOLS } from '@constants/select-constant'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { StrategiesDesktop } from '@modules/strategies/StrategiesDesktop'
import { StrategiesMobile } from '@modules/strategies/StrategiesMobile'

export interface StrategiesProperties extends React.HTMLAttributes<HTMLDivElement> {
  withLink?: boolean
}

export const TokenStrategies: React.FC<StrategiesProperties> = (props) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <StrategiesMobile {...props} filters={['protocols', 'chains']} />
  }
  return (
    <StrategiesDesktop
      {...props}
      filters={{
        search: { value: '', placeholder: 'Name / Address / ID ' },
        chain: { items: SELECT_CHAINS, value: [], placeholder: 'All Chains' },
        protocol: { items: SELECT_PROTOCOLS, value: [], placeholder: 'All Protocols' },
      }}
    />
  )
}
