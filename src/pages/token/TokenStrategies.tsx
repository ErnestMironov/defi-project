import type { StrategiesParameters } from '@api/queries/useStrategies'
import { SELECT_CHAINS, SELECT_PROTOCOLS } from '@constants/select-constant'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { StrategiesDesktop } from '@modules/strategies/StrategiesDesktop'
import { StrategiesMobile } from '@modules/strategies/StrategiesMobile'

export interface StrategiesProperties extends React.HTMLAttributes<HTMLDivElement> {
  withLink?: boolean
  params?: StrategiesParameters
}

export const TokenStrategies: React.FC<StrategiesProperties> = (props) => {
  const { params } = props
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return (
      <StrategiesMobile {...props} filters={['protocols', 'chains']} params={params} />
    )
  }
  return (
    <StrategiesDesktop
      {...props}
      filters={{
        search: { value: '', placeholder: 'Address / ID ' },
        chain: { items: SELECT_CHAINS, value: [], placeholder: 'All Chains' },
        protocol: { items: SELECT_PROTOCOLS, value: [], placeholder: 'All Protocols' },
      }}
      params={params}
    />
  )
}
