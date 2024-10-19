import MenuArrow from '@assets/icons/menu-arrow.svg'
import { cn } from '@utils/cn'
import clsx from 'clsx'
import { type ComponentProps, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { HeaderLottieIcon } from './HeaderLottieIcon'
import { MenuItemDropdown } from './MenuItemDropdown'
import type { IMenuItem, IMenuItemWithoutLink } from './useMenu'
import { useShortMenuArray } from './useMenu'

interface UnifiedMenuProperties extends ComponentProps<'ul'> {
  callback?: () => void
}

interface HeaderMenuProperties extends UnifiedMenuProperties {
  openPortfolio: () => void
}

export const HeaderMenu = ({
  className,
  openPortfolio,
  callback,
  ...rest
}: HeaderMenuProperties) => {
  const menu = useShortMenuArray(true)

  return (
    <ul className={cn('flex items-center gap-10', className)} {...rest}>
      {menu.map((menuItem) => {
        if (menuItem.type === 'button') {
          return (
            <ButtonMenuItem key={menuItem.href} {...menuItem} callback={openPortfolio} />
          )
        }

        if (menuItem.href.startsWith('http')) {
          return <LinkMenuItem key={menuItem.href} {...menuItem} callback={callback} />
        }
        return (
          <NavLinkMenuItem
            key={menuItem.href}
            {...menuItem}
            callback={callback}
            classNames={{
              active: 'no-underline',
            }}
          />
        )
      })}
    </ul>
  )
}

export const MobileFooterMenu = ({
  className,
  callback,
  ...rest
}: UnifiedMenuProperties) => {
  const menu = useShortMenuArray(true)
  return (
    <ul
      className={cn('flex flex-col items-center gap-6 [&_*]:text-base', className)}
      {...rest}
    >
      {menu.map((menuItem) => {
        if (menuItem.href.startsWith('http')) {
          return (
            <li key={menuItem.href}>
              <LinkMenuItem
                key={menuItem.href}
                {...menuItem}
                callback={callback}
                withAnimationIcon={false}
              />
            </li>
          )
        }
        return (
          <li key={menuItem.href} className="flex flex-col items-center">
            <NavLinkMenuItem
              key={menuItem.href}
              {...{ ...menuItem, dropdown: undefined }}
              callback={callback}
              withAnimationIcon={false}
            />
            {menuItem.dropdown && (
              <ul className="mt-6 flex flex-col items-start gap-3 [&_*]:text-sm">
                {menuItem.dropdown?.map((item) => {
                  return (
                    <li key={item.href}>
                      <SubNavLinkMenuItem
                        {...item}
                        callback={callback}
                        className="gap-2"
                      />
                    </li>
                  )
                })}
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )
}
export const FooterMenu = ({ className, callback, ...rest }: UnifiedMenuProperties) => {
  const menu = useShortMenuArray()

  return (
    <ul className={cn('flex items-center gap-[3.69rem]', className)} {...rest}>
      {menu.map((menuItem) => {
        if (menuItem.href.startsWith('http')) {
          return <LinkMenuItem key={menuItem.href} {...menuItem} callback={callback} />
        }
        return <NavLinkMenuItem key={menuItem.href} {...menuItem} callback={callback} />
      })}
    </ul>
  )
}

export const MobileSidebarMenu = ({
  className,
  callback,
  ...rest
}: UnifiedMenuProperties) => {
  const menu = useShortMenuArray(true)

  return (
    <ul
      className={cn('flex flex-col gap-16 items-center justify-center', className)}
      {...rest}
    >
      {menu.map((menuItem) => {
        if (menuItem?.href?.startsWith('http')) {
          return (
            <li key={menuItem.href}>
              <LinkMenuItem
                key={menuItem.href}
                {...menuItem}
                callback={callback}
                withAnimationIcon={false}
              />
            </li>
          )
        }
        return (
          <li key={menuItem.href}>
            <NavMobileLinkMenuItem
              key={menuItem.href}
              {...menuItem}
              callback={callback}
            />
          </li>
        )
      })}
    </ul>
  )
}

export const LinkMenuItem = (props: IMenuItem & { withAnimationIcon?: boolean }) => {
  const {
    callback,
    href,
    label,
    src: Source,
    animationData,
    animationClassName,
    withAnimationIcon = true,
  } = props
  const [isHover, setIsHover] = useState(false)
  return (
    <Link
      onClick={callback}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      to={href}
      target="_blank"
      key={label}
      className={clsx(
        'relative inline-flex cursor-pointer items-center gap-3 text-[1.25rem] font-normal uppercase leading-[120%] tracking-[0.0125rem] hover:text-main-100 [&_svg:not(:first-child)_path]:hover:stroke-main-100',
      )}
    >
      {withAnimationIcon && animationData && (
        <HeaderLottieIcon
          animationData={animationData}
          isHover={isHover}
          className={cn('size-8', animationClassName)}
        />
      )}
      <span>{label}</span>

      {Source && <Source className="size-4 [&_path]:stroke-text" />}
    </Link>
  )
}

export const ButtonMenuItem = (
  props: IMenuItemWithoutLink & { withAnimationIcon?: boolean },
) => {
  const {
    callback,
    label,
    src: Source,
    animationData,
    animationClassName,
    withAnimationIcon = true,
  } = props

  const [isHover, setIsHover] = useState(false)

  return (
    <button
      type="button"
      onClick={callback}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      key={label}
      className={clsx(
        'relative inline-flex cursor-pointer items-center gap-3 text-[1.25rem] font-normal uppercase leading-[120%] tracking-[0.0125rem] hover:text-main-100 [&_svg:not(:first-child)_path]:hover:stroke-main-100',
      )}
    >
      {withAnimationIcon && animationData && (
        <HeaderLottieIcon
          animationData={animationData}
          isHover={isHover}
          className={cn('size-8', animationClassName)}
        />
      )}
      <span>{label}</span>

      {Source && <Source className="size-4 [&_path]:stroke-text" />}
    </button>
  )
}

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
    dropdown,
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
        <HeaderLottieIcon
          animationData={animationData}
          isHover={isHover}
          className={cn('size-8', animationClassName)}
        />
      )}
      {label}
      {dropdown && <MenuItemDropdown menu={dropdown} />}
      {Source && <Source className="relative bottom-0.5 size-7 [&_path]:stroke-text" />}
    </NavLink>
  )
}
export const SubNavLinkMenuItem = ({
  href,
  label,
  callback,
  className,
}: IMenuItem & ComponentProps<'span'>) => {
  return (
    <NavLink
      onClick={callback}
      to={href}
      key={label}
      className={({ isActive }) =>
        cn(
          'relative flex cursor-pointer items-center gap-4 text-[1.125rem] font-normal uppercase leading-[120%] tracking-[0.0125rem]',
          {
            'text-main-100 [&_path]:fill-main-50': isActive,
          },
          className,
        )
      }
    >
      <MenuArrow className={cn('size-4 [&_path]:fill-gray-50')} />
      <span style={{ textDecoration: 'none' }}>{label}</span>
    </NavLink>
  )
}

export const NavMobileLinkMenuItem = ({
  href,
  label,
  src: Source,
  callback,
  dropdown,
}: IMenuItem) => {
  return (
    <NavLink
      onClick={callback}
      to={href}
      key={label}
      className={({ isActive }) =>
        clsx(
          'relative flex cursor-pointer flex-col items-center text-[1.25rem] font-normal uppercase leading-[120%] tracking-[0.0125rem]',
          {
            '[&>span]:text-main-100 [&>span]:underline decoration-[2px] underline-offset-4':
              isActive,
          },
        )
      }
    >
      <span>{label}</span>

      {dropdown && (
        <ul className="ml-2 mt-10 flex flex-col gap-8">
          {dropdown?.map((item) => {
            return (
              <li key={item.href}>
                <SubNavLinkMenuItem {...item} />
              </li>
            )
          })}
        </ul>
      )}
      {Source && <Source className="relative bottom-0.5 size-7 [&_path]:stroke-text" />}
    </NavLink>
  )
}
