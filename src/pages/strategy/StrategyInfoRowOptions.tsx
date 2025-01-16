import { TableRowOptionsTrigger } from '@components/triggers/TableRowOptionsTrigger'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { type ComponentProps, useState } from 'react'

interface OptionItem {
  icon: React.ReactNode
  label: string
  onClick: () => void
}

interface StrategyInfoRowOptionsProperties extends ComponentProps<'div'> {
  options: OptionItem[]
  id: string
}

export const StrategyInfoRowOptions = (props: StrategyInfoRowOptionsProperties) => {
  const { options, className } = props
  const [isOpen, setIsOpen] = useState(false)

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
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              option.onClick()
              setIsOpen(false)
            }}
            type="button"
            className="flex items-center gap-2"
          >
            {option.icon}
            {option.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
