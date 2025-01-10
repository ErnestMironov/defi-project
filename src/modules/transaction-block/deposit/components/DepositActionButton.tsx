import { Button } from '@components/ui/button'
import { useAppKit } from '@reown/appkit/react'
import { cn } from '@utils/cn'

interface DepositActionButtonProperties {
  isConnected: boolean
  inputValue: string
  error: string
  onModalOpen: () => void
}

type DepositButtonState = 'empty' | 'valid' | 'exceeded'

export const DepositActionButton = ({
  isConnected,
  inputValue,
  error,
  onModalOpen,
}: DepositActionButtonProperties) => {
  const { open: openConnectModal } = useAppKit()

  const getDepositButtonText = (): string => {
    const state: DepositButtonState = inputValue
      ? error
        ? 'exceeded'
        : 'valid'
      : 'empty'

    const buttonTexts: Record<DepositButtonState, string> = {
      empty: 'Enter the amount',
      valid: 'Deposit',
      exceeded: 'Exceeds balance :(',
    }

    return buttonTexts[state]
  }

  if (!isConnected) {
    return (
      <Button
        size="lg"
        className="w-full rounded-2xl px-[1.88rem] py-4 text-base/6 normal-case max-lg:text-[0.9375rem]"
        onClick={() => openConnectModal({ view: 'Connect' })}
      >
        Connect
      </Button>
    )
  }

  return (
    <Button
      size="lg"
      disabled={!inputValue || !!error}
      className={cn(
        'w-full rounded-2xl px-[1.88rem] py-4 text-base/6 normal-case hover:bg-main-80 max-lg:text-[0.9375rem]',
        error && '!bg-red-5 !text-red-100',
      )}
      onClick={onModalOpen}
    >
      {getDepositButtonText()}
    </Button>
  )
}
