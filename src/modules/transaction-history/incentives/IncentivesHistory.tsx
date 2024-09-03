import type { TableFiltersType } from '@components/filters/TableFilters'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { IncentiveMobileWithFilters } from '@modules/transactions/incentive/IncentiveMobileWithFilters'
import type { ComponentProps } from 'react'

import { IncentivesHistoryDesktop } from './IncentivesHistoryDesktop'

interface IncentivesHistoryProperties extends ComponentProps<'div'> {
  filters: TableFiltersType
}

export const IncentivesHistory: React.FC<IncentivesHistoryProperties> = (props) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <IncentiveMobileWithFilters />
  }
  return <IncentivesHistoryDesktop {...props} />
}
