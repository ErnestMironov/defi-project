import { Button } from '@components/ui/button'
import { Logo } from '@components/ui/logo'
import clsx from 'clsx'
import type { ComponentProps } from 'react'
import { useDisconnect } from 'wagmi'
import { useActiveAccount } from '@hooks/useActiveAccount'

interface OtpHeaderProperties extends ComponentProps<'div'> {}

export const OtpHeader = ({ className }: OtpHeaderProperties) => {
  const { isConnected } = useActiveAccount()
  const { disconnect } = useDisconnect()

  return (
    <header className={clsx('flex items-center justify-between', className)}>
      <Logo className="h-[1.36063rem] w-[3.655rem] shrink-0 fill-text max-lg:size-9" />
      {isConnected && (
        <Button
          variant="default"
          className="w-min bg-red-500 px-8 text-base hover:bg-red-500/70"
          onClick={() => disconnect()}
        >
          Disconnect Wallet
        </Button>
      )}
      {/* <ThemeTogglerV1 className="justify-self-end max-lg:size-8 max-lg:justify-self-end max-lg:rounded-lg max-lg:p-2" /> */}
    </header>
  )
}
