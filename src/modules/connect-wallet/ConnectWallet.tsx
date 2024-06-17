import ArrowDown from '@assets/icons/arrow-down.svg'
import type { ButtonProperties } from '@components/ui/button'
import { shortenString } from '@utils/transform'
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
    <button
      type="button"
      {...btnProps}
      className={clsx(
        'flex items-center gap-2  text-[1.25rem] font-normal uppercase not-italic leading-[120%] tracking-[-0.0125rem]',
        btnProps?.className,
      )}
      onClick={() => openConnectModal()}
    >
      {address ? (
        <>
          <span>{shortenString(address)}</span>{' '}
          <ArrowDown className={clsx('size-4 transition-all duration-150')} />
        </>
      ) : (
        <span>CONNECT WALLET</span>
      )}
    </button>
  )
}
