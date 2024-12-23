import { useUserShares } from '@api/contracts/useGetUserShares'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { ConnectWallet } from '@modules/connect-wallet/ConnectWallet'
import { useTransactionStatusChecker } from '@modules/pending-transactions/useTransactionStatusTracker'
import { PointsBalance } from '@modules/points-balance/PointsBalance'
import { ROUTES } from '@routes/routes'
import clsx from 'clsx'
import { type ComponentProps } from 'react'
import { Link } from 'react-router-dom'
import { formatUnits } from 'viem'
import { useAccount } from 'wagmi'

import PortfolioButton from './components/PortfolioButton'
import { PortfolioModal } from './components/PortfolioModal'
import { usePortfolioModalState } from './hooks/UsePortfolioModalState'
import { MobileHeader } from './MobileHeader'
import { Sidebar } from './Sidebar'

interface HeaderProperties extends ComponentProps<'div'> {}

export const Header = ({ className, ...rest }: HeaderProperties) => {
  useTransactionStatusChecker()

  const { isBelowDesktop } = useDeviceWidth()
  const account = useAccount()
  const { isOpen, handlePortfolioClose, handlePortfolioOpen } = usePortfolioModalState()
  const { data: userShares } = useUserShares(account.address)
  const balance = userShares?.shares?.reduce<number>(
    (accumulator, value) =>
      accumulator + Number(formatUnits(value.balance, value.decimals)),
    0,
  )
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
        <div className="flex items-center gap-2 rounded-[1.375rem] bg-transparent">
          <Link to={ROUTES.POINTS}>
            <PointsBalance />
          </Link>
          <PortfolioButton
            onClick={() => handlePortfolioOpen()}
            isOpen={isOpen}
            balance={balance ?? 0}
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
