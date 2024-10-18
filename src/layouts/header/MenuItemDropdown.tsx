import ArrowDown from '@assets/icons/arrow-down.svg'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@components/ui/hover-card'
import { useDisclosure } from '@hooks/common/useDisclosure'
import { cn } from '@utils/cn'
import clsx from 'clsx'
import { type ComponentProps } from 'react'
import { NavLink } from 'react-router-dom'

import type { IMenuItem } from './useMenu'

interface MenuItemDropdownProperties extends ComponentProps<'div'> {
  menu: IMenuItem[]
}

export const MenuItemDropdown = (props: MenuItemDropdownProperties) => {
  const { menu, className } = props
  const [opened, { toggle, close }] = useDisclosure()
  return (
    <HoverCard open={opened} openDelay={0} onOpenChange={toggle}>
      <HoverCardTrigger
        className={cn('data-[state=open]:rotate-180 transition', className)}
      >
        <ArrowDown className="size-4 [&_path]:stroke-text" />
      </HoverCardTrigger>
      <HoverCardContent sideOffset={12} className="flex w-[12.5rem] flex-col gap-5">
        {menu.map((item) => {
          return (
            <NavLink
              onClick={() => {
                item.callback?.()
                close()
              }}
              to={item.href}
              key={item.label}
              className={({ isActive }) =>
                clsx(
                  'relative flex cursor-pointer items-center text-[1.125rem] font-normal normal-case leading-[120%] tracking-[0.0125rem] hover:text-violet-100 [&_path]:hover:stroke-violet-100',
                  'before:transition-width before:absolute before:left-[-0.81rem] before:top-[-0.56rem] before:h-[calc(100%+0.56rem*2)] before:w-[calc(100%+0.81rem*2)] before:rounded-xl before:duration-200 before:ease-in-out hover:before:bg-main-15 before:group-hover:w-full',
                  {
                    'text-violet-100 underline decoration-[2px] underline-offset-4':
                      isActive,
                  },
                )
              }
            >
              {item.label}
            </NavLink>
          )
        })}
      </HoverCardContent>
    </HoverCard>
  )
}

export const DesktopSidebarMenuItemDropdown = (
  props: MenuItemDropdownProperties & {
    children: React.ReactNode
    itemCallback?: () => void
  },
) => {
  const { menu, className, children, itemCallback } = props
  const [opened, { toggle, close }] = useDisclosure()
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        {children}
        <button
          type="button"
          onClick={toggle}
          className="flex items-center gap-3 text-[1.25rem] font-normal uppercase leading-[120%] tracking-[0.0125rem] hover:text-main-100"
        >
          <ArrowDown
            className="size-4 transition-transform duration-300 ease-in-out [&_path]:stroke-text"
            style={{
              transform: opened ? 'rotate(-180deg)' : 'rotate(0deg)',
            }}
          />
        </button>
      </div>
      <div
        style={{
          maxHeight: opened ? '700px' : '0',
          paddingTop: opened ? '1.75rem' : '0',
        }}
        className="transition-max-height flex flex-col gap-5 overflow-hidden pl-11  duration-300 ease-in-out"
      >
        {menu.map((item) => {
          return (
            <NavLink
              onClick={() => {
                itemCallback?.()
                close()
              }}
              to={item.href}
              key={item.label}
              className={({ isActive }) =>
                clsx(
                  'text-text-100  text-[1rem] uppercase not-italic leading-[120%] tracking-[0.01rem] hover:text-main-100',
                  {
                    'text-main-100': isActive,
                  },
                )
              }
            >
              {item.label}
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
