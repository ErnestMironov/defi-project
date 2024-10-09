import { Logo } from '@components/ui/logo'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { ConnectWallet } from '@modules/connect-wallet/ConnectWallet'
import { PortfolioWalletDrawer } from '@modules/portfolio/PortfolioWalletTrigger'
import { ThemeTogglerV1 } from '@modules/theme/ThemeTogglerV1'
import clsx from 'clsx'
import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

import { HeaderMenu } from './HeaderMenu'
import { MobileHeader } from './MobileHeader'

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
      <div className="flex items-center gap-3 justify-self-end">
        <ThemeTogglerV1 />
        <PortfolioWalletDrawer className="mr-1" />
        <ConnectWallet />
      </div>
    </header>
  )
}
