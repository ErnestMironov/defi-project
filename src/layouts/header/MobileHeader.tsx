import Burger from '@assets/icons/burger.svg'
import EmptyWallet from '@assets/icons/empty-wallet.svg'
import Close from '@assets/icons/menu-close.svg'
import { Logo } from '@components/ui/logo'
import { useDisclosure } from '@hooks/common/useDisclosure'
import { ThemeToggle } from '@modules/theme/ThemeToggler'
import { cn } from '@utils/cn'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import clsx from 'clsx'
import { type ComponentProps, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { MobileSidebarMenu } from './HeaderMenu'

interface MobileHeaderProperties extends ComponentProps<'div'> {}

export const MobileHeader = (props: MobileHeaderProperties) => {
  const { className, ...rest } = props
  const [opened, { toggle, close }] = useDisclosure()
  const { open: openConnectModal } = useWeb3Modal()
  useEffect(() => {
    document.body.style.overflow = opened ? 'hidden' : 'auto'
  }, [opened])
  return (
    <header {...rest} className={clsx('flex items-center', className)}>
      <Link onClick={close} to="/" className="flex items-center justify-center">
        <Logo className="relative z-[51] size-9 fill-text" />
      </Link>
      <EmptyWallet
        className="relative z-[51] ml-auto size-6 overflow-visible [&_path]:fill-text"
        onClick={() => openConnectModal()}
      />
      <div
        onClick={toggle}
        className="relative z-[51] ml-4 size-6 overflow-visible [&>svg]:size-full [&_path]:fill-text"
      >
        {opened ? <Close /> : <Burger />}
      </div>
      <div
        className={cn(
          'flex fixed inset-0 h-screen flex-col items-center justify-center rounded-none bg-bg py-[5.81rem] focus:outline-none translate-x-[100vw] transition z-50 w-full',
          opened && 'translate-x-0',
        )}
      >
        <div className="space-y-16">
          <MobileSidebarMenu callback={close} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
