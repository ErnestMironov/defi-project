import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { ConnectWallet } from '@modules/connect-wallet/ConnectWallet'
import clsx from 'clsx'
import type { ComponentProps } from 'react'

import { MobileHeader } from './MobileHeader'
import { Sidebar } from './Sidebar'

interface HeaderProperties extends ComponentProps<'div'> {}

export const Header = ({ className, ...rest }: HeaderProperties) => {
  const { isBelowDesktop } = useDeviceWidth()

  if (isBelowDesktop) {
    return <MobileHeader className={className} {...rest} />
  }
  return (
    <header {...rest} className={clsx('flex items-center justify-between', className)}>
      <div className="h-16">
        <Sidebar />
      </div>
      <div className="flex items-center gap-3 justify-self-end">
        <ConnectWallet btnProps={{ className: 'ml-1' }} />
      </div>
    </header>
  )
}
