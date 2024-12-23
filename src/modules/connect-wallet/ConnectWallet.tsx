import Metamask from '@assets/icons/metamask.svg'
import { Button, type ButtonProperties } from '@components/ui/button'
import { useAppKit } from '@reown/appkit/react'
import { shortenAddress } from '@utils/transform'
import clsx from 'clsx'
import { useAccount, useDisconnect } from 'wagmi'

interface IConnectWalletProperties {
  btnProps?: ButtonProperties
  className?: string
}

export const ConnectWallet = ({ btnProps, className }: IConnectWalletProperties) => {
  const { open: openConnectModal } = useAppKit()
  const { disconnect } = useDisconnect()
  const { address } = useAccount()
  return (
    <Button
      variant="container"
      type="button"
      {...btnProps}
      className={clsx(
        'flex items-center gap-3 rounded-xl px-6 py-3  text-[1.25rem] font-normal uppercase leading-[120%] tracking-[-0.0125rem]',
        btnProps?.className,
        className,
      )}
      onClick={() => {
        if (address) {
          disconnect()
        } else {
          openConnectModal()
        }
      }}
    >
      {address ? (
        <>
          <Metamask className="size-5" />
          <span className="normal-case">{shortenAddress(address)}</span>
        </>
      ) : (
        <span>CONNECT</span>
      )}
    </Button>
  )
}
