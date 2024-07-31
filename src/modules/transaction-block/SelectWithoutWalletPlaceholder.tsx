import { useWeb3Modal } from '@web3modal/wagmi/react'

export const SelectWithoutWalletPlaceholder = () => {
  const { open: openConnectModal } = useWeb3Modal()

  return (
    <button
      className="min-w-max rounded-[3rem] bg-cards px-7 py-4 text-[1.1875rem] leading-none shadow-shadow transition-all ease-in-out hover:shadow-shadow--hover dark:shadow-dark-shadow dark:hover:shadow-dark-shadow--hover"
      type="button"
      aria-label="Connect wallet"
      onClick={() => openConnectModal()}
    >
      Connect wallet
    </button>
  )
}
