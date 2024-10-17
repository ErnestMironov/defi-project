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
    <>
      <div className="h-16" />
      <header
        {...rest}
        className={clsx(
          'fixed left-0 top-0 z-50 flex w-full items-center justify-between px-[6.25rem]',
          className,
        )}
      >
        <div className="h-16">
          <Sidebar />
        </div>
        <div className="flex items-center gap-3 justify-self-end">
          <ConnectWallet btnProps={{ className: 'ml-1' }} />
        </div>
      </header>
    </>
  )
}
