import { LinkMenuItem } from './components/LinkMenuItem'
import { NavLinkMenuItem } from './components/NavLinkMenuItem'
import { useDesktopMenuArray } from './hooks/useMenu'

export const DesktopMenu = () => {
  const menu = useDesktopMenuArray()

  return (
    <ul className="flex items-center gap-10">
      {menu.map((menuItem) => {
        if (menuItem.linkType === 'external') {
          return <LinkMenuItem key={menuItem.href} {...menuItem} />
        }
        return (
          <NavLinkMenuItem
            key={menuItem.href}
            {...menuItem}
            classNames={{
              active: 'no-underline',
            }}
          />
        )
      })}
    </ul>
  )
}
