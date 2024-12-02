import ArrowRight from '@assets/icons/arrow-right-short.svg'
import DoubleArrow from '@assets/icons/double-arrow.svg'
import Metamask from '@assets/icons/metamask.svg'
import { shortenAddress } from '@utils/transform'
import React from 'react'
import { useAccount } from 'wagmi'

interface MetamaskButtonProperties extends React.HTMLAttributes<HTMLButtonElement> {
  isOpen: boolean
  openConnectModal: () => void
}

const MetamaskButton: React.FC<MetamaskButtonProperties> = ({
  onClick,
  isOpen,
  openConnectModal = () => {},
}) => {
  const { address } = useAccount()

  return (
    <button
      type="button"
      className="flex items-center"
      onClick={isOpen ? openConnectModal : onClick}
    >
      <div className="flex rounded-2xl bg-cards  ">
        <div className="flex items-center justify-center rounded-l-2xl border p-3 px-4">
          <Metamask className="size-5" />
          <p className="ml-3 text-sm font-medium leading-6 text-text-100">
            {shortenAddress(address ?? '')}
          </p>
        </div>
        <button
          className="flex items-center justify-center rounded-r-2xl border px-3"
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

export default MetamaskButton
