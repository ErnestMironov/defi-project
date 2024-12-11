import ArrowRight from '@assets/icons/arrow-right-short.svg'
import DoubleArrow from '@assets/icons/double-arrow.svg'
import Metamask from '@assets/icons/metamask.svg'
import { formatAmount } from '@utils/formatValue'
import { shortenAddress } from '@utils/transform'
import React, { useMemo } from 'react'
import { useAccount } from 'wagmi'

interface PortfolioButtonProperties extends React.HTMLAttributes<HTMLButtonElement> {
  isOpen: boolean
  openConnectModal: () => void
  balance: number
  isMobile?: boolean
}

const PortfolioButton: React.FC<PortfolioButtonProperties> = ({
  onClick,
  isOpen,
  openConnectModal = () => {},
  balance,
  isMobile = false,
}) => {
  const { address } = useAccount()

  const formattedBalance = useMemo(() => {
    if (isOpen && !isMobile) {
      return shortenAddress(address ?? '')
    }
    return formatAmount(balance ?? 0)
  }, [isOpen, address, balance, isMobile])

  return (
    <button
      type="button"
      className="size-auto rounded-2xl border  border-stroke-100 bg-white  transition-colors dark:border-stroke-40100 dark:bg-cards-widget"
      onClick={isOpen ? openConnectModal : onClick}
    >
      <div className="flex w-full">
        <div className="flex flex-1 items-center justify-center gap-1  border-r border-stroke-40100 px-4 py-3">
          <Metamask className="size-5 shrink-0" />
          <p className="truncate text-sm font-medium leading-6 text-text-100">
            {(!isOpen || (isOpen && isMobile)) && (
              <span className="text-text-4030">$</span>
            )}{' '}
            {formattedBalance}
          </p>
        </div>
        {!isMobile && (
          <button
            className="flex items-center justify-center rounded-r-2xl  px-3 transition-colors dark:border-stroke-40100"
            type="button"
          >
            {isOpen ? (
              <ArrowRight className="size-4" />
            ) : (
              <DoubleArrow className="size-4" />
            )}
          </button>
        )}
      </div>
    </button>
  )
}

export default PortfolioButton
