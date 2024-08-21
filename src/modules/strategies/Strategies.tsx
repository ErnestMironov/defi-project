import type { TableFiltersType } from '@components/filters/TableFilters'
import useDeviceWidth from '@hooks/useDeviceWidth'

import { StrategiesDesktop } from './StrategiesDesktop'
import { StrategiesMobile } from './StrategiesMobile'

export interface StrategiesProperties extends React.HTMLAttributes<HTMLDivElement> {
  filters: TableFiltersType
  withLink?: boolean
  rowType?: 'link' | 'modal'
}

export const Strategies: React.FC<StrategiesProperties> = (props) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <StrategiesMobile {...props} />
  }
  return <StrategiesDesktop {...props} />
}
