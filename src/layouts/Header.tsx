import { Logo } from '@components/ui/logo'
import useDeviceWidth from '@hooks/useDeviceWidth'
import { ConnectWallet } from '@modules/connect-wallet/ConnectWallet'
import { ThemeToggle } from '@modules/theme/ThemeToggler'
import clsx from 'clsx'
import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

import { HeaderMenu } from './header/HeaderMenu'
import { MobileHeader } from './header/MobileHeader'

interface HeaderProperties extends ComponentProps<'div'> {}

export const Header = ({ className, ...rest }: HeaderProperties) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <MobileHeader className={className} {...rest} />
  }
  return (
    <header
      {...rest}
      className={clsx('grid grid-cols-3 items-center justify-between', className)}
    >
      <Link to="/" className="flex h-[3.75rem] w-[4.625rem] items-center justify-center">
        <Logo className="h-[1.36088rem] w-[3.65531rem] fill-text" />
      </Link>
      <HeaderMenu className="justify-self-center" />
      <div className="flex items-center gap-[4.125rem] justify-self-end">
        <ThemeToggle />
        <ConnectWallet />
      </div>
    </header>
  )
}
