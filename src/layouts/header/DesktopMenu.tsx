import { cn } from '@utils/cn'
import { type ComponentProps } from 'react'

import { ButtonMenuItem } from './menu/components/ButtonMenuItem'
import { LinkMenuItem } from './menu/components/LinkMenuItem'
import { NavLinkMenuItem } from './menu/components/NavLinkMenuItem'
import { useShortMenuArray } from './menu/hooks/useMenu'

interface UnifiedMenuProperties extends ComponentProps<'ul'> {
  callback?: () => void
}

interface HeaderMenuProperties extends UnifiedMenuProperties {
  openPortfolio: () => void
}

export const DesktopSidebarMenu = ({
  className,
  openPortfolio,
  callback,
  ...rest
}: HeaderMenuProperties) => {
  const menu = useShortMenuArray(true, 'button')

  return (
    <ul className={cn('flex items-center gap-10', className)} {...rest}>
      {menu.map((menuItem) => {
        if (menuItem.type === 'button') {
          return (
            <ButtonMenuItem key={menuItem.href} {...menuItem} callback={openPortfolio} />
          )
        }

        if (menuItem.href?.startsWith('http')) {
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
        if (menuItem.href?.startsWith('http')) {
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
            <NavLinkMenuItem key={menuItem.href} {...menuItem} callback={callback} />
          </li>
        )
      })}
    </ul>
  )
}
