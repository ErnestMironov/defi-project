import { LinkMenuItem } from './components/LinkMenuItem'
import { NavLinkMenuItem } from './components/NavLinkMenuItem'
import { useDesktopMenuArray } from './hooks/useMenu'

export const DesktopMenu = () => {
  const menu = useDesktopMenuArray()

  return (
    <ul className="flex flex-col items-stretch gap-1">
      {menu.map((menuItem) => {
        if (menuItem.linkType === 'external') {
          return <LinkMenuItem key={menuItem.href} {...menuItem} />
        }
        return <NavLinkMenuItem key={menuItem.href} {...menuItem} />
      })}
    </ul>
  )
}
