import useDeviceWidth from '@hooks/common/useDeviceWidth'

import { DesktopMenu } from './DesktopMenu'
import { MobileMenu } from './MobileMenu'

export const Menu = () => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <MobileMenu />
  }
  return <DesktopMenu />
}
