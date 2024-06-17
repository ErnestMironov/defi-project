import { Logo } from '@components/ui/logo'
import { ConnectWallet } from '@modules/connect-wallet/ConnectWallet'
import { ThemeToggle } from '@modules/theme/ThemeToggler'
import clsx from 'clsx'
import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

import { HeaderMenu } from './header/HeaderMenu'

interface HeaderProperties extends ComponentProps<'div'> {}

export const Header = ({ className, ...rest }: HeaderProperties) => {
  return (
    <header
      {...rest}
      className={clsx('grid grid-cols-3 items-center justify-between', className)}
    >
      <Link to="/">
        <Logo fill="#060606" />
      </Link>
      <HeaderMenu className="justify-self-center" />
      <div className="flex items-center gap-[4.125rem] justify-self-end">
        <ThemeToggle />
        <ConnectWallet />
      </div>
    </header>
  )
}
