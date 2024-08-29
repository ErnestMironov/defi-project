import type { MobileFiltersType } from '@components/filters/MobileFilters'
import type { TableFiltersType } from '@components/filters/TableFilters'
import { SELECT_CHAINS, SELECT_PROTOCOLS } from '@constants/select-constant'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { StrategiesDesktop } from '@modules/strategies/StrategiesDesktop'

import { StrategiesMobile } from './StrategiesMobile'

export interface StrategiesProperties extends React.HTMLAttributes<HTMLDivElement> {
  filters: TableFiltersType
  mobileFilters: MobileFiltersType
  withLink?: boolean
  rowType?: 'link' | 'modal'
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
        search: { value: '', placeholder: 'Name / Address / ID ' },
        chain: { items: SELECT_CHAINS, value: SELECT_CHAINS[0] },
        protocol: { items: SELECT_PROTOCOLS, value: SELECT_PROTOCOLS[0] },
      }}
    />
  )
}
