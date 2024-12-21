import { Button } from '@components/ui/button'
import { useAppKit } from '@reown/appkit/react'

interface DepositActionButtonProperties {
  isConnected: boolean
  inputValue: string
  error: string
  onModalOpen: () => void
}

export const DepositActionButton = ({
  isConnected,
  inputValue,
  error,
  onModalOpen,
}: DepositActionButtonProperties) => {
  const { open: openConnectModal } = useAppKit()

  if (!isConnected) {
    return (
      <Button
        size="lg"
        className="w-full rounded-2xl px-[1.88rem] py-4 text-base/6 normal-case"
        onClick={() => openConnectModal({ view: 'Connect' })}
      >
        Connect Wallet
      </Button>
    )
  }

  return (
    <Button
      size="lg"
      disabled={!inputValue || !!error}
      className="w-full rounded-2xl px-[1.88rem] py-4 text-base/6 normal-case"
      onClick={onModalOpen}
    >
      {inputValue && +inputValue > 0 ? 'Deposit' : 'Enter the amount'}
    </Button>
  )
}
