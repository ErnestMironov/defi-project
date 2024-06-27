import Burger from '@assets/icons/burger.svg'
import EmptyWallet from '@assets/icons/empty-wallet.svg'
import Close from '@assets/icons/menu-close.svg'
import { Logo } from '@components/ui/logo'
import { useDisclosure } from '@hooks/useDisclosure'
import { ThemeToggle } from '@modules/theme/ThemeToggler'
import { cn } from '@utils/cn'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import clsx from 'clsx'
import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

import { HeaderMenu } from './HeaderMenu'

interface MobileHeaderProperties extends ComponentProps<'div'> {}

export const MobileHeader = (props: MobileHeaderProperties) => {
  const { className, ...rest } = props
  const [opened, { toggle, close }] = useDisclosure()
  const { open: openConnectModal } = useWeb3Modal()
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
          'flex fixed inset-0 h-screen flex-col items-center justify-between rounded-none bg-bg py-[5.81rem] focus:outline-none translate-x-[100vw] transition z-50 w-full',
          opened && 'translate-x-0',
        )}
      >
        <HeaderMenu
          className="align-end flex-1 flex-col items-center justify-center last:[&>a]:ml-2.5"
          callback={close}
        />
        <ThemeToggle />
      </div>
    </header>
  )
}
