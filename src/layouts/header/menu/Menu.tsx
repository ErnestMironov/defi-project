import useDeviceWidth from '@hooks/common/useDeviceWidth'

import { DesktopMenu } from './DesktopMenu'
import { MobileMenu } from './MobileMenu'

export const Menu = () => {
  const { isBelowDesktop } = useDeviceWidth()

  return (
    <div className="relative z-50 size-12 max-lg:size-auto">
      {isBelowDesktop ? <MobileMenu /> : <DesktopMenu />}
    </div>
  )
}
