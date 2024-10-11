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
      <PopoverContent sideOffset={10} className="rounded-xl p-4">
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
          <TooltipIcon className="size-4" />
        </TooltipTrigger>
        <TooltipContent sideOffset={10} className="rounded-xl p-4">
          <p className="truncate">Total assets locked in MAAT Vaults</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
