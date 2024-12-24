import type { Strategy } from '@api/maat-finance/types'
import CopyIcon from '@assets/icons/copy-icon.svg'
import { TableRowOptionsTrigger } from '@components/triggers/TableRowOptionsTrigger'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { useClipboard } from '@hooks/common/useClipboard'
import { type ComponentProps, useState } from 'react'

interface StrategyInfoRowOptionsProperties extends ComponentProps<'div'> {
  strategy: Strategy
  id: string
}

export const StrategyInfoRowOptions = (props: StrategyInfoRowOptionsProperties) => {
  const { strategy, id, className } = props
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
        <TableRowOptionsTrigger className={className} />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="*:w-full *:rounded-xl *:p-3 hover:*:bg-[#8585A914]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            copyWithToast(strategy?.info?.protocol?.link)
            setIsOpen(false)
          }}
          type="button"
          className="flex items-center gap-2"
        >
          <CopyIcon className="size-4" /> Copy Address
        </button>
        <button
          onClick={() => {
            copyWithToast(id)
            setIsOpen(false)
          }}
          type="button"
          className="flex items-center gap-2"
        >
          <CopyIcon className="size-4" /> Copy Strategy ID
        </button>
      </PopoverContent>
    </Popover>
  )
}
