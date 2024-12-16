import CopyIcon from '@assets/icons/copy-icon.svg'
import OptionsDots from '@assets/icons/options-dots.svg'
import ShareIcon from '@assets/icons/share.svg'
import { useScanLink } from '@components/scan-link/ScanLink'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { useClipboard } from '@hooks/common/useClipboard'
import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { type ComponentProps, useState } from 'react'

interface TransactionOptionsProperties extends ComponentProps<'div'> {
  txHash: string
  chainId: number
  address?: string
}

export const TransactionOptions = (props: TransactionOptionsProperties) => {
  const { txHash, address, chainId } = props
  const [isOpen, setIsOpen] = useState(false)
  const { copyWithToast } = useClipboard()
  const scanLink = useScanLink({ chainId, txHash })
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(true)
        }}
      >
        <TransactionOptionsTrigger />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="*:w-full *:rounded-xl *:p-3 hover:*:bg-[#8585A914]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            copyWithToast(txHash)
            setIsOpen(false)
          }}
          type="button"
          className="flex items-center gap-2"
        >
          <CopyIcon className="size-4" /> Copy Tx Hash
        </button>
        {address && (
          <button
            onClick={() => {
              copyWithToast(address)
              setIsOpen(false)
            }}
            type="button"
            className="flex items-center gap-2"
          >
            <CopyIcon className="size-4" /> Copy Address
          </button>
        )}
        <a
          href={scanLink}
          target="_blank"
          rel="noopener noreferrer"
          type="button"
          className="flex items-center gap-2"
        >
          <ShareIcon className="size-4" /> View on Scanner
        </a>
      </PopoverContent>
    </Popover>
  )
}

export const TransactionOptionsTrigger = (_props: ComponentProps<'div'>) => {
  return (
    <BaseContainer className="flex size-14 items-center justify-center rounded-2xl group-hover:shadow-test-2">
      <OptionsDots className="size-4" />
    </BaseContainer>
  )
}
