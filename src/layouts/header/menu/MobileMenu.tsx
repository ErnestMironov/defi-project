import { LinkMenuItem } from './components/LinkMenuItem'
import { NavLinkMenuItem } from './components/NavLinkMenuItem'
import { useMobileMenuArray } from './hooks/useMenu'

export const MobileMenu = () => {
  const menu = useMobileMenuArray()

  return (
    <ul className="flex flex-col gap-4">
      {menu.map((menuItem) => {
        if (menuItem.linkType === 'external') {
          return <LinkMenuItem key={menuItem.href} {...menuItem} />
        }
        return <NavLinkMenuItem key={menuItem.href} {...menuItem} />
      })}
    </ul>
  )
}
