import { cn } from '@utils/cn'
import { NavLink } from 'react-router-dom'

import type { IMenuItem } from '../hooks/useMenu'

export const NavLinkMenuItem = (props: IMenuItem) => {
  const { href, label, icon: Icon, callback } = props
  return (
    <NavLink
      to={href}
      key={label}
      className={({ isActive }) =>
        cn(
          'text-[0.875rem] font-medium leading-4 text-text-100 flex items-center gap-[.37rem] p-3 hover:text-main-100 [&:hover_svg_path]:stroke-main-100 hover:bg-main-10 rounded-xl',
          {
            'text-main-100 [&_svg_path]:stroke-main-100 bg-main-10': isActive,
          },
        )
      }
      onClick={callback}
    >
      {Icon && (
        <Icon className="size-4 [&_path]:stroke-[#8585A9] group-hover:[&_path]:stroke-main-100" />
      )}
      {label}
    </NavLink>
  )
}
