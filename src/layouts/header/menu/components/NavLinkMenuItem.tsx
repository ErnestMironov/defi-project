import { cn } from '@utils/cn'
import clsx from 'clsx'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import type { IMenuItem } from '../hooks/useMenu'
import { MenuItemDropdown } from './MenuItemDropdown'

export const NavLinkMenuItem = (
  props: IMenuItem & {
    withAnimationIcon?: boolean
    classNames?: {
      link?: string
      active?: string
      icon?: string
    }
  },
) => {
  const {
    sublist,
    callback,
    href,
    label,
    src: Source,
    animationData,
    animationClassName,
    classNames,
    withAnimationIcon = true,
  } = props
  const [isHover, setIsHover] = useState(false)
  return (
    <NavLink
      onClick={callback}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      to={href}
      key={label}
      className={({ isActive }) =>
        clsx(
          'relative flex cursor-pointer items-center gap-3 text-[1.25rem] font-normal uppercase leading-[120%] tracking-[0.0125rem] hover:text-main-100',
          classNames?.link,
          {
            'text-main-100 underline decoration-[2px] underline-offset-4': isActive,
          },
          isActive && classNames?.active,
        )
      }
    >
      {withAnimationIcon && animationData && (
        <img
          src={animationData}
          alt={label}
          className={cn('size-8', animationClassName)}
        />
      )}
      {label}
      {sublist && <MenuItemDropdown menu={sublist} />}
      {Source && <Source className="[&_path]:stroke-text relative bottom-0.5 size-7" />}
    </NavLink>
  )
}
