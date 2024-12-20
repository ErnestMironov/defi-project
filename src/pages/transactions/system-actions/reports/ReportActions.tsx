import useDeviceWidth from '@hooks/common/useDeviceWidth'

import { ReportActionMobileWithFilters } from './mobile/ReportActionMobileWithFilters'
import { ReportsTable } from './ReportsTable'

export const ReportActions = () => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) return <ReportActionMobileWithFilters />
  return <ReportsTable />
}
