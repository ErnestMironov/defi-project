import { useWeb3Modal } from '@web3modal/wagmi/react'

export const SelectWithoutWalletPlaceholder = () => {
  const { open: openConnectModal } = useWeb3Modal()

  return (
    <button
      className="min-w-max rounded-[3rem] bg-[#FFF] px-7 py-4 text-[1.1875rem] leading-none [box-shadow:0px_2px_1px_0px_rgba(135,_99,_243,_0.12)]"
      type="button"
      aria-label="Connect wallet"
      onClick={() => openConnectModal()}
    >
      Connect wallet
    </button>
  )
}
