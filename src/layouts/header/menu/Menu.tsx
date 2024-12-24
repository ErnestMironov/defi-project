import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { useState } from 'react'

import { DesktopMenu } from './DesktopMenu'
import { MobileMenu } from './MobileMenu'

export const Menu = () => {
  const { isBelowDesktop } = useDeviceWidth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative z-50 size-12">
      {isBelowDesktop ? (
        <MobileMenu />
      ) : (
        <DesktopMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </div>
  )
}
