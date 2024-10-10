import Metamask from '@assets/icons/metamask.svg'
import { Button, type ButtonProperties } from '@components/ui/button'
import { shortenAddress } from '@utils/transform'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import clsx from 'clsx'
import { useAccount } from 'wagmi'

interface IConnectWalletProperties {
  btnProps?: ButtonProperties
}

export const ConnectWallet = ({ btnProps }: IConnectWalletProperties) => {
  const { open: openConnectModal } = useWeb3Modal()

  const { address } = useAccount()

  return (
    <Button
      variant="container"
      type="button"
      {...btnProps}
      className={clsx(
        'flex items-center gap-3 rounded-xl px-6 py-3  text-[1.25rem] font-normal uppercase leading-[120%] tracking-[-0.0125rem]',
        btnProps?.className,
      )}
      onClick={() => openConnectModal()}
    >
      {address ? (
        <>
          <Metamask className="size-5" />
          <span className="normal-case">{shortenAddress(address)}</span>
        </>
      ) : (
        <span>CONNECT WALLET</span>
      )}
    </Button>
  )
}
