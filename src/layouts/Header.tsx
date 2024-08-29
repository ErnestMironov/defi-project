import { Logo } from '@components/ui/logo'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
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
      <Link to="/">
        <Logo className="h-[1.36063rem] w-[3.655rem] shrink-0 fill-text" />
      </Link>
      <HeaderMenu className="justify-self-center" />
      <div className="flex items-center gap-[4.125rem] justify-self-end">
        <ThemeToggle />
        <ConnectWallet />
      </div>
    </header>
  )
}
