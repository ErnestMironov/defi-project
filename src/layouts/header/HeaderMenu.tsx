import { cn } from '@utils/cn'
import clsx from 'clsx'
import type { ComponentProps } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import { useMenuArray } from './useMenu'

interface HeaderMenuProperties extends ComponentProps<'ul'> {
  callback?: () => void
}

export const HeaderMenu = ({ className, callback, ...rest }: HeaderMenuProperties) => {
  const menu = useMenuArray()
  const location = useLocation()

  return (
    <ul className={cn('flex items-center gap-[3.69rem]', className)} {...rest}>
      {menu.map((menuItem) => {
        if (menuItem.href.startsWith('http')) {
          return (
            <Link
              onClick={callback}
              to={menuItem.href}
              target="_blank"
              key={menuItem.label}
              className={clsx(
                'relative flex cursor-pointer items-center text-[1.25rem] font-normal uppercase leading-[120%] tracking-[0.0125rem] hover:text-violet-100 [&_path]:hover:stroke-violet-100',
                {
                  'text-violet-100': location.pathname === menuItem.href,
                },
              )}
            >
              {menuItem.label}
              {menuItem.src && (
                <menuItem.src className="size-4.5 ml-0.5 [&_path]:stroke-text" />
              )}
              {menuItem.href === location.pathname && (
                <div className="absolute bottom-0 h-0.5 w-full bg-violet-100" />
              )}
            </Link>
          )
        }
        return (
          <NavLink
            onClick={callback}
            to={menuItem.href}
            key={menuItem.label}
            className={({ isActive }) =>
              clsx(
                'relative flex cursor-pointer items-center text-[1.25rem] font-normal uppercase leading-[120%] tracking-[0.0125rem] hover:text-violet-100 [&_path]:hover:stroke-violet-100',
                {
                  'text-violet-100 underline decoration-[2px] underline-offset-4':
                    isActive,
                },
              )
            }
          >
            {menuItem.label}
            {menuItem.src && (
              <menuItem.src className="relative bottom-0.5 size-7 [&_path]:stroke-text" />
            )}
          </NavLink>
        )
      })}
    </ul>
  )
}
