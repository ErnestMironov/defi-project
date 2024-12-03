import type { ReportType } from '@api/maat-finance/types'
import CopyIcon from '@assets/icons/copy-icon.svg'
import ShareIcon from '@assets/icons/share.svg'
import { TableRowOptionsTrigger } from '@components/triggers/TableRowOptionsTrigger'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { useClipboard } from '@hooks/common/useClipboard'
import { type ComponentProps, useState } from 'react'

interface ReportsRowOptionsProperties extends ComponentProps<'div'> {
  event: ReportType
}

export const ReportsRowOptions = (props: ReportsRowOptionsProperties) => {
  const { event } = props
  const [isOpen, setIsOpen] = useState(false)
  const { copyWithToast } = useClipboard()
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(true)
        }}
      >
        <TableRowOptionsTrigger />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="*:w-full *:rounded-xl *:p-3 hover:*:bg-[#8585A914]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            copyWithToast(event.txFrom)
            setIsOpen(false)
          }}
          type="button"
          className="flex items-center gap-2"
        >
          <CopyIcon className="size-4" /> Copy Address
        </button>
        <button
          onClick={() => {
            copyWithToast(event.hash)
            setIsOpen(false)
          }}
          type="button"
          className="flex items-center gap-2"
        >
          <CopyIcon className="size-4" /> Copy Event Hash
        </button>
        <button
          onClick={() => {
            setIsOpen(false)
          }}
          type="button"
          className="flex items-center gap-2"
        >
          <ShareIcon className="size-4" /> Share Link
        </button>
      </PopoverContent>
    </Popover>
  )
}
