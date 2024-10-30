import { useGetUserPoints } from '@api/maat-finance/useGetUserPoints'
import PointIcon from '@assets/icons/point-icon.svg'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { ConnectWallet } from '@modules/connect-wallet/ConnectWallet'
import clsx from 'clsx'
import type { ComponentProps } from 'react'
import type { Address } from 'viem'
import { useAccount } from 'wagmi'

import { MobileHeader } from './MobileHeader'
import { Sidebar } from './Sidebar'

interface HeaderProperties extends ComponentProps<'div'> {}

export const Header = ({ className, ...rest }: HeaderProperties) => {
  const { isBelowDesktop } = useDeviceWidth()
  const account = useAccount()

  const { data: userPoints } = useGetUserPoints(account.address as Address)

  if (isBelowDesktop) {
    return <MobileHeader className={className} {...rest} />
  }
  return (
    <header
      {...rest}
      className={clsx('flex w-full items-center justify-between', className)}
    >
      <div className="h-16">
        <Sidebar />
      </div>
      {account.address ? (
        <button
          type="button"
          className="flex items-center gap-2
rounded-[12.5rem] bg-white px-6 py-4 text-[1.25rem] leading-none tracking-[-0.0125rem] text-gray-80 dark:bg-[rgba(153,_152,_184,_0.10)]"
        >
          Your balance:
          <span className="text-main-100 dark:text-white">{userPoints?.points}</span>
          <PointIcon className="relative -top-0.5 size-6" />
        </button>
      ) : (
        <ConnectWallet className="rounded-[12.5rem] bg-cards-widget px-6 py-4 text-[1.25rem] text-gray-100 dark:bg-[rgba(153,_152,_184,_0.10)] dark:text-white" />
      )}
    </header>
  )
}
