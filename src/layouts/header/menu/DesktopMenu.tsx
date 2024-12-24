import { LinkMenuItem } from './components/LinkMenuItem'
import { NavLinkMenuItem } from './components/NavLinkMenuItem'
import { useDesktopMenuArray } from './hooks/useMenu'

export const DesktopMenu = ({ callback }: { callback: () => void }) => {
  const menu = useDesktopMenuArray()

  return (
    <ul className="flex flex-col items-stretch gap-1">
      {menu.map((menuItem) => {
        if (menuItem.linkType === 'external') {
          return <LinkMenuItem key={menuItem.href} {...menuItem} callback={callback} />
        }
        return <NavLinkMenuItem key={menuItem.href} {...menuItem} callback={callback} />
      })}
    </ul>
  )
}
