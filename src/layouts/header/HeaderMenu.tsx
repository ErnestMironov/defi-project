import MenuArrow from '@assets/icons/menu-arrow.svg'
import { cn } from '@utils/cn'
import clsx from 'clsx'
import { type ComponentProps } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { MenuItemDropdown } from './MenuItemDropdown'
import type { IMenuItem } from './useMenu'
import { useShortMenuArray } from './useMenu'

interface HeaderMenuProperties extends ComponentProps<'ul'> {
  callback?: () => void
}

export const HeaderMenu = ({ className, callback, ...rest }: HeaderMenuProperties) => {
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

export const MobileFooterMenu = ({
  className,
  callback,
  ...rest
}: HeaderMenuProperties) => {
  const menu = useShortMenuArray()
  return (
    <ul
      className={cn('flex flex-col items-center gap-6 [&_*]:text-base', className)}
      {...rest}
    >
      {menu.map((menuItem) => {
        if (menuItem.href.startsWith('http')) {
          return (
            <li key={menuItem.href}>
              <LinkMenuItem key={menuItem.href} {...menuItem} callback={callback} />
            </li>
          )
        }
        return (
          <li key={menuItem.href} className="flex flex-col items-center">
            <NavLinkMenuItem
              key={menuItem.href}
              {...{ ...menuItem, dropdown: undefined }}
              callback={callback}
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
export const FooterMenu = ({ className, callback, ...rest }: HeaderMenuProperties) => {
  const menu = useShortMenuArray()

  return (
    <ul
      className={cn(
        'grid grid-cols-[auto_1fr] w-fit gap-x-8 gap-y-8 [&_*]:text-2xl',
        className,
      )}
      {...rest}
    >
      {menu.map((menuItem) => (
        <>
          <li className="">
            {menuItem.href.startsWith('http') ? (
              <LinkMenuItem key={menuItem.href} {...menuItem} callback={callback} />
            ) : (
              <NavLinkMenuItem
                key={menuItem.href}
                {...{ ...menuItem, dropdown: undefined }}
                callback={callback}
              />
            )}
          </li>
          <li className="">
            {menuItem.dropdown && (
              <ul className="flex flex-col items-start gap-8 [&_*]:text-sm">
                {menuItem.dropdown?.map((item) => (
                  <SubNavLinkMenuItem
                    key={item.href}
                    {...item}
                    callback={callback}
                    className="gap-2 hover:text-main-100"
                  />
                ))}
              </ul>
            )}
          </li>
        </>
      ))}
    </ul>
  )
}

export const MobileSidebarMenu = ({
  className,
  callback,
  ...rest
}: HeaderMenuProperties) => {
  const menu = useShortMenuArray()
  return (
    <ul
      className={cn(
        'flex flex-col gap-16 align-end flex-1 items-start justify-center',
        className,
      )}
      {...rest}
    >
      {menu.map((menuItem) => {
        if (menuItem.href.startsWith('http')) {
          return (
            <li key={menuItem.href}>
              <LinkMenuItem key={menuItem.href} {...menuItem} callback={callback} />
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

export const LinkMenuItem = ({ href, label, src: Source, callback }: IMenuItem) => {
  return (
    <Link
      onClick={callback}
      to={href}
      target="_blank"
      key={label}
      className={clsx(
        'relative inline-flex cursor-pointer items-center text-[1.25rem] font-normal uppercase leading-[120%] tracking-[0.0125rem] hover:text-main-100 [&_path]:hover:stroke-main-100',
      )}
    >
      <span>{label}</span>

      {Source && <Source className="size-4 [&_path]:stroke-text" />}
    </Link>
  )
}

export const NavLinkMenuItem = ({
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
          'relative flex cursor-pointer items-center text-[1.25rem] font-normal uppercase leading-[120%] tracking-[0.0125rem] hover:text-main-100 [&_path]:hover:stroke-main-100',
          {
            'text-main-100 underline decoration-[2px] underline-offset-4': isActive,
          },
        )
      }
    >
      {label}
      {dropdown && <MenuItemDropdown className="ml-2" menu={dropdown} />}
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
          'relative flex cursor-pointer flex-col items-start text-[1.25rem] font-normal uppercase leading-[120%] tracking-[0.0125rem]',
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
