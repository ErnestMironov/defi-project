import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import { useMenuArray } from './useMenu'

interface HeaderMenuProperties extends ComponentProps<'ul'> {}

export const HeaderMenu = ({ className, ...rest }: HeaderMenuProperties) => {
  const menu = useMenuArray()
  return (
    <ul className={cn('flex items-center gap-[5rem]', className)} {...rest}>
      {menu.map((menuItem) => (
        <li key={menuItem.label} className="text-[1.25rem] font-light uppercase">
          {menuItem.label}
        </li>
      ))}
    </ul>
  )
}
