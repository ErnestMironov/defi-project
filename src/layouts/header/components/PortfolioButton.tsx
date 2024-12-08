import ArrowRight from '@assets/icons/arrow-right-short.svg'
import DoubleArrow from '@assets/icons/double-arrow.svg'
import Metamask from '@assets/icons/metamask.svg'
import { formatUsdValue } from '@utils/formatValue'
import { shortenAddress } from '@utils/transform'
import React, { useMemo } from 'react'
import { useAccount } from 'wagmi'

interface PortfolioButtonProperties extends React.HTMLAttributes<HTMLButtonElement> {
  isOpen: boolean
  openConnectModal: () => void
  balance: number
}

const PortfolioButton: React.FC<PortfolioButtonProperties> = ({
  onClick,
  isOpen,
  openConnectModal = () => {},
  balance,
}) => {
  const { address } = useAccount()

  const formattedBalance = useMemo(() => {
    if (isOpen) {
      return shortenAddress(address ?? '')
    }
    return formatUsdValue(balance ?? 0)
  }, [isOpen, address, balance])

  return (
    <button
      type="button"
      className=" min-w-[10.375rem] rounded-2xl bg-cards shadow-test-2 transition-colors"
      onClick={isOpen ? openConnectModal : onClick}
    >
      <div className="flex w-full">
        <div className="flex flex-1 items-center justify-center gap-2 rounded-l-2xl border px-4 py-3">
          <Metamask className="size-6 shrink-0" />
          <p className="truncate text-sm font-medium leading-6 text-text-100">
            {formattedBalance}
          </p>
        </div>
        <button
          className="hover:bg-cards/50 flex items-center justify-center rounded-r-2xl border px-3 transition-colors"
          type="button"
        >
          {isOpen ? (
            <ArrowRight className="size-4" />
          ) : (
            <DoubleArrow className="size-4" />
          )}
        </button>
      </div>
    </button>
  )
}

export default PortfolioButton
