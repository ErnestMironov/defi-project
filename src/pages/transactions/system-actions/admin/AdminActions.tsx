import useDeviceWidth from '@hooks/common/useDeviceWidth'

import { AdminTable } from './AdminTable'
import { AdminActionMobileWithFilters } from './mobile/AdminActionMobileWithFilters'

export const AdminActions = () => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) return <AdminActionMobileWithFilters />
  return <AdminTable />
}
