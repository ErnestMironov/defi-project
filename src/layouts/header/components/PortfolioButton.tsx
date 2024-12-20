import ArrowRight from '@assets/icons/arrow-right-short.svg'
import CopyIcon from '@assets/icons/copy-icon.svg'
import DoubleArrow from '@assets/icons/double-arrow.svg'
import LogoutIcon from '@assets/icons/logout-icon.svg'
import Metamask from '@assets/icons/metamask.svg'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { formatAmount } from '@utils/formatValue'
import { shortenAddress } from '@utils/transform'
import React, { useMemo } from 'react'
import toast from 'react-hot-toast'
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

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address || '')
    toast.success('Address copied to clipboard')
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="size-auto rounded-2xl border border-stroke-100 bg-white transition-colors dark:border-stroke-40100 dark:bg-cards-widget"
          onClick={
            !isMobile || !isOpen ? (isOpen ? openConnectModal : onClick) : undefined
          }
        >
          <div className="flex w-full">
            <div className="flex flex-1 items-center justify-center gap-1 border-r border-stroke-40100 px-4 py-3 max-md:border-none">
              <Metamask className="size-5 shrink-0" />
              <p className="truncate text-sm font-medium leading-6 text-text-100">
                {(!isOpen || (isOpen && isMobile)) && (
                  <span className="text-text-2100">$</span>
                )}{' '}
                {formattedBalance}
              </p>
            </div>
            {!isMobile && (
              <button
                className="flex items-center justify-center rounded-r-2xl px-3 transition-colors dark:border-stroke-40100"
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
      </DropdownMenu.Trigger>
      {isOpen && isMobile && (
        <DropdownMenu.Content
          className="ml-8 w-[17rem] rounded-2xl border border-stroke-100 bg-cards-widget p-2 shadow-lg"
          align="end"
          side="bottom"
          sideOffset={5}
        >
          <DropdownMenu.Item
            className="cursor-pointer rounded-lg px-3 py-4 outline-none hover:bg-gray-50"
            onClick={handleCopyAddress}
          >
            <div className="flex items-center gap-2">
              <CopyIcon className="size-4" />
              <span className="text-sm">Copy address</span>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="cursor-pointer rounded-lg px-3 py-4 outline-none hover:bg-gray-50"
            onClick={openConnectModal}
          >
            <div className="flex items-center gap-2">
              <LogoutIcon className="size-4" />
              <span className="text-sm">Log out</span>
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      )}
    </DropdownMenu.Root>
  )
}

export default PortfolioButton
