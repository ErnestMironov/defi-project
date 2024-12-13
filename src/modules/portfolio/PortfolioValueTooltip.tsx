import TooltipIcon from '@assets/icons/tooltip.svg'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { useState } from 'react'

// interface PortfolioValueTooltipProperties extends ComponentProps<'div'> {}

export const PortfolioValueTooltip = () => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <PortfolioValueTooltipMobile />
  }
  return <PortfolioValueTooltipDesktop />
}

export const PortfolioValueTooltipMobile = () => {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <TooltipIcon className="size-4" />
      </PopoverTrigger>
      <PopoverContent sideOffset={10} className="z-[9999] mx-4 rounded-xl p-4">
        <p className="truncate">Total assets locked in MAAT Vaults</p>
      </PopoverContent>
    </Popover>
  )
}

export const PortfolioValueTooltipDesktop = () => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <div className="w-5 rounded border border-stroke-100 px-[0.4375rem] py-0.5 text-center text-[0.6875rem] leading-4 text-text-100">
            ?
          </div>
        </TooltipTrigger>
        <TooltipContent sideOffset={10} className="rounded-xl p-4">
          <p className="truncate">Total assets locked in MAAT Vaults</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
