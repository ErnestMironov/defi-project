import Burger from '@assets/icons/burger.svg'
import EmptyWallet from '@assets/icons/empty-wallet.svg'
import Close from '@assets/icons/menu-close.svg'
import PointIcon from '@assets/icons/point-icon.svg'
import BgDark from '@assets/images/background-dark.jpg'
import BgLight from '@assets/images/background-light.jpg'
import { Logo } from '@components/ui/logo'
import { useDisclosure } from '@hooks/common/useDisclosure'
import { useScrollLock } from '@hooks/common/useScrollLock'
import { useTheme } from '@modules/theme/ThemeProvider'
import { ThemeToggler } from '@modules/theme/ThemeToggler'
import { useAppKit } from '@reown/appkit/react'
import { ROUTES } from '@routes/routes'
import { useHideHeaderStore } from '@store/useHideHeaderStore'
import { cn } from '@utils/cn'
import clsx from 'clsx'
import { type ComponentProps, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { MobileSidebarMenu } from './HeaderMenu'

interface MobileHeaderProperties extends ComponentProps<'div'> {}

export const MobileHeader = (props: MobileHeaderProperties) => {
  const { className, ...rest } = props
  const { hidden } = useHideHeaderStore()
  const [opened, { toggle, close }] = useDisclosure()
  console.log('🚀 ~ MobileHeader ~ opened:', opened)
  const { open: openConnectModal } = useAppKit()
  const { lock, unlock } = useScrollLock()
  useEffect(() => {
    if (opened) {
      lock()
    } else {
      unlock()
    }
  }, [opened, lock, unlock])

  const { theme } = useTheme()
  const { pathname } = useLocation()
  const customBgPage = [ROUTES.PORTFOLIO, ROUTES.DEPOSIT].includes(pathname as never)

  return (
    <header
      {...rest}
      className={clsx('flex items-center', hidden && 'invisible', className)}
    >
      <Link onClick={close} to="/" className="flex items-center justify-center">
        <Logo className="relative z-[51] size-9 fill-text" />
      </Link>
      <div className="relative z-[51] ml-auto flex items-center gap-4">
        {opened && (
          <Link to={ROUTES.POINTS} onClick={close}>
            <PointIcon className="size-6" />
          </Link>
        )}
        <EmptyWallet
          className="size-6 overflow-visible [&_path]:fill-text"
          onClick={() => openConnectModal()}
        />
        <div
          onClick={toggle}
          className="relative z-[51] size-6 overflow-visible [&>svg]:size-full [&_path]:fill-text"
        >
          {opened ? <Close /> : <Burger />}
        </div>
      </div>
      <div
        className={cn(
          'flex fixed inset-0 h-screen flex-col items-center justify-center rounded-none bg-bg py-[5.81rem] focus:outline-none translate-x-[100vw] transition z-50 w-full',
          opened && 'translate-x-0',
        )}
      >
        {customBgPage && (
          <img
            src={theme === 'light' ? BgLight : BgDark}
            alt="background-light"
            className="pointer-events-none fixed inset-0 z-[-1] h-screen w-screen bg-bg object-cover"
          />
        )}
        <div className="space-y-16">
          <MobileSidebarMenu callback={close} />
          <ThemeToggler className="mx-auto" />
        </div>
      </div>
    </header>
  )
}
