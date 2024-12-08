import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { usePortfolioData } from '@hooks/usePortfolioStore'
import { ConnectWallet } from '@modules/connect-wallet/ConnectWallet'
import { PointsBalance } from '@modules/points-balance/PointsBalance'
import { ROUTES } from '@routes/routes'
import clsx from 'clsx'
import { type ComponentProps } from 'react'
import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi'

import PortfolioButton from './components/PortfolioButton'
import { PortfolioModal } from './components/PortfolioModal'
import { usePortfolioModalState } from './hooks/UsePortfolioModalState'
import { MobileHeader } from './MobileHeader'
import { Sidebar } from './Sidebar'

interface HeaderProperties extends ComponentProps<'div'> {}

export const Header = ({ className, ...rest }: HeaderProperties) => {
  const { isBelowDesktop } = useDeviceWidth()
  const account = useAccount()
  const { isOpen, handlePortfolioClose, handlePortfolioOpen } = usePortfolioModalState()
  const { yield: yieldData } = usePortfolioData()

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
        <div className="flex items-center gap-4">
          <Link to={ROUTES.POINTS}>
            <PointsBalance />
          </Link>
          <PortfolioButton
            onClick={() => handlePortfolioOpen()}
            isOpen={isOpen}
            balance={yieldData?.totalYield}
            openConnectModal={() => {}}
          />
          <PortfolioModal isOpen={isOpen} onClose={handlePortfolioClose} />
        </div>
      ) : (
        <ConnectWallet className="rounded-[12.5rem] bg-cards-widget px-6 py-4 text-[1.25rem] text-gray-100 dark:bg-[rgba(153,_152,_184,_0.10)] dark:text-white" />
      )}
    </header>
  )
}
