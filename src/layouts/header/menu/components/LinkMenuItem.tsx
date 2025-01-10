import { cn } from '@utils/cn'
import { Link } from 'react-router-dom'

import type { IMenuItem } from '../hooks/useMenu'

export const LinkMenuItem = (props: IMenuItem) => {
  const { href, label, icon: Icon, callback } = props
  return (
    <Link
      to={href}
      target="_blank"
      key={label}
      className={cn(
        'text-[0.875rem] max-md:text-[1.25rem] font-medium leading-4 text-text-100 flex items-center gap-[.37rem] p-3 hover:text-main-100 [&:hover_svg_path]:stroke-main-100 hover:bg-main-10 rounded-xl',
      )}
      onClick={callback}
    >
      {Icon && (
        <Icon className="size-4 max-md:size-6 [&_path]:stroke-[#8585A9] [&_path]:stroke-[1.5] group-hover:[&_path]:stroke-main-100" />
      )}
      <span>{label}</span>
    </Link>
  )
}
