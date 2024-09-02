import Setting from '@assets/icons/setting.svg'
import type { OptionType } from '@components/select/Select'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'
import { cn } from '@utils/cn'
import { motion } from 'framer-motion'
import { useState } from 'react'

import { CustomProtocolsDrawer } from './CustomProtocolsDrawer'

interface SelectGraphPopoverProperties {
  options: OptionType[]
  value: OptionType
  onChange: (option: OptionType) => void
}

export const SelectPopover = ({
  options,
  value,
  onChange,
}: SelectGraphPopoverProperties) => {
  const [open, setOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isFirstOpen, setFirstOpen] = useState(true)

  return (
    <Select
      open={open}
      value={value.value}
      onOpenChange={setOpen}
      onValueChange={(value_) => {
        if (value_ === 'Custom' && isFirstOpen) {
          setDrawerOpen(true)
        }
        onChange(options.find((option) => option.value === value_) as OptionType)
        setOpen(false)
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={value.label}>{value.label}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} Icon={option.Icon}>
            {option.label}
          </SelectItem>
        ))}
        <CustomProtocolsDrawer
          onOpenChange={setDrawerOpen}
          open={drawerOpen}
          onClose={() => {
            setFirstOpen(false)
            onChange(options.find((option) => option.value === 'Custom') as OptionType)
          }}
          className="absolute bottom-[1.7rem] right-[1.6rem] flex w-fit items-center justify-end"
        >
          <motion.button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="mr-1 size-[1.125rem]"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Setting
              className={cn(
                'size-full',
                value.value === 'Custom' && '[&_path]:fill-main-100',
              )}
            />
          </motion.button>
        </CustomProtocolsDrawer>
      </SelectContent>
    </Select>
  )
}
